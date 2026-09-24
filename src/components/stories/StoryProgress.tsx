import React, { useEffect, useState } from 'react';

export const StoryProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/40 backdrop-blur-sm pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 transition-all duration-100 ease-out shadow-lg shadow-amber-500/50"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
