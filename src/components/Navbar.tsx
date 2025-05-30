
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useScroll } from "@/hooks/use-scroll";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";

/**
 * Main navigation component
 * Adapts styling based on scroll position and current route
 */
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isScrolled = useScroll();
  
  // Check if we're on the homepage
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    console.log("🧭 Navigation state:", { isScrolled, isHomePage, path: location.pathname });
    
    // Log navbar width changes for debugging
    const navbar = document.querySelector('header[data-navbar]');
    if (navbar) {
      console.log("📏 Navbar width:", navbar.getBoundingClientRect().width);
      console.log("🌍 Viewport width:", window.innerWidth);
    }
  }, [isScrolled, location.pathname, isHomePage]);

  // Log responsive breakpoint transitions
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let breakpoint = 'mobile';
      if (width >= 1024) breakpoint = 'desktop';
      else if (width >= 640) breakpoint = 'tablet';
      
      console.log("📱 Responsive breakpoint:", { breakpoint, width });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial log
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header 
        data-navbar
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-2 sm:px-4 lg:px-6 ${
          isScrolled 
            ? 'bg-white shadow-md' 
            : isHomePage 
              ? 'bg-transparent' 
              : 'bg-white border-b border-border'
        }`}
        style={{ 
          height: 'var(--navbar-height)'
        }}
      >
        <div className="h-full max-w-7xl mx-auto">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/a28e2d12-823b-451e-94f4-90c64147d3a1.png" 
                  alt="TAG - Tickets and Guides" 
                  className="h-8 sm:h-10 w-auto"
                />
              </Link>
            </div>
            
            <DesktopNav />
            
            <div className="lg:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </header>
      {/* Add spacing div to push content below navbar */}
      <div style={{ height: 'var(--navbar-height)' }}></div>
    </>
  );
};

export default Navbar;
