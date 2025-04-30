// src/app/layout.js
import '../../src/app/styles/LandingPage.module.css';
import { Providers } from './providers';
import { Montserrat, Quicksand } from 'next/font/google';

// Configure the fonts
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-quicksand',
});

export const metadata = {
  title: 'Hiwot Fitness App',
  description: 'Fitness app for workouts and calorie tracking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${quicksand.variable}`}>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'var(--font-quicksand), sans-serif'
      }}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}