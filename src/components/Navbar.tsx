
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import DesktopNav from "./navigation/DesktopNav";
import MobileNav from "./navigation/MobileNav";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isScrolled = useScroll();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if we're on the homepage
  const isHomePage = location.pathname === '/';

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-md' 
            : isHomePage 
              ? 'bg-transparent' 
              : 'bg-white border-b'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/78423913-30f6-412f-abc1-8063a3b6b1ce.png" 
                  alt="TAG - Tickets and Guides" 
                  className="h-12 w-auto"
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
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
