
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, X, ArrowLeft, User, Building, Mail, Calendar, FileText, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';

const AffiliateDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [affiliate, setAffiliate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAffiliateDetail();
    }
  }, [id]);

  const fetchAffiliateDetail = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('affiliates')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setAffiliate(data);
    } catch (error: any) {
      console.error('Error fetching affiliate detail:', error);
      toast({
        title: "Error",
        description: "Failed to load affiliate details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('affiliates')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Affiliate application approved successfully",
      });
      
      // Update local state
      setAffiliate({ ...affiliate, status: 'approved' });
    } catch (error: any) {
      console.error('Error approving affiliate:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to approve affiliate",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);
      const { error } = await supabase
        .from('affiliates')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Affiliate application rejected",
      });
      
      // Update local state
      setAffiliate({ ...affiliate, status: 'rejected' });
    } catch (error: any) {
      console.error('Error rejecting affiliate:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reject affiliate",
        variant: "destructive",
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
          <div className="text-muted-foreground">Loading affiliate details...</div>
        </div>
      </div>
    );
  }

  if (!affiliate) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive">Affiliate Not Found</h1>
            <p className="text-muted-foreground mt-2">The requested affiliate application could not be found.</p>
            <Button 
              onClick={() => navigate('/admin')} 
              className="mt-4"
              variant="outline"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/admin')} 
            variant="outline" 
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admin Dashboard
          </Button>
          
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Affiliate Application</h1>
              <p className="text-muted-foreground">Detailed view of affiliate submission</p>
            </div>
            <Badge variant={affiliate.status === 'approved' ? 'default' : affiliate.status === 'rejected' ? 'destructive' : 'secondary'}>
              {affiliate.status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                    <p className="text-lg font-medium">{affiliate.full_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg">{affiliate.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Business Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Business Name</label>
                  <p className="text-lg">{affiliate.business_name || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Preferred Payout Method</label>
                  <p className="text-lg">{affiliate.preferred_payout_method || 'Not specified'}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Application Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Reason for Joining</label>
                  <p className="text-lg whitespace-pre-wrap">{affiliate.reason || 'Not provided'}</p>
                </div>
                {affiliate.social_links && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Social Media Links</label>
                    <div className="space-y-2 mt-2">
                      {Object.entries(affiliate.social_links as Record<string, string>).map(([platform, url]) => (
                        <div key={platform} className="flex items-center gap-2">
                          <span className="capitalize font-medium">{platform}:</span>
                          <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            {url}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {affiliate.admin_notes && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Admin Notes</label>
                    <p className="text-lg whitespace-pre-wrap">{affiliate.admin_notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Applied</label>
                  <p className="text-lg">{format(new Date(affiliate.created_at), 'MMM dd, yyyy')}</p>
                  <p className="text-sm text-muted-foreground">{format(new Date(affiliate.created_at), 'hh:mm a')}</p>
                </div>
                {affiliate.updated_at !== affiliate.created_at && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                    <p className="text-lg">{format(new Date(affiliate.updated_at), 'MMM dd, yyyy')}</p>
                    <p className="text-sm text-muted-foreground">{format(new Date(affiliate.updated_at), 'hh:mm a')}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Commission Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Commission Rate</label>
                  <p className="text-2xl font-bold">{affiliate.commission_rate || 10}%</p>
                </div>
                {affiliate.referral_code && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Referral Code</label>
                    <code className="block text-sm bg-muted px-3 py-2 rounded mt-1">
                      {affiliate.referral_code}
                    </code>
                  </div>
                )}
              </CardContent>
            </Card>

            {affiliate.status === 'pending' && (
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                  <CardDescription>Review and take action on this application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleApprove}
                    disabled={actionLoading}
                    className="w-full gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approve Application
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={actionLoading}
                    variant="destructive"
                    className="w-full gap-2"
                  >
                    <X className="h-4 w-4" />
                    Reject Application
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDetail;
