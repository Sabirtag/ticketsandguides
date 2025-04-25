
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";

const UserMenu = () => {
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback>
              {user ? getUserInitials() : <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/bookings">My Bookings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/guides">Guides</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/partner">Become a Partner</Link>
        </DropdownMenuItem>
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
