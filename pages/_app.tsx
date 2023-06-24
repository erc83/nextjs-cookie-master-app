import { useEffect, useState } from 'react';
import { AppContext, AppProps } from 'next/app'
import { CssBaseline, Theme, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme, customTheme } from '../themes'
import Cookies from 'js-cookie';

interface Props extends AppProps {
  themeCookie: string;
}

//function MyApp({ Component, pageProps, ...rest }: AppProps) {
function MyApp({ Component, pageProps, themeCookie }: Props) {
  //console.log({ rest })
  //console.log({ themeCookie })  // ya se que tengo el tema con el getInitialProps que ahora es undefined por el uso

  const [currentTheme, setCurrentTheme] = useState( lightTheme )

  useEffect(() => {
    const cookieTheme = Cookies.get('themeCookie') || 'light'   // -> la cambiamos abajo 
    //const currentTheme:Theme = cookieTheme === 'light'
    const selectedTheme:Theme = cookieTheme === 'light'      // cambiamos el nombre 
      ? lightTheme
      : ( cookieTheme === 'dark' )
        ? darkTheme 
        : customTheme

    setCurrentTheme( selectedTheme )
  }, [])


  return (
    <ThemeProvider theme={ currentTheme } >

      <CssBaseline />

      <Component {...pageProps} />
    
    </ThemeProvider>
  )
}
/*   No se utiliza para no perder la generacion de paginas estaticas
// podemos usar funciones ES5 o ES6 flechas ||    appContext puede ser ctx, es de tipo AppContext de next/app
MyApp.getInitialProps = async ( appContext: AppContext ) => {

  //const cookies = appContext.ctx.req ? ( appContext.ctx.req as any).cookies : { themeCookie: 'light'}
  const { themeCookie } = appContext.ctx.req ? ( appContext.ctx.req as any).cookies : { themeCookie: 'light'}

  const validThemes = ['light', 'dark', 'custom'];

  console.log('getInitial_props', themeCookie)

  return {
    themeCookie: validThemes.includes( themeCookie ) ? themeCookie : 'dark',
  }
} */

export default MyApp