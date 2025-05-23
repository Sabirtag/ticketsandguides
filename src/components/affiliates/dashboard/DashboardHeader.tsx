
import React from 'react';

interface DashboardHeaderProps {
  fullName: string;
}

const DashboardHeader = ({ fullName }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Partner Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {fullName}!</p>
      </div>
    </div>
  );
};

export default DashboardHeader;
