
import React from 'react';
import UserMenu from '../navigation/UserMenu';

const DesktopNav = () => {
  return (
    <nav className="hidden lg:flex items-center space-x-4">
      <UserMenu />
    </nav>
  );
};

export default DesktopNav;
