
import React from 'react';

interface EmptyTableStateProps {
  type: 'pending' | 'approved';
  loading: boolean;
}

const EmptyTableState = ({ type, loading }: EmptyTableStateProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-muted-foreground">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-muted-foreground">
        {type === 'pending' ? 'No pending applications' : 'No approved affiliates'}
      </div>
    </div>
  );
};

export default EmptyTableState;
