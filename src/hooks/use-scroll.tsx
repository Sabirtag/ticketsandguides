
import { useState, useEffect } from "react";

/**
 * Hook that tracks scroll position and returns whether the page has been scrolled
 * past the specified threshold
 * @param threshold - Scroll position threshold in pixels (default: 10)
 * @returns Boolean indicating if page is scrolled past threshold
 */
export const useScroll = (threshold: number = 10) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const newScrollState = window.scrollY > threshold;
      if (isScrolled !== newScrollState) {
        console.log(`🔄 Scroll state changed to: ${newScrollState ? 'scrolled' : 'top'} at ${window.scrollY}px`);
        setIsScrolled(newScrollState);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, isScrolled]);

  return isScrolled;
};
