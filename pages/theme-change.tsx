import { ChangeEvent, FC, useEffect, useState } from "react";
import { GetServerSideProps } from 'next'

import Layout from "@/components/layouts"
import { Button, Card,  CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

import Cookies from "js-cookie";
import axios from "axios";

interface Props {
    themeCookie: string;
}

const ThemeChangePage: FC<Props> = ( { themeCookie } ) => {
    // const ThemeChangePage = ( { themeCookie }: Props ) => { 
    // console.log({ themeCookie })
    // const [currentTheme, setCurrentTheme] = useState('light'); 
    const [currentTheme, setCurrentTheme] = useState( themeCookie ); 

    const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const selectedTheme = event.target.value
    
        console.log({ selectedTheme })

        setCurrentTheme( selectedTheme )

        localStorage.setItem("theme", selectedTheme)
        Cookies.set('themeCookie', selectedTheme)

    }

    const onClickAxios = async () => {
        const resp = await axios.get('/api/hello')

        console.log(resp.data)

    }

    useEffect(() => {
        console.log( 'LocalStorage:', localStorage.getItem('theme'))
        console.log( 'Cookies:', Cookies.get('themeCookie'))    // otra manera de leer la cookies y no depende de que el servidor envie la cookie
    }, [])
    
    return (
    <Layout>
        <Card>
            <CardContent>
                <FormControl>
                    <FormLabel>Tema</FormLabel>
                    <RadioGroup
                        value={ currentTheme }
                        onChange={ onThemeChange }
                    >
                        <FormControlLabel value='light' control={ <Radio/> } label='Light'/>
                        <FormControlLabel value='dark' control={ <Radio/> } label='Dark'/>
                        <FormControlLabel value='custom' control={ <Radio/> } label='Custom'/>
                    </RadioGroup>
                </FormControl>

                <Button
                    onClick={ onClickAxios }
                >
                    Solicitud
                </Button>

            </CardContent>
        </Card>

    </Layout>
  )
}

// aqui enviamos la cookie bajo request time bajo demanda 
// export const getServerSideProps: GetServerSideProps = async ({req}) => {     ->  puedo destructurar
export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { themeCookie = 'light', name = 'No name' } = ctx.req.cookies

    const validThemes = [ 'light', 'dark', 'custom']; 

    return {
        props: {
            themeCookie: validThemes.includes( themeCookie) ? themeCookie : 'light', 
            name
        }
    }
}

export default ThemeChangePage