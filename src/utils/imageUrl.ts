/**
 * Cloudinary delivery optimization.
 *
 * CMS images are stored in Cloudinary as raw uploads (multi-MB PNG/JPG).
 * Cloudinary can convert/resize on the fly via URL transformation params —
 * f_auto (best format the browser supports, e.g. AVIF/WebP), q_auto
 * (perceptual quality), w_1600,c_limit (cap width, never upscale).
 * The originals stay untouched; only the delivery URL changes.
 */

const CLOUDINARY_UPLOAD_PATTERN = /^(https?:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(v\d+\/.+)$/;

const DEFAULT_TRANSFORM = 'f_auto,q_auto,w_1600,c_limit';

/**
 * Insert delivery transformations into a Cloudinary image URL.
 * Non-Cloudinary URLs and URLs that already carry transformations
 * (anything other than a bare `/upload/v123/...` path) pass through
 * unchanged, so the function is safe to apply repeatedly.
 */
export function optimizeCloudinaryUrl(url: string, transform: string = DEFAULT_TRANSFORM): string {
    const match = CLOUDINARY_UPLOAD_PATTERN.exec(url);
    if (!match) return url;
    return `${match[1]}${transform}/${match[2]}`;
}

/**
 * Recursively rewrite every Cloudinary image URL inside a content object.
 * Returns a new object; the input is not mutated.
 */
export function optimizeContentImages<T>(value: T): T {
    if (typeof value === 'string') {
        return optimizeCloudinaryUrl(value) as unknown as T;
    }
    if (Array.isArray(value)) {
        return value.map(item => optimizeContentImages(item)) as unknown as T;
    }
    if (value && typeof value === 'object') {
        const result: Record<string, unknown> = {};
        for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
            result[key] = optimizeContentImages(entry);
        }
        return result as T;
    }
    return value;
}
