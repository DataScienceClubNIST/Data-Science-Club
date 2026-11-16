import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { DataProvider } from '@/context/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SupabaseKeepAlive } from '@/components/SupabaseKeepAlive';
import { SITE_CONFIG } from '@/lib/seo';
import { getOrganizationSchema, getWebSiteSchema } from '@/lib/schema';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Data Science Club (DSC) | NIST University',
    template: '%s | Data Science Club (DSC), NIST University',
  },
  description:
    'Discover the Data Science Club (DSC) at NIST University. Explore AI, Machine Learning, Data Science, Deep Learning, Web Development, technical events, projects, workshops and student innovations in Berhampur, Odisha.',
  keywords: SITE_CONFIG.keywords,
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.parentUniversity.name,
  applicationName: 'DSC NIST',
  category: 'Education, Technology, Student Organization',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Data Science Club (DSC) | NIST University',
    description:
      'Discover the Data Science Club (DSC) at NIST University. Learn. Build. Present. Compete in AI, Machine Learning, Data Science, Deep Learning, and Web Technologies.',
    url: SITE_CONFIG.url,
    siteName: 'Data Science Club, NIST University (DSC NIST)',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Data Science Club DSC NIST University Official Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Science Club (DSC) | NIST University',
    description:
      'Student-led technical community at NIST University dedicated to Data Science, AI, Machine Learning, and Web Technologies.',
    images: ['/images/logo.png'],
    creator: '@dsc_nist',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-cyan-500 selection:text-white font-sans">
        <ThemeProvider>
          <DataProvider>
            <SupabaseKeepAlive />
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
