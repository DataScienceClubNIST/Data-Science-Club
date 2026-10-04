import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import { DataProvider } from '@/context/DataContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SupabaseKeepAlive } from '@/components/SupabaseKeepAlive';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://datascienceclub-nist.vercel.app'),
  title: 'Data Science Club | NIST University',
  description: 'Official Website of the Data Science Club at NIST University. Learn. Build. Present. Compete in Data Science, Machine Learning, Deep Learning, OpenCV, and Web Development.',
  keywords: ['Data Science Club', 'NIST University', 'Machine Learning', 'Deep Learning', 'OpenCV', 'Web Development', 'Sankalp Tech Fest'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/images/logo.png',
  },
  openGraph: {
    title: 'Data Science Club — NIST University',
    description: 'Learn. Build. Present. Compete.',
    url: 'https://datascienceclub-nist.vercel.app',
    siteName: 'Data Science Club NIST',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Data Science Club NIST University Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased selection:bg-cyan-500 selection:text-white`}>
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
