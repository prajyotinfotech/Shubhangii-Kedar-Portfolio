import { useEffect, useRef } from 'react';
import { useMiniPlayer } from './useMiniPlayer';

export const useScrollToExpandPlayer = () => {
  const { setCollapsed } = useMiniPlayer();
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Function to set up the intersection observer
    const setupObserver = () => {
      // Create a single IntersectionObserver instance
      observer.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            console.log(`Element ${entry.target.id} is ${entry.isIntersecting ? 'visible' : 'not visible'}`);
            
            // If any target is intersecting (visible in viewport)
            if (entry.isIntersecting) {
              console.log(`Expanding player because ${entry.target.id} is visible`);
              setCollapsed(false);
            }
          });
        },
        {
          root: null, // viewport
          rootMargin: '0px',
          threshold: 0.1 // Trigger when at least 10% of the target is visible
        }
      );

      // Try to find and observe the sections
      const tryObserveSections = () => {
        const playlistSection = document.getElementById('playlist');
        const musicSection = document.getElementById('music');
        
        console.log('Looking for sections...');
        console.log('Playlist section found:', !!playlistSection);
        console.log('Music section found:', !!musicSection);

        if (playlistSection) {
          console.log('Observing playlist section');
          observer.current?.observe(playlistSection);
        }
        
        if (musicSection) {
          console.log('Observing music section');
          observer.current?.observe(musicSection);
        }

        // If sections not found yet, try again after a short delay
        if ((!playlistSection || !musicSection) && document.readyState === 'complete') {
          console.log('Some sections not found, retrying in 500ms...');
          setTimeout(tryObserveSections, 500);
        }
      };

      // Initial try
      tryObserveSections();
    };

    // Set up the observer when the component mounts and the DOM is ready
    if (document.readyState === 'complete') {
      setupObserver();
    } else {
      // If document is still loading, wait for it
      const onLoad = () => {
        console.log('Document loaded, setting up observer...');
        setupObserver();
        window.removeEventListener('load', onLoad);
      };
      window.addEventListener('load', onLoad);
      
      // Also try setting up after a short delay as a fallback
      const timeoutId = setTimeout(() => {
        console.log('Delayed setup...');
        setupObserver();
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('load', onLoad);
      };
    }

    // Cleanup function
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [setCollapsed]);
};
