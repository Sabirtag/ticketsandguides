
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AffiliateApplicationsTable from '@/components/admin/AffiliateApplicationsTable';
import AdminStats from '@/components/admin/AdminStats';
import MakeAdminButton from '@/components/admin/MakeAdminButton';
import Navbar from '@/components/Navbar';

const AdminDashboard = () => {
  const [pendingApplications, setPendingApplications] = useState<any[]>([]);
  const [approvedAffiliates, setApprovedAffiliates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAffiliateData();
  }, []);

  const fetchAffiliateData = async () => {
    try {
      setLoading(true);
      
      // Fetch pending applications
      const { data: pending, error: pendingError } = await supabase
        .from('affiliates')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (pendingError) throw pendingError;

      // Fetch approved affiliates
      const { data: approved, error: approvedError } = await supabase
        .from('affiliates')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (approvedError) throw approvedError;

      setPendingApplications(pending || []);
      setApprovedAffiliates(approved || []);
    } catch (error) {
      console.error('Error fetching affiliate data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm sm:text-base">Manage affiliate applications and monitor performance</p>
          </div>
          <MakeAdminButton />
        </div>

        <AdminStats />

        <Tabs defaultValue="pending" className="mt-6 sm:mt-8">
          <TabsList className="mb-4 sm:mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="pending" className="flex items-center gap-2 text-sm">
              <span className="hidden sm:inline">Pending Applications</span>
              <span className="sm:hidden">Pending</span>
              {pendingApplications.length > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                  {pendingApplications.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved" className="text-sm">
              <span className="hidden sm:inline">Approved Affiliates</span>
              <span className="sm:hidden">Approved</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Pending Affiliate Applications</CardTitle>
                <CardDescription className="text-sm">
                  Review and approve new affiliate applications
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <AffiliateApplicationsTable
                  applications={pendingApplications}
                  loading={loading}
                  onRefresh={fetchAffiliateData}
                  type="pending"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Approved Affiliates</CardTitle>
                <CardDescription className="text-sm">
                  Manage existing affiliate partnerships
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                <AffiliateApplicationsTable
                  applications={approvedAffiliates}
                  loading={loading}
                  onRefresh={fetchAffiliateData}
                  type="approved"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
