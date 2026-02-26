


export function createPageUrl(pageName: string) {
    const normalized = (pageName || '').trim().toLowerCase().replace(/\s+/g, '-');
    if (normalized === '' || normalized === '/' || normalized === 'home') {
        return '/';
    }
    // If URL has a hash fragment, add trailing slash only to the path part (before #)
    const hashIndex = normalized.indexOf('#');
    if (hashIndex !== -1) {
        const path = normalized.slice(0, hashIndex);
        const hash = normalized.slice(hashIndex);
        const pathWithSlash = path.endsWith('/') ? path : path + '/';
        return '/' + pathWithSlash + hash;
    }
    return '/' + (normalized.endsWith('/') ? normalized : normalized + '/');
}
// For SEO friendly URLs
// Build an absolute canonical URL with a trailing slash (except for files with extensions)
export function buildCanonicalUrl(pathname: string, siteOrigin: string = 'https://online.stevens.edu') {
    // Ensure pathname starts with '/'
    let path = pathname || '/';
    if (!path.startsWith('/')) {
        path = '/' + path;
    }
    
    // Check if path is a file (has extension) - files should NOT have trailing slash
    const hasFileExtension = /\.\w+$/.test(path);
    
    // Normalize: lowercase path
    const lower = path.toLowerCase();
    
    // For files (images, etc.), don't add trailing slash
    // For directories/pages, ensure trailing slash
    let normalized: string;
    if (hasFileExtension) {
        normalized = lower; // Keep as-is for files
    } else {
        const hasTrailing = lower.endsWith('/');
        normalized = lower === '/' ? '/' : (hasTrailing ? lower : lower + '/');
    }
    
    // Join with origin
    return siteOrigin.replace(/\/$/, '') + normalized;
}

// Insert or update a JSON-LD script tag by id
export function setJsonLd(scriptId: string, data: unknown) {
    if (typeof document === 'undefined') return;
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
}

// Set page title dynamically
export function setPageTitle(title: string) {
    if (typeof document === 'undefined') return;
    document.title = title;
}

// Set meta description
export function setMetaDescription(description: string) {
    if (typeof document === 'undefined') return;
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
    }
    meta.content = description;
}

// Set Open Graph meta tags
export function setOpenGraphTags(data: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}) {
    if (typeof document === 'undefined') return;
    
    const setMetaProperty = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    };

    if (data.title) setMetaProperty('og:title', data.title);
    if (data.description) setMetaProperty('og:description', data.description);
    if (data.image) setMetaProperty('og:image', data.image);
    if (data.url) setMetaProperty('og:url', data.url);
    if (data.type) setMetaProperty('og:type', data.type);
    
    // Set Twitter Card tags
    if (data.title) {
        let meta = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'twitter:title';
            document.head.appendChild(meta);
        }
        meta.content = data.title;
    }
    
    if (data.description) {
        let meta = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null;
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'twitter:description';
            document.head.appendChild(meta);
        }
        meta.content = data.description;
    }
    
    if (data.image) {
        let meta = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement | null;
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = 'twitter:image';
            document.head.appendChild(meta);
        }
        meta.content = data.image;
    }
}