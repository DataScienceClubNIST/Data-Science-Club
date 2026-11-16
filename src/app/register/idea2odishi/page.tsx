import { Metadata } from 'next';
import Idea2OdishiClient from './Idea2OdishiClient';
import { createPageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema, generateEventSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Idea2Odishi 2026 | State-Level Ideathon & Product Building Clash | Sankalp NIST',
  description:
    'Official portal for Idea2Odishi 2026 at Sankalp Tech Fest, NIST University. 26 Nov: Idea Presentation | 27 Nov: Product Building. Solving problem statements regarding Odisha in any domain. Open to all students (Team size 1 or 2 members).',
  path: '/register/idea2odishi',
  keywords: [
    'Idea2Odishi 2026',
    'Idea2Odishi Registration',
    'Sankalp 2026',
    'Odisha Ideathon',
    'Product Building Clash',
    'Data Science Club NIST',
    'DSC NIST',
    'NIST University Tech Fest',
  ],
});

export default function Idea2OdishiPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Sankalp Tech Fest', url: '/sankalp' },
    { name: 'Idea2Odishi Registration', url: '/register/idea2odishi' },
  ]);

  const idea2odishiSchema = generateEventSchema({
    name: 'Idea2Odishi 2026 - Innovation & AI Pitching Challenge',
    description:
      'State-level innovation pitching competition where students develop solutions addressing real challenges across Odisha using AI, Machine Learning, and sustainable technology.',
    startDate: '2026-11-26T11:00:00+05:30',
    endDate: '2026-11-27T15:30:00+05:30',
    locationName: 'NIST Seminar Hall 1 & Auditorium, NIST University Campus',
    locationAddress: 'Palur Hills, Berhampur, Odisha 761008',
    url: 'https://data-science-club-nist.vercel.app/register/idea2odishi',
    image: 'https://data-science-club-nist.vercel.app/images/Idea2Odishi_images/Voxel%20Konark%20Temple%20by%20the%20Riverside-1.png',
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
      <Idea2OdishiClient />
    </>
  );
}
