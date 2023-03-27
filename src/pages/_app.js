import '@/styles/globals.css'
import { NextUIProvider } from '@nextui-org/react';
import {SessionProvider} from 'next-auth/react';

export default function App({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
        <NextUIProvider>
          <Component {...pageProps} />
      </NextUIProvider>
    </SessionProvider>
  )
}
