import { Metadata } from 'next';
import CodeArenaClient from './CodeArenaClient';
import { createPageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema, generateEventSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Register for Code Arena 2.0 | Data Science Club, NIST University',
  description:
    'Online registration for Code Arena 2.0 at Sankalp Tech Fest, NIST University. Battle in competitive programming and data structure algorithmic challenges.',
  path: '/register/codearena',
  keywords: [
    'Code Arena Registration',
    'Code Arena 2.0',
    'Competitive Programming NIST',
    'Sankalp 2026 Coding',
    'Data Science Club NIST',
    'DSC NIST',
    'Coding Competition Odisha',
  ],
});

export default function CodeArenaPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Sankalp Tech Fest', url: '/sankalp' },
    { name: 'Code Arena 2.0 Registration', url: '/register/codearena' },
  ]);

  const codeArenaSchema = generateEventSchema({
    name: 'Code Arena 2.0 - Competitive Programming Showdown',
    description:
      'High-speed competitive programming and algorithm design showdown hosted by Data Science Club at Sankalp 2026, NIST University.',
    startDate: '2026-03-21T11:00:00+05:30',
    endDate: '2026-03-21T15:00:00+05:30',
    locationName: 'Computer Center, NIST University',
    locationAddress: 'Palur Hills, Berhampur, Odisha 761008',
    url: 'https://data-science-club-nist.vercel.app/register/codearena',
    image: 'https://data-science-club-nist.vercel.app/images/sankalp_banner.webp',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(codeArenaSchema) }}
      />
      <CodeArenaClient />
    </>
  );
}
