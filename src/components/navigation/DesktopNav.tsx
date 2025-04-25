
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DesktopNav = () => {
  return (
    <nav className="hidden lg:flex space-x-4">
      <Button variant="ghost" asChild>
        <Link to="/">Home</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link to="/guides">Guides</Link>
      </Button>
      <Button variant="ghost" asChild>
        <Link to="/partner">Become a Partner</Link>
      </Button>
    </nav>
  );
};

export default DesktopNav;
