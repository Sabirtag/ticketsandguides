
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";
import { toast } from "sonner";

const UserMenu = () => {
  const navigate = useNavigate();
  const {
    user,
    profile,
    signOut
  } = useAuth();
  
  console.log("👤 UserMenu - User:", user);
  console.log("👤 UserMenu - Profile:", profile);
  
  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2);
    }
    
    // Handle Google login user data
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    
    return user?.email?.substring(0, 2).toUpperCase() || "U";
  };

  const handleMenuItemClick = (path: string) => {
    if (!user) {
      toast.error("You need to be logged in to access this page");
      navigate("/auth");
      return;
    }
    navigate(path);
  };
  
  const getAvatarUrl = () => {
    if (profile?.avatar_url) return profile.avatar_url;
    // Try to get avatar from Google auth
    if (user?.user_metadata?.avatar_url) return user.user_metadata.avatar_url;
    return null;
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage 
              src={getAvatarUrl()} 
              className="object-cover"
            />
            <AvatarFallback className="text-base text-black my-0 mx-[2px] font-normal">
              {user ? getUserInitials() : <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <>
            <DropdownMenuItem onClick={() => handleMenuItemClick("/profile")}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick("/bookings")}>
              My Bookings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick("/guides")}>
              Guides
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleMenuItemClick("/partner")}>
              Become a Partner
            </DropdownMenuItem>
          </>
        ) : null}
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem onClick={() => signOut()}>
            Log out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link to="/auth">Sign in</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
