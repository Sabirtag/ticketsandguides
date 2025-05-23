
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight, TrendingUp, Users, Wallet } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalClicks: number;
    totalSales: number;
    totalEarnings: number;
    pendingPayouts: number;
  };
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="border-border/40 shadow-md bg-white hover:bg-secondary/10 transition-colors">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          <div className="w-8 h-8 bg-accent/70 rounded-full flex items-center justify-center">
            <Users size={16} className="text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.totalClicks}</p>
          <p className="text-xs text-muted-foreground mt-1">Unique visitors through your link</p>
        </CardContent>
      </Card>
      
      <Card className="border-border/40 shadow-md bg-white hover:bg-secondary/10 transition-colors">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <div className="w-8 h-8 bg-accent/70 rounded-full flex items-center justify-center">
            <TrendingUp size={16} className="text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.totalSales}</p>
          <p className="text-xs text-muted-foreground mt-1">Completed transactions from referrals</p>
        </CardContent>
      </Card>
      
      <Card className="border-border/40 shadow-md bg-white hover:bg-secondary/10 transition-colors">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
          <div className="w-8 h-8 bg-accent/70 rounded-full flex items-center justify-center">
            <Wallet size={16} className="text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹{stats.totalEarnings.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Your lifetime commission earnings</p>
        </CardContent>
      </Card>
      
      <Card className="border-border/40 shadow-md bg-white hover:bg-secondary/10 transition-colors">
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
          <div className="w-8 h-8 bg-accent/70 rounded-full flex items-center justify-center">
            <ChevronRight size={16} className="text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">₹{stats.pendingPayouts.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Amount ready for withdrawal</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
