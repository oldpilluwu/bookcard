import '@/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});


export default function App({ Component, pageProps, session }) {
  return (
    
       <ThemeProvider theme={lightTheme}>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
    
  )
}
