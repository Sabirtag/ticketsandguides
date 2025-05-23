
import React from 'react';
import { Link } from 'react-router-dom';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, X, Eye } from 'lucide-react';
import { format } from 'date-fns';
import CommissionRateEditor from './CommissionRateEditor';

interface AffiliateTableRowProps {
  application: any;
  type: 'pending' | 'approved';
  onApprove: (affiliateId: string) => void;
  onReject: (affiliateId: string) => void;
  onRefresh: () => void;
}

const AffiliateTableRow = ({ 
  application, 
  type, 
  onApprove, 
  onReject, 
  onRefresh 
}: AffiliateTableRowProps) => {
  return (
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
        <CommissionRateEditor
          affiliateId={application.id}
          currentRate={application.commission_rate || 10}
          onUpdate={onRefresh}
        />
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
                onClick={() => onApprove(application.id)}
                className="gap-1"
              >
                <CheckCircle className="h-4 w-4" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onReject(application.id)}
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
  );
};

export default AffiliateTableRow;
