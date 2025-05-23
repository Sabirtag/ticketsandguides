
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import DashboardHeader from './dashboard/DashboardHeader';
import ReferralLinkCard from './dashboard/ReferralLinkCard';
import PartnerStatusCard from './dashboard/PartnerStatusCard';
import StatsCards from './dashboard/StatsCards';
import ActivityTabs from './dashboard/ActivityTabs';

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

      console.log('AffiliateDashboard: Fetching data for user:', user.id);

      try {
        // Get affiliate data
        const { data, error } = await supabase
          .from('affiliates')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'approved')
          .single();

        if (error) {
          console.error('AffiliateDashboard: Error fetching affiliate data:', error);
          throw error;
        }
        
        console.log('AffiliateDashboard: Affiliate data:', data);
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
  }, [user, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="border-border/40 shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">Loading your affiliate dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="border-border/40 shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">No approved affiliate account found</p>
                <p className="text-sm text-muted-foreground">Please ensure your affiliate application has been approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-8">
        <DashboardHeader fullName={affiliate.full_name} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReferralLinkCard referralCode={affiliate?.referral_code} />
          <PartnerStatusCard commissionRate={affiliate?.commission_rate || 10} />
        </div>
        
        <StatsCards stats={stats} />
        
        <ActivityTabs />
      </div>
    </div>
  );
};

export default AffiliateDashboard;
