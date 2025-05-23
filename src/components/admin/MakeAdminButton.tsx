
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const MakeAdminButton = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const makeAdminUser = async () => {
    try {
      setLoading(true);
      
      // Use supabase.functions.invoke instead of fetch
      const { data, error } = await supabase.functions.invoke('make-admin-user');
      
      if (error) {
        throw new Error(error.message || 'Failed to make user admin');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      toast({
        title: "Success!",
        description: `User ${data.email} has been made an admin.`,
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
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      Make User Admin
    </Button>
  );
};

export default MakeAdminButton;
