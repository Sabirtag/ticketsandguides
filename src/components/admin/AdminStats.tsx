
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalAffiliates: 0,
    pendingApplications: 0,
    approvedAffiliates: 0,
    totalCommissions: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total affiliates count
      const { count: totalCount } = await supabase
        .from('affiliates')
        .select('*', { count: 'exact', head: true });

      // Get pending applications count
      const { count: pendingCount } = await supabase
        .from('affiliates')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      // Get approved affiliates count
      const { count: approvedCount } = await supabase
        .from('affiliates')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'approved');

      // Get total commissions (from affiliate_sales table)
      const { data: commissionsData } = await supabase
        .from('affiliate_sales')
        .select('commission_amount');

      const totalCommissions = commissionsData?.reduce(
        (sum, sale) => sum + (sale.commission_amount || 0), 0
      ) || 0;

      setStats({
        totalAffiliates: totalCount || 0,
        pendingApplications: pendingCount || 0,
        approvedAffiliates: approvedCount || 0,
        totalCommissions
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Affiliates</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalAffiliates}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{stats.pendingApplications}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approved Affiliates</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.approvedAffiliates}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.totalCommissions.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
