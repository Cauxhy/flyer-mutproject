import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import './Flyer.css';

const Flyer = () => {
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  // Fonction pour mettre à jour l'orientation
  const handleOrientationChange = () => {
    setIsLandscape(window.innerWidth > window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleOrientationChange);
    return () => {
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  const images = [
    require('./assets/1.jpg'),
    require('./assets/2.jpg'),
    require('./assets/3.jpg'),
    require('./assets/4.jpg'),
    require('./assets/5.jpg'),
    require('./assets/6.jpg'),
  ];

  return (
    <div >
      {!isLandscape && (
        <div className="rotate-message">
          Veuillez orienter votre appareil en mode paysage pour une meilleure expérience.
        </div>
      )}
      {isLandscape && (
        <HTMLFlipBook
          width={550}
          height={700}
          size="stretch"
          minWidth={315}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1350}
          maxShadowOpacity={0.5} // Augmenter l'opacité de l'ombre
          showCover={true}
          mobileScrollSupport={true}
          className="flipbook"
          flippingTime={1000} // Temps d'animation
          usePortrait={window.innerWidth <= 768}
          drawShadow={true}
          disableFlipByClick={false} // Permettre le clic pour tourner les pages
          startPage={0}
          pageMargin={0} // Pas de marge entre les pages
          onFlip={(e) => console.log('Page actuelle:', e.data)}
        >
          {/* Couverture */}
          {images.map((image, index) => (
            <div className="page" key={index}>
              <img src={image} alt={`Page ${index + 1}`} className="flyer-image" />
            </div>
          ))}
          {/* Page de fin */}
          <div className="page"></div>
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default Flyer;
