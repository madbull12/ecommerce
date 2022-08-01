import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider,createClient } from 'urql'
import Header from '../components/Header';

const client = createClient({ url:process.env.NEXT_PUBLIC_BACKEND_API || ""});
// console.log(process.env.NEXT_PUBLIC_BACKEND_API || "SDSD")

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Provider value={client}>
    <main className='bg-neutral-800'>
      <Header />
      <Component {...pageProps} />
    </main>


  </Provider>
  )
}

export default MyApp