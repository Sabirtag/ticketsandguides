
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ActivityTabs = () => {
  return (
    <Tabs defaultValue="recent" className="w-full">
      <TabsList className="bg-muted">
        <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        <TabsTrigger value="sales">Sales</TabsTrigger>
        <TabsTrigger value="payouts">Payouts</TabsTrigger>
      </TabsList>
      
      <TabsContent value="recent" className="p-0 mt-6">
        <Card className="border-border/40 shadow-md">
          <CardHeader className="border-b pb-4">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent referrals and sales</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-center py-12 text-muted-foreground">
              No recent activity to display
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="sales" className="p-0 mt-6">
        <Card className="border-border/40 shadow-md">
          <CardHeader className="border-b pb-4">
            <CardTitle>Sales</CardTitle>
            <CardDescription>Your commission earnings from sales</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Amount (₹)</TableHead>
                  <TableHead>Commission (₹)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No sales data to display
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="payouts" className="p-0 mt-6">
        <Card className="border-border/40 shadow-md">
          <CardHeader className="border-b pb-4">
            <CardTitle>Payouts</CardTitle>
            <CardDescription>Your payment history</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount (₹)</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No payout data to display
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ActivityTabs;
