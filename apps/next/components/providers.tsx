'use client'

import { wagmiAdapter, projectId } from '@/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { base } from '@reown/appkit/networks'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient()

createAppKit({
  themeMode: 'light',
  adapters: [wagmiAdapter],
  projectId,
  networks: [base],
  defaultNetwork: base,
  features: {
    socials: false,
    email: false,
    swaps: false,
    analytics: false
  }
})

export function Providers({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  )
}
