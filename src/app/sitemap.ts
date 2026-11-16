import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, '');

  // Exact last-modified dates reflecting actual content and release updates
  const publicRoutes: {
    path: string;
    lastModified: Date;
  }[] = [
    { path: '', lastModified: new Date('2026-11-16T08:30:00.000Z') },
    { path: '/sankalp', lastModified: new Date('2026-11-15T18:00:00.000Z') },
    { path: '/events', lastModified: new Date('2026-11-12T10:00:00.000Z') },
    { path: '/projects', lastModified: new Date('2026-11-10T14:30:00.000Z') },
    { path: '/team', lastModified: new Date('2026-11-08T16:00:00.000Z') },
    { path: '/achievements', lastModified: new Date('2026-11-05T09:00:00.000Z') },
    { path: '/recruitment', lastModified: new Date('2026-11-02T11:00:00.000Z') },
    { path: '/register/idea2odishi', lastModified: new Date('2026-11-15T12:00:00.000Z') },
    { path: '/register/codearena', lastModified: new Date('2026-11-15T12:00:00.000Z') },
    { path: '/gallery', lastModified: new Date('2026-10-28T15:00:00.000Z') },
    { path: '/contact', lastModified: new Date('2026-10-20T10:00:00.000Z') },
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: route.lastModified,
  }));
}
