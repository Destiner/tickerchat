import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { headers } from 'next/headers'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

const sfProRounded = localFont({
  src: [
    {
      path: './fonts/SF-Pro-Rounded-Ultralight.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Rounded-Thin.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Rounded-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Rounded-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Rounded-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Rounded-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Rounded-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Rounded-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/SF-Pro-Rounded-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: 'tickerchat',
  description: 'Anonymous chat for every community',
  openGraph: {
    title: 'tickerchat',
    siteName: 'tickerchat',
    description: 'Anonymous chat for every community',
    images: ['/social.png'],
    url: 'https://tickerchat.xyz',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body className={`${sfProRounded.className} antialiased`}>
        <Providers cookies={cookies}>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
