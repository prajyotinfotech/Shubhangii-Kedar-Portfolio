import './App.css'
import { Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HangingMic from './components/HangingMic'
import FeatureBar from './components/FeatureBar'
import About from './components/About'
import Music from './components/Music'
import Events from './components/Events'
import Playlist from './components/Playlist'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MiniPlayer from './components/MiniPlayer'
import { useScrollReveal } from './hooks/useScrollReveal'
import { useScrollToExpandPlayer } from './hooks/useScrollToExpandPlayer'
import { SpotifyProvider } from './contexts/SpotifyContext'
import { SPOTIFY_ARTIST_ID } from './config/spotify'
import { AuthProvider } from './contexts/AuthContext'
import { SpotifyWebPlaybackProvider } from './contexts/SpotifyWebPlaybackContext'

function App() {
  useScrollReveal()
  useScrollToExpandPlayer()
  return (
    <AuthProvider>
      <SpotifyWebPlaybackProvider>
        <SpotifyProvider artistId={SPOTIFY_ARTIST_ID}>
          <div className="app">
            <Navbar />
            <HangingMic />
            <main>
              <Hero />
              <FeatureBar />
              <About />
              <div className="follow-journey-container">
                <Link to="/journey" className="follow-journey-button">
                  Follow My Journey
                </Link>
              </div>
              <Playlist />
              <Music />
              <Events />
              
              <Gallery />
              <Testimonials />
              <Newsletter />
              <Contact />
            </main>
            <Footer />
            <MiniPlayer />
          </div>
        </SpotifyProvider>
      </SpotifyWebPlaybackProvider>
    </AuthProvider>
  )
}

export default App
