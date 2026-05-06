import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "BharatCMS — India's First AI-Powered Headless CMS",
  description: 'Razorpay + GST + Hindi + AI built-in. Skip Strapi. Skip Contentful. Build for Bharat in ₹.',
  keywords: ['CMS India', 'Razorpay CMS', 'GST CMS', 'Strapi alternative', 'headless CMS India', 'BharatCMS'],
  authors: [{ name: 'Diwakar Kumar' }],
  openGraph: {
    title: "BharatCMS — India's First AI-Powered Headless CMS 🇮🇳",
    description: 'Razorpay + GST + Hindi + AI built-in. Built for Indian businesses.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BharatCMS',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BharatCMS 🇮🇳',
    description: "India's first AI-powered headless CMS. Razorpay + GST + Hindi built-in.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`dark ${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="bg-[#0e1417] text-white antialiased" suppressHydrationWarning>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}