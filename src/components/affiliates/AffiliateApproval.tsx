
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const AffiliateApproval = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    const approveAffiliate = async () => {
      try {
        setLoading(true);
        
        const token = searchParams.get('token');
        const affiliateId = searchParams.get('id');
        
        if (!token || !affiliateId) {
          setError('Invalid approval link. Missing required parameters.');
          return;
        }
        
        // First verify the token matches
        const { data: affiliateData, error: fetchError } = await supabase
          .from('affiliates')
          .select('*')
          .eq('id', affiliateId)
          .single();
          
        if (fetchError || !affiliateData) {
          setError('Could not find the affiliate record.');
          return;
        }
        
        // Check if admin_notes contains the token
        let adminNotes;
        try {
          adminNotes = JSON.parse(affiliateData.admin_notes || '{}');
        } catch (e) {
          adminNotes = {};
        }
        
        if (adminNotes?.approval_token !== token) {
          setError('Invalid approval token.');
          return;
        }
        
        // Token is valid, update the affiliate status
        const { error: updateError } = await supabase
          .from('affiliates')
          .update({ 
            status: 'approved',
            // Clear the token after use for security
            admin_notes: JSON.stringify({
              ...adminNotes,
              approval_token: null,
              approved_at: new Date().toISOString()
            })
          })
          .eq('id', affiliateId);
          
        if (updateError) {
          setError('Failed to approve affiliate: ' + updateError.message);
          return;
        }
        
        setSuccess(true);
        toast({
          title: "Success!",
          description: "The affiliate has been approved successfully.",
        });
      } catch (err: any) {
        setError('An unexpected error occurred: ' + err.message);
      } finally {
        setLoading(false);
      }
    };
    
    approveAffiliate();
  }, [searchParams]);
  
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Affiliate Approval</CardTitle>
          <CardDescription className="text-center">
            {loading ? 'Processing your approval request...' : 
             success ? 'Affiliate account has been approved!' : 
             'There was an issue with the approval process.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {loading && (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p>Processing...</p>
            </div>
          )}
          
          {success && (
            <div className="flex flex-col items-center space-y-2">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p>The affiliate account has been successfully approved.</p>
              <Button onClick={() => navigate('/partner')} className="mt-4">
                Go to Affiliate Dashboard
              </Button>
            </div>
          )}
          
          {error && (
            <div className="flex flex-col items-center space-y-2">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <p className="text-red-500">{error}</p>
              <Button variant="outline" onClick={() => navigate('/')} className="mt-4">
                Return to Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AffiliateApproval;
