import { AppContext, AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme, customTheme } from '../themes'

function MyApp({ Component, pageProps, ...rest }: AppProps) {

  console.log({ rest })

  return (
    <ThemeProvider theme={ darkTheme} >
      <CssBaseline />

      <Component {...pageProps} />
    
    </ThemeProvider>
  )
}

// podemos usar funciones ES5 o ES6 flechas ||    appContext puede ser ctx, es de tipo AppContext de next/app
MyApp.getInitialProps = async ( appContext: AppContext ) => {

  //const cookies = appContext.ctx.req ? ( appContext.ctx.req as any).cookies : { themeCookie: 'light'}
  const { themeCookie } = appContext.ctx.req ? ( appContext.ctx.req as any).cookies : { themeCookie: 'light'}

  const validThemes = ['light', 'dark', 'custom'];

  console.log('getInitial_props', themeCookie)

  return {
    themeCookie: validThemes.includes( themeCookie ) ? themeCookie : 'dark',
  }
}

export default MyApp