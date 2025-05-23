
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AffiliateApplicationsTable from '@/components/admin/AffiliateApplicationsTable';
import AdminStats from '@/components/admin/AdminStats';
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage affiliate applications and monitor performance</p>
        </div>

        <AdminStats />

        <Tabs defaultValue="pending" className="mt-8">
          <TabsList className="mb-6">
            <TabsTrigger value="pending" className="flex items-center gap-2">
              Pending Applications
              {pendingApplications.length > 0 && (
                <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                  {pendingApplications.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved Affiliates</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Affiliate Applications</CardTitle>
                <CardDescription>
                  Review and approve new affiliate applications
                </CardDescription>
              </CardHeader>
              <CardContent>
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
                <CardTitle>Approved Affiliates</CardTitle>
                <CardDescription>
                  Manage existing affiliate partnerships
                </CardDescription>
              </CardHeader>
              <CardContent>
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
