import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import { Box } from '@chakra-ui/react'
import Home from './components/Home'
import Navbar from './components/NavBar'

function App() {
  
  return (
    <Box>
      <Navbar/>
      <Box p={4}>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes> 
      </Box>
    </Box>
     
    
  )
}

export default App
