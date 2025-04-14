
import { useState } from "react";
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
  const { user, profile, signOut } = useAuth();
  const location = useLocation();

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

  // Check if we're on the homepage to make the navbar transparent and absolute
  const isHomePage = location.pathname === '/';

  return (
    <header className={`${isHomePage ? 'absolute top-0 left-0 right-0 z-40 bg-transparent' : 'bg-background border-b sticky top-0 z-50'}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/eddf3f47-f36a-4088-883d-513d144fff3a.png" 
                alt="TAG - Tickets and Guides" 
                className="h-12"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${isHomePage ? 'text-white' : 'text-foreground'} hover:text-primary transition-colors ${location.pathname === '/' ? 'font-medium text-primary' : ''}`}>Home</Link>
            <Link to="/guides" className={`${isHomePage ? 'text-white' : 'text-foreground'} hover:text-primary transition-colors ${location.pathname === '/guides' ? 'font-medium text-primary' : ''}`}>Guides</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className={`relative h-10 w-10 rounded-full ${isHomePage ? 'text-white' : ''}`}>
                    <Avatar>
                      <AvatarImage src={profile?.avatar_url} />
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
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
                <Button variant="outline" asChild className="bg-white text-[rgba(100,73,37,255)] border-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.1)]">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?tab=register">Register</Link>
                </Button>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button - Updated with brown color */}
          <button className={`md:hidden ${isHomePage ? 'text-white' : 'text-[rgba(100,73,37,255)]'}`} onClick={toggleMenu}>
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
              className={`text-foreground hover:text-primary transition-colors py-2 ${location.pathname === '/' ? 'font-medium text-primary' : ''}`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/guides" 
              className={`text-foreground hover:text-primary transition-colors py-2 ${location.pathname === '/guides' ? 'font-medium text-primary' : ''}`}
              onClick={toggleMenu}
            >
              Guides
            </Link>
            
            {user ? (
              <>
                <div className="flex items-center space-x-3 py-2">
                  <Avatar>
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{profile?.full_name || user.email}</div>
                  </div>
                </div>
                <Link 
                  to="/profile" 
                  className="text-foreground hover:text-primary transition-colors py-2 pl-2"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <Link 
                  to="/bookings" 
                  className="text-foreground hover:text-primary transition-colors py-2 pl-2"
                  onClick={toggleMenu}
                >
                  My Bookings
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full mt-2" 
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
                <Button variant="outline" asChild onClick={toggleMenu} className="bg-white text-[rgba(100,73,37,255)] border-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.1)]">
                  <Link to="/auth">Login</Link>
                </Button>
                <Button asChild onClick={toggleMenu}>
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
