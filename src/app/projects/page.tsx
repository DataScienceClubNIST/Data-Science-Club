import { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';
import { createPageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Student Projects & AI Innovations | Data Science Club (DSC), NIST University',
  description:
    'Explore machine learning pipelines, deep learning computer vision apps, web platforms, and data engineering projects engineered by Data Science Club (DSC) members at NIST University.',
  path: '/projects',
  keywords: [
    'DSC NIST Projects',
    'NIST Data Science Projects',
    'AI Projects NIST University',
    'Machine Learning Club NIST',
    'OpenCV Projects',
    'Web Development NIST',
    'Student Innovations NIST',
    'Deep Learning Models',
  ],
});

export default function ProjectsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectsPageClient />
    </>
  );
}
