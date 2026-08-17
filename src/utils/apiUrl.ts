const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:\/\//i;

function getDefaultProtocol(): string {
    if (typeof window !== 'undefined' && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
        return window.location.protocol;
    }

    return 'https:';
}

export function normalizeApiBaseUrl(value: string | undefined, fallback: string): string {
    const trimmedValue = value?.trim();
    if (trimmedValue === 'same-origin') {
        return '';
    }

    const rawValue = trimmedValue || fallback;
    const withoutTrailingSlash = rawValue.replace(/\/+$/, '');

    if (ABSOLUTE_URL_PATTERN.test(withoutTrailingSlash)) {
        return withoutTrailingSlash;
    }

    if (withoutTrailingSlash.startsWith('//')) {
        return `${getDefaultProtocol()}${withoutTrailingSlash}`;
    }

    if (withoutTrailingSlash.startsWith('/')) {
        return withoutTrailingSlash;
    }

    return `${getDefaultProtocol()}//${withoutTrailingSlash}`;
}
