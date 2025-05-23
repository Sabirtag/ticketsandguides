
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useAffiliateApplicationValidator = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const validateAndLinkApplication = async (applicationData: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit an affiliate application.",
        variant: "destructive",
      });
      return false;
    }

    // Ensure the application is properly linked to the current user
    const validatedData = {
      ...applicationData,
      user_id: user.id,
      email: user.email || applicationData.email,
    };

    console.log('AffiliateApplicationValidator: Validating application data:', {
      userId: user.id,
      email: user.email,
      providedEmail: applicationData.email
    });

    // Check if user already has an application
    const { data: existingApplication, error: checkError } = await supabase
      .from('affiliates')
      .select('id, status, email')
      .eq('user_id', user.id)
      .maybeSingle();

    if (checkError) {
      console.error('AffiliateApplicationValidator: Error checking existing application:', checkError);
      toast({
        title: "Error",
        description: "Failed to check existing applications. Please try again.",
        variant: "destructive",
      });
      return false;
    }

    if (existingApplication) {
      toast({
        title: "Application Already Exists",
        description: `You already have an application with status: ${existingApplication.status}`,
        variant: "destructive",
      });
      return false;
    }

    return validatedData;
  };

  return { validateAndLinkApplication };
};
