import RecoilRootProvider from '@/utils/recoilProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Styles from './_styles/Layout.module.scss';
import Sidebar from './_component/Sidebar';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PINTING',
  description: 'HELLO PINTING',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <Script src='/navbar.js' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <body className={inter.className} style={{ margin: 0, border: 0 }}>
        <RecoilRootProvider>
          <div className={Styles.layout}>
            <Sidebar />
            {children}
          </div>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
