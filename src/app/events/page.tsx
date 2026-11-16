import type { Metadata } from 'next';
import EventsPageClient from './EventsPageClient';
import { createPageMetadata } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Events & Technical Workshops | Data Science Club (DSC), NIST University',
  description:
    'Explore technical workshops, AI & ML bootcamps, PyTorch sessions, hackathons, and guest seminars organized by Data Science Club (DSC) at NIST University, Berhampur, Odisha.',
  path: '/events',
  keywords: [
    'Data Science Club NIST events',
    'DSC NIST workshops',
    'NIST University technical events',
    'AI and ML Club NIST workshops',
    'Machine Learning hackathon NIST',
    'Data Science Club Berhampur events',
    'PyTorch workshops NIST'
  ]
});

export default function EventsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EventsPageClient />
    </>
  );
}
