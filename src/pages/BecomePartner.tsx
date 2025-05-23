
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AffiliateApplicationForm } from '@/components/affiliates/AffiliateApplicationForm';
import AffiliateDashboard from '@/components/affiliates/AffiliateDashboard';
import { Card, CardContent } from '@/components/ui/card';

const BecomePartner = () => {
  const { user } = useAuth();
  const [affiliateStatus, setAffiliateStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAffiliateStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      console.log('BecomePartner: Checking affiliate status for user:', user.id);

      try {
        const { data, error } = await supabase
          .from('affiliates')
          .select('status')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) {
          console.error('BecomePartner: Error checking affiliate status:', error);
          throw error;
        }
        
        console.log('BecomePartner: Affiliate data:', data);
        setAffiliateStatus(data?.status || null);
      } catch (error) {
        console.error('Error checking affiliate status:', error);
        setAffiliateStatus(null);
      } finally {
        setLoading(false);
      }
    };

    checkAffiliateStatus();
  }, [user]);

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

  console.log('BecomePartner: Current affiliate status:', affiliateStatus);

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
