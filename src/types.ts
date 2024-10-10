export type Env = {
    BUCKET: R2Bucket;
};

export interface SiteConfig {
    name: string;
    bucket: R2Bucket;
    desp: {
        [path: string]: string;
    };
    decodeURI?: boolean;
    legalInfo?: string;
    showPoweredBy?: boolean;
    favicon?: string;
    dangerousOverwriteZeroByteObject?: boolean;
}
