import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

export const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <style>
        {`
          .theme-background {
            position: fixed;
            inset: 0; /* Cover entire viewport */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            transition: opacity 0.5s ease-in-out; /* Smooth fade */
          }
          .theme-background-light {
            z-index: -2; /* Behind dark */
            background-image: url('/images/background_light.png');
            opacity: ${isDarkMode ? 0 : 1};
          }
          .theme-background-dark {
            z-index: -1; /* Above light */
            background-image: url('/images/background_dark.png');
            opacity: ${isDarkMode ? 1 : 0};
          }
          .cursor-glow {
            /* Styles moved to inline style */
          }
        `}
      </style>
      {/* Background layers for crossfade */}
      <div className="theme-background theme-background-light" />
      <div className="theme-background theme-background-dark" />
      {/* Cursor Glow element */}
      <div
        className="pointer-events-none fixed z-50 cursor-glow"
        style={{
          width: '300px',
          height: '300px',
          transform: `translate(${position.x - 150}px, ${position.y - 150}px)`,
          background: `radial-gradient(circle at center, ${ 
            isDarkMode 
              ? 'rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 30%, transparent 65%'
              : 'rgba(79, 70, 229, 0.08) 0%, rgba(79, 70, 229, 0.04) 30%, transparent 65%'
          })`
        }}
      />
    </>
  );
}; 