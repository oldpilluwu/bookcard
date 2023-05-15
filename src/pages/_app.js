import '@/styles/globals.css'
import { createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


export default function App({ Component, pageProps, session }) {
  return (
    
       <ThemeProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeProvider>
  )
}
