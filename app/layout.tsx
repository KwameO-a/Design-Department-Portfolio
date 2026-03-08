import './globals.css';
import type { Viewport, Metadata } from 'next';
import PageTransition from '../components/animations/PageTransition';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'The Design Department',
  description: 'Architecture, Design & Creative Studio based in Accra, Ghana.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}
