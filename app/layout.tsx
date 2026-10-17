import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CABS Loan Application',
  description: 'Loan application form inspired by the CABS design.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
