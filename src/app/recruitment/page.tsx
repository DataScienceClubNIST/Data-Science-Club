import { Metadata } from 'next';
import RecruitmentPageClient from './RecruitmentPageClient';
import { createPageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Join Data Science Club | Member Recruitment, NIST University',
  description:
    'Apply to join the Data Science Club (DSC) at NIST University. Open recruitments for Data Science, Machine Learning, Deep Learning, OpenCV, and Web Development wings.',
  path: '/recruitment',
  keywords: [
    'Join DSC NIST',
    'Data Science Club Recruitment',
    'NIST University Club Auditions',
    'Student Technical Club Apply',
    'NIST Berhampur Student Community',
  ],
});

export default function RecruitmentPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Recruitment', url: '/recruitment' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RecruitmentPageClient />
    </>
  );
}
