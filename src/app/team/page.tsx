import { Metadata } from 'next';
import TeamPageClient from './TeamPageClient';
import { createPageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Our Team & Leadership | Data Science Club (DSC), NIST University',
  description:
    'Meet the student leads, core coordinators, faculty advisors, and alumni of the Data Science Club (DSC) at NIST University, Berhampur. Discover the community shaping tech at NIST.',
  path: '/team',
  keywords: [
    'Data Science Club NIST Team',
    'DSC NIST Leadership',
    'Faculty Advisors NIST',
    'Student Coordinators NIST University',
    'Tech Club Leads Odisha',
    'Data Science Community NIST',
    'NIST University Student Clubs',
  ],
});

export default function TeamPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Team', url: '/team' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TeamPageClient />
    </>
  );
}
