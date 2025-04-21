import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu } from "lucide-react";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-0 px-2">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-2/3 p-4">
        <SheetHeader className="text-left">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Explore our site.
          </SheetDescription>
        </SheetHeader>
        <SheetClose asChild>
          <Link to="/" className="flex items-center p-2 hover:bg-accent rounded-lg">
            Home
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/destinations" className="flex items-center p-2 hover:bg-accent rounded-lg">
            Destinations
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/guides" className="flex items-center p-2 hover:bg-accent rounded-lg">
            Guides
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/blog" className="flex items-center p-2 hover:bg-accent rounded-lg">
            Blog
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/contact" className="flex items-center p-2 hover:bg-accent rounded-lg">
            Contact
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link to="/partner" className="flex items-center p-2 hover:bg-accent rounded-lg">
            Become a Partner
          </Link>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
