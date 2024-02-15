'use client';
import { Navbar } from '@/components/navbar';
import './globals.css';
// import Toast from './toast';
import { Suspense } from 'react';
import { ProfileProvider } from '@/contexts/ProfileContext';
import { EnvironmentProvider } from '@/contexts/EnvironmentContext';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="flex min-h-screen w-full">
        <Suspense>
          <Navbar />
        </Suspense>
        <ProfileProvider>
          <EnvironmentProvider>
            {children}
          </EnvironmentProvider>
        </ProfileProvider>
        {/* <Toast /> */}
      </body>
    </html>
  );
}
