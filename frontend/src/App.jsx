// import { useEffect, useState } from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import './App.css'
// import HomePage from './pages/HomePage'
// import LandingPage from './pages/LandingPage'
// import GalleryPage from './pages/GalleryPage'
// import TimelinePage from './pages/TimelinePage'
// import BirthdayWishPage from './pages/BirthdayWishPage'
// import MagicWand from './components/MagicWand'

// function App() {
//   return (
//     <main className='flex-grow'>
    
//     <Router>
//       <Routes>
//         <Route path='/' element={<LandingPage />} />
//         <Route path='/home' element={<HomePage />} />
//         <Route path='/gallery' element={<GalleryPage />} />
//         <Route path='/timeline' element={<TimelinePage />} />
//         <Route path="/birthday-wish" element={<BirthdayWishPage />} />
        
//       </Routes>
//     </Router>
//     <MagicWand />
//     </main>
//   )
// }

// export default App


import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactHowler from 'react-howler';
import './App.css';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import GalleryPage from './pages/GalleryPage';
import TimelinePage from './pages/TimelinePage';
import BirthdayWishPage from './pages/BirthdayWishPage';
import MagicWand from './components/MagicWand';
import AudioControl from './components/AudioControl';
import HPThemeAudio from "./assets/harry-potter-theme.mp3";

function App() {
  const [audioPlaying, setAudioPlaying] = useState(true);

  const toggleAudio = () => {
    setAudioPlaying(prev => !prev);
  };

  return (
    <main className="flex-grow relative">
      {/* Global Audio Player */}
      <ReactHowler src={HPThemeAudio} playing={audioPlaying} loop={true} />

      {/* Audio Control Button (fixed position on screen) */}
      <div className="absolute top-4 right-4 z-50">
        <AudioControl isPlaying={audioPlaying} togglePlay={toggleAudio} />
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/birthday-wish" element={<BirthdayWishPage />} />
        </Routes>
      </Router>

      <MagicWand />
    </main>
  );
}

export default App;
