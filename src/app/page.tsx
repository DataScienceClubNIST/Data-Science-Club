import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';
import { createPageMetadata } from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Data Science Club (DSC) | NIST University',
  description:
    'Discover the Data Science Club (DSC) at NIST University. Explore AI, Machine Learning, Data Science, Deep Learning, Web Development, technical events, projects, workshops and student innovations.',
  path: '/',
  keywords: [
    'Data Science Club',
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
  ]
});

export default function HomePage() {
  return <HomePageClient />;
}
