'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProps } from 'next/app';

function Home({Component,pageProps}:AppProps) {
  const queryClient = new QueryClient();
  console.log(QueryClient,QueryClientProvider)
  return (
    
    <QueryClientProvider client={queryClient} contextSharing={true}>
      {/* <Component {...pageProps} /> */}
      <h1>Nothing on home</h1>
    </QueryClientProvider>
  )
}
export default Home
