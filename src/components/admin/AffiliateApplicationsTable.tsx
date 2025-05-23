
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, X, Eye, Check, Pencil } from 'lucide-react';
import { format } from 'date-fns';

interface AffiliateApplicationsTableProps {
  applications: any[];
  loading: boolean;
  onRefresh: () => void;
  type: 'pending' | 'approved';
}

const AffiliateApplicationsTable = ({ applications, loading, onRefresh, type }: AffiliateApplicationsTableProps) => {
  const { toast } = useToast();
  const [editingCommission, setEditingCommission] = useState<string | null>(null);
  const [commissionValues, setCommissionValues] = useState<Record<string, string>>({});

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

  const handleCommissionEdit = (affiliateId: string, currentRate: number) => {
    setEditingCommission(affiliateId);
    setCommissionValues({
      ...commissionValues,
      [affiliateId]: currentRate.toString()
    });
  };

  const handleCommissionSave = async (affiliateId: string) => {
    try {
      const newRate = parseFloat(commissionValues[affiliateId]);
      
      if (isNaN(newRate) || newRate < 0 || newRate > 100) {
        toast({
          title: "Error",
          description: "Please enter a valid commission rate between 0 and 100",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('affiliates')
        .update({ commission_rate: newRate })
        .eq('id', affiliateId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Commission rate updated successfully",
      });
      
      setEditingCommission(null);
      onRefresh();
    } catch (error: any) {
      console.error('Error updating commission rate:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update commission rate",
        variant: "destructive",
      });
    }
  };

  const handleCommissionCancel = () => {
    setEditingCommission(null);
    setCommissionValues({});
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
            <TableCell>
              <div className="flex items-center gap-2">
                {editingCommission === application.id ? (
                  <>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={commissionValues[application.id] || ''}
                      onChange={(e) => setCommissionValues({
                        ...commissionValues,
                        [application.id]: e.target.value
                      })}
                      className="w-20"
                    />
                    <span className="text-sm">%</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCommissionSave(application.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCommissionCancel}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <span>{application.commission_rate || 10}%</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCommissionEdit(application.id, application.commission_rate || 10)}
                      className="h-8 w-8 p-0"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </TableCell>
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
                <Button size="sm" variant="outline" className="gap-1" asChild>
                  <Link to={`/admin/affiliate/${application.id}`}>
                    <Eye className="h-4 w-4" />
                    View
                  </Link>
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
