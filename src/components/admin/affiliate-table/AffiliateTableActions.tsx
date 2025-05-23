
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AffiliateTableActionsProps {
  onRefresh: () => void;
}

const useAffiliateActions = ({ onRefresh }: AffiliateTableActionsProps) => {
  const { toast } = useToast();

  const handleApprove = async (affiliateId: string) => {
    try {
      const { error } = await supabase
        .from('affiliates')
        .update({ status: 'approved' })
        .eq('id', affiliateId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Affiliate application approved successfully",
      });
      onRefresh();
    } catch (error: any) {
      console.error('Error approving affiliate:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to approve affiliate",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (affiliateId: string) => {
    try {
      const { error } = await supabase
        .from('affiliates')
        .update({ status: 'rejected' })
        .eq('id', affiliateId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Affiliate application rejected",
      });
      onRefresh();
    } catch (error: any) {
      console.error('Error rejecting affiliate:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to reject affiliate",
        variant: "destructive",
      });
    }
  };

  return { handleApprove, handleReject };
};

export default useAffiliateActions;
