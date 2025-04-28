
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AccountSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-base">Change Password</h3>
            <p className="text-sm text-gray-500">Update your password for security</p>
          </div>
          <Button variant="outline">Change Password</Button>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium text-base">Notifications</h3>
            <p className="text-sm text-gray-500">Manage your notification preferences</p>
          </div>
          <Button variant="outline">Configure</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
