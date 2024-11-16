import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';  // Para las rutas
import { ChakraProvider,ColorModeScript } from '@chakra-ui/react';  // Para Chakra UI
import theme from '../src/utils/theme.js';  

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}> 
    <ColorModeScript initialColorMode="light" /> 
      <Router>  
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
