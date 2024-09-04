// app/layout.tsx
'use client'
import { SessionProvider } from 'next-auth/react';
import './globals.css'; // Adjust the path to your global styles

export default function RootLayout({ children, session }: { children: React.ReactNode; session: any }) {
  return (
    <html>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
