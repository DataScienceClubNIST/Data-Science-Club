import { Metadata } from 'next';
import AchievementsPageClient from './AchievementsPageClient';
import { createPageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Achievements & Hackathon Podiums | Data Science Club (DSC), NIST University',
  description:
    'Explore national hackathon victories, SIH podiums, IEEE paper recognitions, and competitive coding accolades won by Data Science Club (DSC) members at NIST University.',
  path: '/achievements',
  keywords: [
    'DSC NIST Achievements',
    'NIST Hackathon Winners',
    'SIH Winners NIST',
    'Data Science Club Awards',
    'NIST University Honors',
    'Smart India Hackathon NIST',
  ],
});

export default function AchievementsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Achievements', url: '/achievements' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AchievementsPageClient />
    </>
  );
}
