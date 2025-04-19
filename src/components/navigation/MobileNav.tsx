
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

const MobileNav = ({ isOpen, onClose, currentPath }: MobileNavProps) => {
  const { user, profile, signOut } = useAuth();

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

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t">
      <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
        <Link 
          to="/" 
          className={`text-foreground hover:text-primary transition-transform hover:scale-95 py-2 ${currentPath === '/' ? 'font-medium text-primary' : ''}`}
          onClick={onClose}
        >
          Home
        </Link>
        <Link 
          to="/guides" 
          className={`text-foreground hover:text-primary transition-transform hover:scale-95 py-2 ${currentPath === '/guides' ? 'font-medium text-primary' : ''}`}
          onClick={onClose}
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
              className="text-foreground hover:text-primary transition-transform hover:scale-95 py-2 pl-2"
              onClick={onClose}
            >
              Profile
            </Link>
            <Link 
              to="/bookings" 
              className="text-foreground hover:text-primary transition-transform hover:scale-95 py-2 pl-2"
              onClick={onClose}
            >
              My Bookings
            </Link>
            <Button 
              variant="outline" 
              className="w-full mt-2 transition-transform hover:scale-95" 
              onClick={() => {
                signOut();
                onClose();
              }}
            >
              Log out
            </Button>
          </>
        ) : (
          <div className="pt-2 flex flex-col space-y-2">
            <Button variant="outline" asChild onClick={onClose} className="bg-white text-[#006d5b] border-[#006d5b] hover:bg-[#006d5b]/10 transition-transform hover:scale-95">
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild onClick={onClose} className="transition-transform hover:scale-95">
              <Link to="/auth?tab=register">Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
