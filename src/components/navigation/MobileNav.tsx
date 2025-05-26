
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Menu, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { ScrollArea } from "@/components/ui/scroll-area";

const MobileNav = () => {
  const { user, signOut } = useAuth();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 px-2 text-inherit bg-inherit">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-2/3 p-4 overflow-y-auto" hideCloseButton>
        <ScrollArea className="h-full pr-4">
          <SheetHeader className="text-left">
            <div className="flex items-center gap-2">
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </SheetClose>
              <SheetTitle>Menu</SheetTitle>
            </div>
            <SheetDescription>
              Explore our site.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 flex flex-col gap-3">
            <SheetClose asChild>
              <Link to="/profile" className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors">
                Profile
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/bookings" className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors">
                My Bookings
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/guides" className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors">
                Guides
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link to="/partner" className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors">
                Become a Partner
              </Link>
            </SheetClose>
            
            {user ? (
              <SheetClose asChild>
                <button onClick={() => signOut()} className="w-full text-left flex items-center p-3 hover:bg-accent rounded-lg transition-colors text-red-600">
                  Log Out
                </button>
              </SheetClose>
            ) : (
              <SheetClose asChild>
                <Link to="/auth" className="flex items-center p-3 hover:bg-accent rounded-lg transition-colors">
                  Sign In
                </Link>
              </SheetClose>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
