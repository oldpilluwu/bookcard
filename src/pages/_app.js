import '@/styles/globals.css'
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from "@material-tailwind/react";


export default function App({ Component, pageProps, session }) {
  return (
    
       <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
  )
}
