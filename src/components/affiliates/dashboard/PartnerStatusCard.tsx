
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PartnerStatusCardProps {
  commissionRate: number;
}

const PartnerStatusCard = ({ commissionRate }: PartnerStatusCardProps) => {
  return (
    <Card className="border-border/40 shadow-md overflow-hidden">
      <CardHeader className="bg-secondary/30 pb-6">
        <CardTitle>Partner Status</CardTitle>
        <CardDescription>Your current status and commission rate</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-muted/60 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <p className="font-medium text-lg">
                <span className="text-green-600">Approved</span>
              </p>
            </div>
            <div className="bg-muted/60 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Commission Rate</p>
              <p className="font-medium text-lg text-primary">{commissionRate}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerStatusCard;
