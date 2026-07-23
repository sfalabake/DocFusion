import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PDFLeader Pro - Advanced PDF Editing',
  description: 'Professional PDF editing software with real-time collaboration and AI features.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-secondary-950 text-secondary-900 dark:text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
