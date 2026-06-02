import './globals.css';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

export const metadata = {
  title: 'Kanhaiya Engineering Works | Industrial Fabrication Ahmedabad',
  description: 'Kanhaiya Engineering Works is a GST-registered fabrication company in Vatva, Ahmedabad. We make Steel Chemical Tanks, MS Tanks, Industrial Mixers, Screw Conveyors, ETP Plants and more.',
  keywords: 'Kanhaiya Engineering, fabrication Ahmedabad, steel tanks, industrial fabrication, MS tanks, chemical storage tanks, Vatva Ahmedabad',
  openGraph: {
    title: 'Kanhaiya Engineering Works | Industrial Fabrication Ahmedabad',
    description: 'GST registered industrial fabrication company in Ahmedabad. Steel Chemical Tanks, MS Tanks, Industrial Mixers and more.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#07070d" />
        <meta name="robots" content="index, follow" />
      </head>
      <body>
        <CustomCursor />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
