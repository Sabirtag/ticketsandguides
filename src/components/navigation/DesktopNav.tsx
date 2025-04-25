
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserMenu from '../navigation/UserMenu';

const DesktopNav = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-4">
      <Button variant="ghost" asChild>
        <Link to="/">Home</Link>
      </Button>
      <UserMenu />
    </nav>
  );
};

export default DesktopNav;
