import type { Metadata } from 'next';
import { Inter, Manrope, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-display' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Shubham Buchwani — Full-Stack Software Engineer',
  description:
    'Portfolio of Shubham Buchwani. Full-Stack Software Engineer building AI assistants, custom web platforms, and intelligent systems.',
  keywords: [
    'Shubham Buchwani',
    'portfolio',
    'engineer',
    'developer',
    'product',
    'security',
    'full-stack',
  ],
  authors: [{ name: 'Shubham Buchwani' }],
  openGraph: {
    title: 'Shubham Buchwani — Full-Stack Software Engineer',
    description: 'Full-Stack Software Engineer building AI assistants, custom web platforms, and intelligent systems.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubham Buchwani — Full-Stack Software Engineer',
    description: 'Full-Stack Software Engineer building AI assistants, custom web platforms, and intelligent systems.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${manrope.variable} ${jetbrains.variable}`}>
      <body className="min-h-full font-body bg-base text-text">{children}</body>
    </html>
  );
}
