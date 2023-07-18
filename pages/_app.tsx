import '../styles/globals.css'
import '@tremor/react/dist/esm/tremor.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Hero from '../components/Hero';

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hero />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
