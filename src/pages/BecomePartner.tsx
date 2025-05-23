
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AffiliateApplicationForm } from '@/components/affiliates/AffiliateApplicationForm';
import AffiliateDashboard from '@/components/affiliates/AffiliateDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const BecomePartner = () => {
  const { user } = useAuth();
  const [affiliateStatus, setAffiliateStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [affiliateData, setAffiliateData] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAffiliateStatus = async () => {
      if (!user) {
        console.log('BecomePartner: No user found');
        setLoading(false);
        return;
      }

      console.log('BecomePartner: Checking affiliate status for user:', user.id, 'email:', user.email);

      try {
        // Use the new unique constraint to get the affiliate record
        const { data: affiliateData, error } = await supabase
          .from('affiliates')
          .select('*')
          .or(`user_id.eq.${user.id},email.eq.${user.email}`)
          .maybeSingle();

        if (error) {
          console.error('BecomePartner: Error checking affiliate status:', error);
          throw error;
        }

        // If we found a record by email but user_id doesn't match, update it
        if (affiliateData && affiliateData.user_id !== user.id) {
          console.log('BecomePartner: Updating user_id for affiliate record');
          
          const { error: updateError } = await supabase
            .from('affiliates')
            .update({ user_id: user.id })
            .eq('id', affiliateData.id);

          if (updateError) {
            console.error('BecomePartner: Error updating user_id:', updateError);
            toast({
              title: "Error",
              description: "Failed to sync affiliate account. Please contact support.",
              variant: "destructive",
            });
          } else {
            console.log('BecomePartner: Successfully updated user_id for affiliate record');
            affiliateData.user_id = user.id; // Update local data
          }
        }

        setAffiliateData(affiliateData);
        setAffiliateStatus(affiliateData?.status || null);

        console.log('BecomePartner: Final affiliate status:', affiliateData?.status, 'data:', affiliateData);
      } catch (error) {
        console.error('BecomePartner: Unexpected error:', error);
        toast({
          title: "Error",
          description: "Failed to load affiliate information. Please try again.",
          variant: "destructive",
        });
        setAffiliateStatus(null);
      } finally {
        setLoading(false);
      }
    };

    checkAffiliateStatus();

    // Set up real-time subscription for affiliate status changes
    if (user) {
      const channel = supabase
        .channel('affiliate-status-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'affiliates',
            filter: `user_id=eq.${user.id}`
          },
          (payload) => {
            console.log('BecomePartner: Real-time update received:', payload);
            
            if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
              setAffiliateData(payload.new);
              setAffiliateStatus(payload.new.status);
              
              if (payload.new.status === 'approved' && payload.old?.status === 'pending') {
                toast({
                  title: "Application Approved!",
                  description: "Your affiliate application has been approved. Welcome to our partner program!",
                });
              }
            } else if (payload.eventType === 'DELETE') {
              setAffiliateData(null);
              setAffiliateStatus(null);
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <Card className="border-border/40 shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-32">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  console.log('BecomePartner: Rendering with status:', affiliateStatus);

  // Show partner dashboard if approved
  if (affiliateStatus === 'approved') {
    console.log('BecomePartner: Showing AffiliateDashboard for approved partner');
    return (
      <div className="container mx-auto px-4 py-8">
        <AffiliateDashboard />
      </div>
    );
  }

  // Show application status if pending
  if (affiliateStatus === 'pending') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Application Under Review</h2>
            <p className="text-muted-foreground mb-6">
              Your affiliate application is currently being reviewed by our team. 
              We'll notify you via email once your application is approved.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-amber-800 text-sm">
                <strong>Status:</strong> Pending Review
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show application status if rejected
  if (affiliateStatus === 'rejected') {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Application Not Approved</h2>
            <p className="text-muted-foreground mb-6">
              Unfortunately, your affiliate application was not approved at this time. 
              You're welcome to apply again in the future.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                <strong>Status:</strong> Not Approved
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show application form if no application exists
  console.log('BecomePartner: Showing AffiliateApplicationForm');
  return (
    <div className="container mx-auto px-4 py-8">
      <AffiliateApplicationForm />
    </div>
  );
};

export default BecomePartner;
