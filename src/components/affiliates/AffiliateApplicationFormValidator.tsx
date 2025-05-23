
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

    // Check if user already has an application using the new unique constraint
    const { data: existingApplication, error: checkError } = await supabase
      .from('affiliates')
      .select('id, status, email')
      .or(`user_id.eq.${user.id},email.eq.${user.email}`)
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
      const statusMessage = existingApplication.status === 'pending' 
        ? 'Your application is currently under review.'
        : existingApplication.status === 'approved'
        ? 'You already have an approved affiliate account.'
        : 'You have a previous application that was not approved. Please contact support if you wish to reapply.';
        
      toast({
        title: "Application Already Exists",
        description: statusMessage,
        variant: "destructive",
      });
      return false;
    }

    return validatedData;
  };

  return { validateAndLinkApplication };
};
