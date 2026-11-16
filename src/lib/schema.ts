import { SITE_CONFIG, getCanonicalUrl } from './seo';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: 'Data Science Club, NIST University',
    alternateName: 'DSC NIST',
    url: SITE_CONFIG.url,
    logo: getCanonicalUrl('/images/logo.png'),
    image: getCanonicalUrl('/images/logo.png'),
    email: SITE_CONFIG.email,
    description: SITE_CONFIG.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE_CONFIG.parentUniversity.name} Campus, ${SITE_CONFIG.parentUniversity.campus}`,
      addressLocality: SITE_CONFIG.parentUniversity.city,
      addressRegion: SITE_CONFIG.parentUniversity.state,
      postalCode: SITE_CONFIG.parentUniversity.postalCode,
      addressCountry: SITE_CONFIG.parentUniversity.country
    },
    sameAs: [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.linkedin,
      SITE_CONFIG.social.github
    ],
    parentOrganization: {
      '@type': 'CollegeOrUniversity',
      name: SITE_CONFIG.parentUniversity.name,
      url: SITE_CONFIG.parentUniversity.url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_CONFIG.parentUniversity.city,
        addressRegion: SITE_CONFIG.parentUniversity.state,
        addressCountry: SITE_CONFIG.parentUniversity.country
      }
    }
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    url: SITE_CONFIG.url,
    name: 'Data Science Club (DSC) - NIST University',
    alternateName: SITE_CONFIG.alternateNames,
    description: SITE_CONFIG.description,
    inLanguage: 'en-US',
    publisher: {
      '@id': `${SITE_CONFIG.url}/#organization`
    }
  };
}

export interface BreadcrumbItemInput {
  name: string;
  path?: string;
  url?: string;
}

export function getBreadcrumbSchema(items: BreadcrumbItemInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const targetUrl = item.path || item.url || '/';
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: targetUrl.startsWith('http') ? targetUrl : getCanonicalUrl(targetUrl)
      };
    })
  };
}

export const generateBreadcrumbSchema = getBreadcrumbSchema;

export interface EventSchemaInput {
  title?: string;
  name?: string;
  description: string;
  startDate?: string;
  endDate?: string;
  venue?: string;
  locationName?: string;
  locationAddress?: string;
  image?: string;
  path?: string;
  url?: string;
}

export function getEventSchema(input: EventSchemaInput) {
  const eventName = input.name || input.title || 'Technical Event';
  const eventVenue = input.locationName || input.venue || 'NIST University Campus, Palur Hills, Berhampur';
  const eventUrl = input.url || (input.path ? getCanonicalUrl(input.path) : SITE_CONFIG.url);
  const eventImage = input.image
    ? input.image.startsWith('http')
      ? input.image
      : getCanonicalUrl(input.image)
    : getCanonicalUrl('/images/sankalp_banner.webp');

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: eventName,
    description: input.description,
    startDate: input.startDate || '2026-03-20T10:00:00+05:30',
    endDate: input.endDate || '2026-03-21T18:00:00+05:30',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: eventVenue,
      address: {
        '@type': 'PostalAddress',
        streetAddress: input.locationAddress || 'NIST University Campus, Palur Hills',
        addressLocality: 'Berhampur',
        addressRegion: 'Odisha',
        postalCode: '761008',
        addressCountry: 'IN'
      }
    },
    image: [eventImage],
    organizer: {
      '@type': 'Organization',
      name: 'Data Science Club, NIST University',
      url: SITE_CONFIG.url
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: eventUrl,
      validFrom: '2026-01-01T00:00:00+05:30'
    }
  };
}

export const generateEventSchema = getEventSchema;
export const generateOrganizationSchema = getOrganizationSchema;
export const generateWebSiteSchema = getWebSiteSchema;
