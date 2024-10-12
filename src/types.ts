export type Env = {
    BUCKET_POI_DB: R2Bucket;
    BUCKET_POI_NIGHTLIES: R2Bucket;
    FRONTEND: Service;
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
