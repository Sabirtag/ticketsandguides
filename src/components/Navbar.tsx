
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
  }, [isScrolled, location.pathname, isHomePage]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-md' 
            : isHomePage 
              ? 'bg-transparent' 
              : 'bg-white border-b border-border'
        }`}
        style={{ height: 'var(--navbar-height)' }}
      >
        <div className="container mx-auto px-4 md:px-6 h-full">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/78423913-30f6-412f-abc1-8063a3b6b1ce.png" 
                  alt="TAG - Tickets and Guides" 
                  className="h-10 w-auto"
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
