import { useEffect } from 'react';

/**
 * Site-wide SEO config. Changing SITE_URL here cascades to every canonical.
 */
const SITE = {
  name:  'AIJOHN Technosoft',
  brand: 'AIJOHN Technosoft',
  url:   'https://aijohn.in',
  suffix: '| AIJOHN Technosoft',
  defaultImage: 'https://aijohn.in/aijohn-logo.png',
};

/**
 * Set or update a <meta> tag in <head>.
 *   setMeta({ name: 'description' }, 'hello')
 *   setMeta({ property: 'og:title' }, 'hello')
 */
function setMeta(attrs, content) {
  const selector = Object.entries(attrs)
    .map(([k, v]) => `[${k}="${v}"]`)
    .join('');
  let tag = document.head.querySelector(`meta${selector}`);
  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(attrs).forEach(([k, v]) => tag.setAttribute(k, v));
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Set or update <link rel="canonical">.
 */
function setCanonical(href) {
  let tag = document.head.querySelector('link[rel="canonical"]');
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
}

/**
 * useSEO — per-page SEO hook.
 *
 *   useSEO({
 *     title: 'Services',                       // becomes "Services | AIJOHN Technosoft"
 *     description: '9 services we offer...',
 *     path: '/services',                       // becomes canonical https://aijohn.in/services
 *     image: 'https://aijohn.in/og-services.png', // optional per-page OG image
 *   });
 *
 * Call once per page at the top of the component.
 */
export function useSEO({ title, description, path, image, rawTitle } = {}) {
  useEffect(() => {
    const fullTitle = rawTitle
      ? rawTitle
      : title
        ? `${title} ${SITE.suffix}`
        : `${SITE.brand} | Enterprise SaaS Development`;

    document.title = fullTitle;

    if (description) {
      setMeta({ name: 'description' },      description);
      setMeta({ property: 'og:description' }, description);
      setMeta({ name: 'twitter:description' }, description);
    }

    setMeta({ property: 'og:title' },      fullTitle);
    setMeta({ name: 'twitter:title' },     fullTitle);

    const ogImage = image || SITE.defaultImage;
    setMeta({ property: 'og:image' },  ogImage);
    setMeta({ name: 'twitter:image' }, ogImage);

    if (path !== undefined) {
      const canonical = `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
      setCanonical(canonical);
      setMeta({ property: 'og:url' }, canonical);
    }
  }, [title, description, path, image, rawTitle]);
}

export { SITE };
