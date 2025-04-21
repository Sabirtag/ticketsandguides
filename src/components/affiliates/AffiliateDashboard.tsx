
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const AffiliateDashboard = () => {
  const { user } = useAuth();
  const [affiliate, setAffiliate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalSales: 0,
    totalEarnings: 0,
    pendingPayouts: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchAffiliateData = async () => {
      if (!user) return;

      try {
        // Get affiliate data
        const { data, error } = await supabase
          .from('affiliates')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        
        setAffiliate(data);
        
        // For now, set dummy stats
        // In a real app, you'd fetch real data from clicks and sales tables
        setStats({
          totalClicks: 0,
          totalSales: 0,
          totalEarnings: 0,
          pendingPayouts: 0
        });
      } catch (error: any) {
        console.error('Error fetching affiliate data:', error);
        toast({
          title: "Error",
          description: "Failed to load affiliate data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliateData();
  }, [user]);

  const copyReferralLink = () => {
    if (!affiliate?.referral_code) return;
    
    const baseUrl = window.location.origin;
    const referralLink = `${baseUrl}/?ref=${affiliate.referral_code}`;
    
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-64">
              <p>Loading your affiliate dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Affiliate Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Link</CardTitle>
              <CardDescription>Share this link to earn commissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="bg-slate-100 p-3 rounded-md overflow-x-auto">
                  <code className="text-sm">
                    {affiliate?.referral_code 
                      ? `${window.location.origin}/?ref=${affiliate.referral_code}` 
                      : "Your referral code will appear here once approved"}
                  </code>
                </div>
                <Button 
                  onClick={copyReferralLink} 
                  disabled={!affiliate?.referral_code}
                >
                  Copy Referral Link
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Affiliate Status</CardTitle>
              <CardDescription>Your current status and commission rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">
                      {affiliate?.status === 'approved' 
                        ? <span className="text-green-500">Approved</span>
                        : <span className="text-yellow-500">Pending</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Commission Rate</p>
                    <p className="font-medium">{affiliate?.commission_rate || 10}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalClicks}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalSales}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">${stats.pendingPayouts.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="recent">
          <TabsList>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="p-0 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent referrals and sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  No recent activity to display
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sales" className="p-0 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales</CardTitle>
                <CardDescription>Your commission earnings from sales</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No sales data to display
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payouts" className="p-0 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payouts</CardTitle>
                <CardDescription>Your payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Transaction ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No payout data to display
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AffiliateDashboard;
