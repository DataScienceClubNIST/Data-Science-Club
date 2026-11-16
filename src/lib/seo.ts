import type { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'Data Science Club, NIST University',
  shortName: 'DSC NIST',
  alternateNames: [
    'Data Science Club NIST',
    'DSC NIST',
    'NIST University Data Science Club',
    'Data Science Club NIST University',
    'DSC NIST University',
    'NIST Data Science Club',
    'NIST DSC',
    'Data Science Club Berhampur',
    'Technical Club NIST University',
    'AI and ML Club NIST',
    'Machine Learning Club NIST',
    'Data Science Community NIST',
    'NIST University Student Clubs',
    'Data Science Club Odisha'
  ],
  description:
    'Discover the Data Science Club (DSC) at NIST University. Explore AI, Machine Learning, Data Science, Deep Learning, Web Development, technical events, projects, workshops and student innovations in Berhampur, Odisha.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://data-science-club-nist.vercel.app',
  email: 'data.science.club@nist.edu',
  phone: '+91-94370-00000',
  parentUniversity: {
    name: 'NIST University',
    url: 'https://www.nist.edu',
    campus: 'Palur Hills',
    city: 'Berhampur',
    state: 'Odisha',
    postalCode: '761008',
    country: 'IN'
  },
  social: {
    instagram: 'https://www.instagram.com/dsc_nist/',
    linkedin: 'https://in.linkedin.com/company/data-science-club-nist-university',
    github: 'https://github.com/DataScienceClubNIST'
  },
  keywords: [
    'Data Science Club NIST',
    'DSC NIST',
    'NIST University Data Science Club',
    'Data Science Club NIST University',
    'DSC NIST University',
    'NIST Data Science Club',
    'NIST DSC',
    'Data Science Club Berhampur',
    'Technical Club NIST University',
    'AI and ML Club NIST',
    'Machine Learning Club NIST',
    'Data Science Community NIST',
    'NIST University Student Clubs',
    'Data Science Club Odisha',
    'NIST University Berhampur',
    'Sankalp Tech Fest NIST',
    'Idea2Odishi NIST',
    'Code Arena 2.0 NIST'
  ]
};

export function getCanonicalUrl(path: string = ''): string {
  const base = SITE_CONFIG.url.replace(/\/+$/, '');
  const cleanPath = path ? (path.startsWith('/') ? path : `/${path}`) : '';
  return `${base}${cleanPath}`;
}

export function createPageMetadata({
  title,
  description,
  path = '',
  keywords = [],
  image = '/images/logo.png',
  noIndex = false
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const canonicalUrl = getCanonicalUrl(path);
  const imageUrl = image.startsWith('http') ? image : getCanonicalUrl(image);
  const combinedKeywords = Array.from(new Set([...keywords, ...SITE_CONFIG.keywords]));

  if (noIndex) {
    return {
      title,
      description,
      robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false
        }
      }
    };
  }

  return {
    title,
    description,
    keywords: combinedKeywords,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} - Data Science Club (DSC), NIST University`
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@dsc_nist'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  };
}

