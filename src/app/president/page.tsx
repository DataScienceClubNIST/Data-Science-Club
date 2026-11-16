import { Metadata } from 'next';
import PresidentClient from './PresidentClient';

export const metadata: Metadata = {
  title: 'President & Admin Portal | Data Science Club, NIST University',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function PresidentPage() {
  return <PresidentClient />;
}
