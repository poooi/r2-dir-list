import { Env, SiteConfig } from './types';
import { renderTemplFull } from './render';
import { getSiteConfig } from './config';

async function listBucket(bucket: R2Bucket, options?: R2ListOptions): Promise<R2Objects> {
    // List all objects in the bucket, launch new request if list is truncated
    const objects: R2Object[] = [];
    const delimitedPrefixes: string[] = [];

    // delete limit, cursor in passed options
    const requestOptions = {
        ...options,
        limit: undefined,
        cursor: undefined,
    };

    var cursor = undefined;
    while (true) {
        const index = await bucket.list({
            ...requestOptions,
            cursor,
        });
        objects.push(...index.objects);
        delimitedPrefixes.push(...index.delimitedPrefixes);
        if (!index.truncated) {
            break;
        }
        cursor = index.cursor;
    }
    return {
        objects,
        delimitedPrefixes,
        truncated: false,
    };
}

function shouldReturnOriginResponse(originResponse: Response, siteConfig: SiteConfig): boolean {
    const isNotEndWithSlash = originResponse.url.slice(-1) !== '/';
    const is404 = originResponse.status === 404;
    const isZeroByte = originResponse.headers.get('Content-Length') === '0';
    const overwriteZeroByteObject = (siteConfig.dangerousOverwriteZeroByteObject ?? false) && isZeroByte;

    // order matters here
    if (isNotEndWithSlash) return true;
    if (is404) {
        return false;
    } else {
        return !overwriteZeroByteObject;
    }
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const domain = url.hostname;
        const pathname = url.pathname;
        if (pathname === '/favicon.ico' || pathname.startsWith('/_next') || url.searchParams.has('_rsc')) {
            return await env.FRONTEND.fetch(request);
        }
        const originResponse = await fetch(new Request(request));

        const siteConfig = getSiteConfig(env, domain);
        if (!siteConfig) {
            // TODO: Should send a email to notify the admin
            return originResponse;
        }

        if (shouldReturnOriginResponse(originResponse, siteConfig)) {
            return originResponse;
        }

        const response = await env.FRONTEND.fetch(request)

        return new Response(response.body, {
            headers: {
                ...response.headers,
                'content-encoding': 'gzip',
            }
        })
    },
};
