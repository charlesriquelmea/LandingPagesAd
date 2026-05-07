import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Confecção Café do Brasil — Bolsas Artesanais de Juta Reciclada',
    template: '%s | Confecção Café do Brasil',
  },
  description:
    'Bolsas e mochilas artesanais feitas de sacas de juta recicladas de fazendas brasileiras de café. Moda sustentável com alma do cerrado.',
  keywords: ['bolsa artesanal', 'mochila juta', 'moda sustentável', 'café brasil', 'sacas recicladas'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://confeccaocafebrasil.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Confecção Café do Brasil',
    title: 'Confecção Café do Brasil — Bolsas Artesanais de Juta Reciclada',
    description: 'Bolsas e mochilas artesanais feitas de sacas de juta recicladas de fazendas brasileiras de café.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Confecção Café do Brasil',
    description: 'Bolsas artesanais de juta reciclada.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#2C1A0E',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}

        {/* Meta Pixel */}
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </body>
    </html>
  )
}
