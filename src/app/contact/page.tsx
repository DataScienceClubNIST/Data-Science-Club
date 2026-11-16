import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import { createPageMetadata } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact Us | Data Science Club (DSC), NIST University',
  description:
    'Get in touch with the Data Science Club (DSC) at NIST University, Berhampur. Inquiries about AI workshops, events, sponsorships, collaborations, and memberships.',
  path: '/contact',
  keywords: [
    'Contact DSC NIST',
    'Data Science Club Email',
    'NIST University Berhampur',
    'Tech Club Contact Odisha',
    'DSC NIST University Address',
    'NIST Technical Club Inquiries',
  ],
});

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact Us', url: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactPageClient />
    </>
  );
}
