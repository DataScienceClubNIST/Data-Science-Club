import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url.replace(/\/+$/, '');
  const now = new Date();

  const publicRoutes: {
    path: string;
    priority: number;
    changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/sankalp', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/events', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/projects', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/team', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/achievements', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/recruitment', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/register/idea2odishi', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/register/codearena', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}

