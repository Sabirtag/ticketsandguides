
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to get user initials for avatar fallback
  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return user?.email?.substring(0, 2).toUpperCase() || "U";
  };

  // Check if we're on the homepage
  const isHomePage = location.pathname === '/';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isScrolled ? 'bg-white shadow-md' : isHomePage ? 'bg-transparent' : 'bg-white border-b'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative overflow-hidden">
                <div className="absolute w-16 h-16 rounded-full bg-white -left-2 -top-2"></div>
                <img 
                  src="/lovable-uploads/fbba1d88-ae67-4a77-8edb-6f01992dd434.png" 
                  alt="TAG - Tickets and Guides" 
                  className="h-12 relative z-10"
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`${isScrolled ? 'text-foreground' : isHomePage ? 'text-white' : 'text-foreground'} 
                         hover:text-primary btn-push
                         ${location.pathname === '/' ? 'font-medium text-primary' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/guides" 
              className={`${isScrolled ? 'text-foreground' : isHomePage ? 'text-white' : 'text-foreground'} 
                         hover:text-primary btn-push
                         ${location.pathname === '/guides' ? 'font-medium text-primary' : ''}`}
            >
              Guides
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`relative h-10 w-10 rounded-full ${isScrolled ? '' : isHomePage ? 'text-white' : ''}`}>
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback className="text-black">{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/bookings">My Bookings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="ml-4 flex items-center space-x-2">
                <Button variant="outline" asChild className="bg-white text-primary border-primary hover:bg-primary/10 btn-push">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild className="btn-push">
                  <Link to="/auth?tab=register">Register</Link>
                </Button>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button className={`md:hidden ${isScrolled ? 'text-primary' : isHomePage ? 'text-white' : 'text-primary'}`} onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-foreground hover:text-primary btn-push py-2 ${location.pathname === '/' ? 'font-medium text-primary' : ''}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/guides" 
              className={`text-foreground hover:text-primary btn-push py-2 ${location.pathname === '/guides' ? 'font-medium text-primary' : ''}`}
              onClick={toggleMenu}
            >
              Guides
            </Link>
            
            {user ? (
              <>
                <div className="flex items-center space-x-3 py-2">
                  <Avatar>
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="text-black">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{profile?.full_name || user.email}</div>
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="text-foreground hover:text-primary btn-push py-2 pl-2"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link 
                  to="/bookings" 
                  className="text-foreground hover:text-primary btn-push py-2 pl-2"
                  onClick={toggleMenu}
                >
                  My Bookings
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full mt-2 btn-push" 
                  onClick={() => {
                    signOut();
                    toggleMenu();
                  }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <div className="pt-2 flex flex-col space-y-2">
                <Button variant="outline" asChild onClick={toggleMenu} className="bg-white text-primary border-primary hover:bg-primary/10 btn-push">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild onClick={toggleMenu} className="btn-push">
                  <Link to="/auth?tab=register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
