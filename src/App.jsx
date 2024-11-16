import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react'
import Home from './components/Home'
import Navbar from './components/NavBar'
import Footer from './components/Footer';
import ImageGenerationSDxl from './components/ImageSDxl';
import ImageGenerationSD3 from './components/ImageSD3.5';
import ImageGenerationMid from './components/ImageMidjourney';
import ImageGenerationFlux from './components/ImageFlux';
import VideoGeneration from './components/Video';
import TextGeneration from './components/Chat';

function App() {
  
  return (
    <Box>
      <Navbar/>
      <Box p={4}>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/stable-diffusion-xl" element={<ImageGenerationSDxl/>} />
          <Route path="/stable-diffusion-3.5" element={<ImageGenerationSD3/>} />
          <Route path="/midjourney" element={<ImageGenerationMid/>} />
          <Route path="/flux-dev" element={<ImageGenerationFlux/>} />
          <Route path="/video" element={<VideoGeneration/>} />
          <Route path="/chat" element={<TextGeneration/>} />          
        </Routes> 
      </Box>
      <Footer/>
    </Box>
     
    
  )
}

export default App
