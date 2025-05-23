
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export function useAdminCheck() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        console.log('useAdminCheck: No user found');
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      console.log('useAdminCheck: Checking admin status for user:', user.email);

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) {
          console.error('useAdminCheck: Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          const adminStatus = !!data;
          console.log('useAdminCheck: Admin status result:', adminStatus, 'Data:', data);
          setIsAdmin(adminStatus);
        }
      } catch (error) {
        console.error('useAdminCheck: Error in admin check:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
}
