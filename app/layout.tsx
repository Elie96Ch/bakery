import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: 'Abou Edmond — Lebanese Bakery & Cake Studio',
 description: 'A little taste of home. Explore freshly baked Lebanese favorites and create a custom celebration cake with Abou Edmond.',
 manifest: '/manifest.webmanifest',
 icons: { icon: '/favicon.svg', apple: '/icons/icon-192.png' },
 appleWebApp: { capable: true, statusBarStyle: 'default', title: 'Abou Edmond' }
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#344536' };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {return <html lang="en"><body>{children}</body></html>;}
