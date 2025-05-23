
import React from 'react';
import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface AffiliateTableHeaderProps {
  type: 'pending' | 'approved';
}

const AffiliateTableHeader = ({ type }: AffiliateTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Business</TableHead>
        <TableHead>Applied</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="min-w-[200px]">Commission Rate</TableHead>
        {type === 'approved' && <TableHead>Referral Code</TableHead>}
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default AffiliateTableHeader;
