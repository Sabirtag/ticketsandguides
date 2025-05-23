
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Pencil } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface CommissionRateEditorProps {
  affiliateId: string;
  currentRate: number;
  onUpdate: () => void;
}

const CommissionRateEditor = ({ affiliateId, currentRate, onUpdate }: CommissionRateEditorProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(currentRate.toString());

  const handleEdit = () => {
    setIsEditing(true);
    setValue(currentRate.toString());
  };

  const handleSave = async () => {
    try {
      const newRate = parseFloat(value);
      
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
      
      setIsEditing(false);
      onUpdate();
    } catch (error: any) {
      console.error('Error updating commission rate:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update commission rate",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(currentRate.toString());
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 min-w-[180px]">
        <Input
          type="number"
          min="0"
          max="100"
          step="0.1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-20"
        />
        <span className="text-sm">%</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          className="h-8 w-8 p-0"
        >
          <Check className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 min-w-[180px]">
      <span>{currentRate}%</span>
      <Button
        size="sm"
        variant="ghost"
        onClick={handleEdit}
        className="h-8 w-8 p-0"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CommissionRateEditor;
