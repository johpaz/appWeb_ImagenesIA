import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Box } from '@chakra-ui/react'
import Home from './components/Home'
import Navbar from './components/NavBar'
import Footer from './components/Footer';
import ImageGenerationSDxl from './components/ImageSDxl';

function App() {
  
  return (
    <Box>
      <Navbar/>
      <Box p={4}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/stable-diffusion-xl" element={<ImageGenerationSDxl/>} />
        </Routes> 
      </Box>
      <Footer/>
    </Box>
     
    
  )
}

export default App
