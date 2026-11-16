import { Metadata } from 'next';
import SankalpPageClient from './SankalpPageClient';
import { createPageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema, generateEventSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Sankalp Tech Fest Events | Data Science Club (DSC), NIST University',
  description:
    'Explore Sankalp Tech Fest events, hackathons, and challenges organized by the Data Science Club (DSC) at NIST University. Register for Idea2Odishi 2026, Code Arena 2.0, and AI competitions.',
  path: '/sankalp',
  keywords: [
    'Sankalp NIST',
    'Sankalp Tech Fest',
    'Idea2Odishi 2026',
    'Code Arena 2.0',
    'Data Science Club NIST',
    'DSC NIST',
    'NIST University Data Science Club',
    'Sankalp Events',
    'Hackathons NIST University',
    'Technical Club NIST University',
  ],
});

export default function SankalpPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Sankalp Tech Fest', url: '/sankalp' },
  ]);

  const idea2odishiSchema = generateEventSchema({
    name: 'Idea2Odishi 2026 - State-Level Innovation & AI Pitching Challenge',
    description:
      'Pitch AI, ML, Data Science, and smart tech solutions to solve real-world problems facing Odisha. Solo or 2-member team participation at Sankalp Tech Fest, NIST University.',
    startDate: '2026-03-20T10:00:00+05:30',
    endDate: '2026-03-21T17:00:00+05:30',
    locationName: 'NIST University Campus, Palur Hills',
    locationAddress: 'Palur Hills, Berhampur, Odisha 761008',
    url: 'https://data-science-club-nist.vercel.app/register/idea2odishi',
    image: 'https://data-science-club-nist.vercel.app/images/sankalp_banner.webp',
  });

  const codeArenaSchema = generateEventSchema({
    name: 'Code Arena 2.0 - Competitive Programming & Algorithm Showdown',
    description:
      'High-speed competitive programming and algorithmic problem-solving showdown hosted by Data Science Club at Sankalp 2026, NIST University.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(idea2odishiSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(codeArenaSchema) }}
      />
      <SankalpPageClient />
    </>
  );
}
