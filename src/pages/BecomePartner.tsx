
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { AffiliateApplicationForm } from '@/components/affiliates/AffiliateApplicationForm';
import AffiliateDashboard from '@/components/affiliates/AffiliateDashboard';

const BecomePartner = () => {
  const { user } = useAuth();
  const [isAffiliate, setIsAffiliate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAffiliateStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('affiliates')
          .select('status')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;
        
        // Check if user is an approved affiliate
        setIsAffiliate(data?.status === 'approved');
      } catch (error) {
        console.error('Error checking affiliate status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAffiliateStatus();
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isAffiliate ? (
        <AffiliateDashboard />
      ) : (
        <AffiliateApplicationForm />
      )}
    </div>
  );
};

export default BecomePartner;
