import './globals.css';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import UserContextProvider from '@/src/auth/contexts/userContext/UserContextProvider';

const ns = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
});

export const metadata: Metadata = {
  title:
    'LawSuits - Your Legal Solutions App in India | Connect with Trusted Legal Professionals',
  description:
    'LawSuits, your go-to legal solutions app in India, connects you with trustworthy Legal Service Providers. Explore a network of Advocates, Arbitrators, Mediators, and more. Post legal requirements, receive personalized recommendations, and make informed decisions. Your reliable partner for legal support on the LawSuits app',
  keywords: [
    'LawSuits',
    'Legal Solutions',
    'Legal Professionals',
    'Advocates',
    'Arbitrators',
    'Mediators',
    'India',
    'legal support app',
    'personalized recommendations',
    'trustworthy',
    'legal assistance',
    'legal services platform',
    'connect with lawyers',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ns.className}>
        <UserContextProvider>
          {children}
          <Toaster />
        </UserContextProvider>
      </body>
    </html>
  );
}
