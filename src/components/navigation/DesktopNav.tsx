
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import UserMenu from "./UserMenu";

interface DesktopNavProps {
  isScrolled: boolean;
  isHomePage: boolean;
  currentPath: string;
}

const DesktopNav = ({ isScrolled, isHomePage, currentPath }: DesktopNavProps) => {
  const { user } = useAuth();

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <Link 
        to="/" 
        className={`${isScrolled ? 'text-foreground' : isHomePage ? 'text-white' : 'text-foreground'} 
                   hover:text-primary transition-transform hover:scale-95 active:scale-90 
                   ${currentPath === '/' ? 'font-medium text-primary' : ''}`}
      >
        Home
      </Link>
      <Link 
        to="/guides" 
        className={`${isScrolled ? 'text-foreground' : isHomePage ? 'text-white' : 'text-foreground'} 
                   hover:text-primary transition-transform hover:scale-95 active:scale-90 
                   ${currentPath === '/guides' ? 'font-medium text-primary' : ''}`}
      >
        Guides
      </Link>
      
      {user ? (
        <UserMenu isScrolled={isScrolled} isHomePage={isHomePage} />
      ) : (
        <div className="ml-4 flex items-center space-x-2">
          <Button variant="outline" asChild className="bg-white text-[#006d5b] border-[#006d5b] hover:bg-[#006d5b]/10 transition-transform hover:scale-95 active:scale-90">
            <Link to="/auth">Login</Link>
          </Button>
          <Button asChild className="bg-[#006d5b] hover:bg-[#006d5b]/90 transition-transform hover:scale-95 active:scale-90">
            <Link to="/auth?tab=register">Register</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default DesktopNav;
