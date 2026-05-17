import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '../components/AuthProvider/AuthProvider';
import { checkSession } from '@/lib/api/serverApi';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NoteHub',
  description: 'Simple app for managing your notes',
  openGraph: {
    title: 'NoteHub',
    description: 'Simple app for managing your notes',
    url: 'https://08-zustand-five-theta-18.vercel.app/notes/filter/all',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await checkSession();

  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <AuthProvider>
            <Header
              isAuth={session.data.success}
              email={session.data.user?.email}
            />
            {children}
            {modal}
            <Footer />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
