import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'
import GalleryPage from './pages/GalleryPage'
import TimelinePage from './pages/TimelinePage'
import BirthdayWishPage from './pages/BirthdayWishPage'

function App() {
  return (
    <main className='flex-grow'>
    
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/gallery' element={<GalleryPage />} />
        <Route path='/timeline' element={<TimelinePage />} />
        <Route path="/birthday-wish" element={<BirthdayWishPage />} />
        
      </Routes>
    </Router>
   
    </main>
  )
}

export default App