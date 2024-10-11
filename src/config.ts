import { Env, SiteConfig } from './types';

export function getSiteConfig(env: Env, domain: string): SiteConfig | undefined {
    const configs: {[domain: string]: SiteConfig} = {
        'db.poi.moe': {
            name: "Dumps of poi db",
            bucket: env.BUCKET_POI_DB,
            desp: {
                '/': "Dumps of poi db",
            },
            showPoweredBy: true, // Set to false to hide the "Powered by" information at footer

            /// Decode URI when listing objects, useful when you have space or special characters in object key
            /// Recommended to enable it for new installations, but default to false for backward compatibility
            decodeURI: true,

            /// [Optional] Legal information of your website
            /// Your local government (for example Mainland China) may requires you to put some legal info at footer
            /// and you can put it here.
            /// It will be treated as raw HTML.
            // legalInfo: "Legal information of your website",

            /// [Optional] favicon, should be a URL to **PNG IMAGE**. Default to Cloudflare R2's logo
            // favicon: ''

            /// [Optional] **Dangerous**: Enabling it may disrupte the normal reading of existing object
            /// By default, r2-dir-list will not list directory if the request path is a object to prevent disrupting
            /// the normal reading of existing object.
            /// Enabling this will allow r2-dir-list to list directory even if the request path is a 0-byte object.
            /// Do not use them unless you know what you are doing!
            // dangerousOverwriteZeroByteObject: false,
        },
        'nightlies.poi.moe': {
            name: "poi nightlies",
            bucket: env.BUCKET_POI_NIGHTLIES,
            desp: {
                '/': "poi nightlies",
            },
            showPoweredBy: true, // Set to false to hide the "Powered by" information at footer

            /// Decode URI when listing objects, useful when you have space or special characters in object key
            /// Recommended to enable it for new installations, but default to false for backward compatibility
            decodeURI: true,

            /// [Optional] Legal information of your website
            /// Your local government (for example Mainland China) may requires you to put some legal info at footer
            /// and you can put it here.
            /// It will be treated as raw HTML.
            // legalInfo: "Legal information of your website",

            /// [Optional] favicon, should be a URL to **PNG IMAGE**. Default to Cloudflare R2's logo
            // favicon: ''

            /// [Optional] **Dangerous**: Enabling it may disrupte the normal reading of existing object
            /// By default, r2-dir-list will not list directory if the request path is a object to prevent disrupting
            /// the normal reading of existing object.
            /// Enabling this will allow r2-dir-list to list directory even if the request path is a 0-byte object.
            /// Do not use them unless you know what you are doing!
            // dangerousOverwriteZeroByteObject: false,
        },
    };
    return configs[domain];
}
