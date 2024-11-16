// theme.js o en cualquier archivo de configuración global
import { extendTheme } from '@chakra-ui/react';




const customTheme = {
  fonts: {
    body: 'Montserrat, system-ui, sans-serif ', 
    heading: 'Montserrat Black, system-ui, sans-serif',
  },
  styles: {
    global: {
      'html, body': {
        minWidth: '98vw',
        minHeight: '100vh',
        fontFamily: 'Montserrat, system-ui, sans-serif',
        color:'black.800',
      },
      button: {
        fontFamily: 'Montserrat Black, system-ui, sans-serif',
      },
      // Estilos adicionales que puedan ser necesarios
    },
  },
};

const theme = extendTheme(customTheme);

export default theme;
