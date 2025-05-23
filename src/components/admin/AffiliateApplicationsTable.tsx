
import React from 'react';
import { Table, TableBody } from '@/components/ui/table';
import AffiliateTableHeader from './affiliate-table/AffiliateTableHeader';
import AffiliateTableRow from './affiliate-table/AffiliateTableRow';
import EmptyTableState from './affiliate-table/EmptyTableState';
import useAffiliateActions from './affiliate-table/AffiliateTableActions';

interface AffiliateApplicationsTableProps {
  applications: any[];
  loading: boolean;
  onRefresh: () => void;
  type: 'pending' | 'approved';
}

const AffiliateApplicationsTable = ({ 
  applications, 
  loading, 
  onRefresh, 
  type 
}: AffiliateApplicationsTableProps) => {
  const { handleApprove, handleReject } = useAffiliateActions({ onRefresh });

  if (loading || applications.length === 0) {
    return <EmptyTableState type={type} loading={loading} />;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <AffiliateTableHeader type={type} />
        <TableBody>
          {applications.map((application) => (
            <AffiliateTableRow
              key={application.id}
              application={application}
              type={type}
              onApprove={handleApprove}
              onReject={handleReject}
              onRefresh={onRefresh}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AffiliateApplicationsTable;
