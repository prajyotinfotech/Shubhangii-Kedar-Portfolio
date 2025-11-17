import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Journey from '../components/Journey';
import HangingMic from '../components/HangingMic';

const JourneyPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      {/* <Navbar /> */}
      <HangingMic />
      <main>
        <div className="container">
          <Link to="/" className="back-to-home">
            ← Back to Home
          </Link>
          <Journey />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JourneyPage;