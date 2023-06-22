import { ChangeEvent, useState } from "react";
import Layout from "@/components/layouts"
import { Card,  CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const ThemeChangePage = () => {

    const [currentTheme, setCurrentTheme] = useState('light'); 

    const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
        const selectedTheme = event.target.value
    
        console.log({ selectedTheme })

        setCurrentTheme( selectedTheme )
    
    }


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
            </CardContent>
        </Card>

    </Layout>
  )
}

export default ThemeChangePage