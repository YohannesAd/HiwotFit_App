// src/app/layout.js
import '../../src/app/styles/LandingPage.module.css';
export const metadata = {
    title: 'Hiwot Fitness App',
    description: 'Fitness app for workouts and calorie tracking',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body style={{ margin: 0, padding: 0 }}>
          {children}
        </body>
      </html>
    );
  }
  