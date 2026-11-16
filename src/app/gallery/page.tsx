import { Metadata } from 'next';
import GalleryPageClient from './GalleryPageClient';
import { createPageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Photo Gallery & Memories | Data Science Club (DSC), NIST University',
  description:
    'Browse photos, workshop sessions, hackathons, Sankalp tech fest galleries, and community moments from the Data Science Club (DSC) at NIST University.',
  path: '/gallery',
  keywords: [
    'DSC NIST Gallery',
    'Data Science Club Photos',
    'NIST University Tech Fest Photos',
    'Sankalp Gallery',
    'NIST Student Life',
    'AI Workshops Gallery NIST',
  ],
});

export default function GalleryPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GalleryPageClient />
    </>
  );
}
