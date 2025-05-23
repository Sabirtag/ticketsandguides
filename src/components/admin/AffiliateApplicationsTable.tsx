
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle, X, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface AffiliateApplicationsTableProps {
  applications: any[];
  loading: boolean;
  onRefresh: () => void;
  type: 'pending' | 'approved';
}

const AffiliateApplicationsTable = ({ applications, loading, onRefresh, type }: AffiliateApplicationsTableProps) => {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-muted-foreground">Loading applications...</div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-muted-foreground">
          {type === 'pending' ? 'No pending applications' : 'No approved affiliates'}
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Business</TableHead>
          <TableHead>Applied</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Commission Rate</TableHead>
          {type === 'approved' && <TableHead>Referral Code</TableHead>}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application) => (
          <TableRow key={application.id}>
            <TableCell className="font-medium">{application.full_name}</TableCell>
            <TableCell>{application.email}</TableCell>
            <TableCell>{application.business_name || 'N/A'}</TableCell>
            <TableCell>{format(new Date(application.created_at), 'MMM dd, yyyy')}</TableCell>
            <TableCell>
              <Badge variant={application.status === 'approved' ? 'default' : 'secondary'}>
                {application.status}
              </Badge>
            </TableCell>
            <TableCell>{application.commission_rate || 10}%</TableCell>
            {type === 'approved' && (
              <TableCell>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {application.referral_code || 'N/A'}
                </code>
              </TableCell>
            )}
            <TableCell>
              <div className="flex items-center gap-2">
                {type === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(application.id)}
                      className="gap-1"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(application.id)}
                      className="gap-1"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                  </>
                )}
                <Button size="sm" variant="outline" className="gap-1">
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AffiliateApplicationsTable;
