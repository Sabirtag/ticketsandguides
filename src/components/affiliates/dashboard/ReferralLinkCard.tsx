
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Copy } from 'lucide-react';

interface ReferralLinkCardProps {
  referralCode: string | null;
}

const ReferralLinkCard = ({ referralCode }: ReferralLinkCardProps) => {
  const { toast } = useToast();

  const copyReferralLink = () => {
    if (!referralCode) {
      toast({
        title: "Error",
        description: "Referral code not available yet",
        variant: "destructive",
      });
      return;
    }
    
    const baseUrl = window.location.origin;
    const referralLink = `${baseUrl}/?ref=${referralCode}`;
    
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <Card className="border-border/40 shadow-md overflow-hidden">
      <CardHeader className="bg-secondary/30 pb-6">
        <CardTitle>Your Referral Link</CardTitle>
        <CardDescription>Share this link to earn commissions</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col space-y-4">
          <div className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm">
              {referralCode 
                ? `${window.location.origin}/?ref=${referralCode}` 
                : "Your referral code will appear here once approved"}
            </code>
          </div>
          <Button 
            onClick={copyReferralLink} 
            disabled={!referralCode}
            className="gap-2"
          >
            <Copy size={16} /> Copy Referral Link
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferralLinkCard;
