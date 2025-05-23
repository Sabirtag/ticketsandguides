
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, UserCheck } from 'lucide-react';

const MakeAdminButton = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const makeAdminUser = async () => {
    try {
      setLoading(true);
      
      console.log('Making admin user request...');
      
      // Use supabase.functions.invoke to call the edge function
      const { data, error } = await supabase.functions.invoke('make-admin-user');
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to make user admin');
      }
      
      console.log('Edge function response:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      toast({
        title: "Success!",
        description: `User ticketsandguides@gmail.com has been made an admin. ${data.message || ''}`,
      });
      
    } catch (error: any) {
      console.error('Error making user admin:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to make user admin",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={makeAdminUser}
      disabled={loading}
      className="gap-2"
      variant="cta"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <UserCheck className="h-4 w-4" />
      )}
      Make Admin: ticketsandguides@gmail.com
    </Button>
  );
};

export default MakeAdminButton;
