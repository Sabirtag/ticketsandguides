
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  business_name: z.string().optional(),
  email: z.string().email('Invalid email address'),
  social_links: z.string().optional(),
  reason: z.string().min(10, 'Please provide a brief explanation'),
  preferred_payout_method: z.enum(['PayPal', 'Bank Transfer']),
});

type FormValues = z.infer<typeof formSchema>;

export const AffiliateApplicationForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      business_name: '',
      email: 'sabirborah.borah38@gmail.com', // Pre-filled for demonstration
      social_links: '',
      reason: '',
      preferred_payout_method: 'PayPal',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const socialLinksObj = data.social_links ? 
        { website: data.social_links } : 
        null;

      // Insert the affiliate application
      const { data: affiliateData, error } = await supabase
        .from('affiliates')
        .insert({
          full_name: data.full_name,
          business_name: data.business_name,
          email: data.email,
          social_links: socialLinksObj,
          reason: data.reason,
          preferred_payout_method: data.preferred_payout_method,
          user_id: user?.id // Link to the authenticated user
        })
        .select()
        .single();

      if (error) throw error;

      // Call the edge function to send approval email
      const response = await fetch(
        'https://hymhdfllxtzngzgxedce.supabase.co/functions/v1/send-affiliate-approval',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabase.auth.getSession() ? (await supabase.auth.getSession()).data.session?.access_token : ''}`,
          },
          body: JSON.stringify({
            affiliateId: affiliateData.id,
            email: data.email,
            fullName: data.full_name
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send approval email');
      }

      toast({
        title: "Application Submitted",
        description: "We'll send an approval email with next steps!",
      });

      navigate('/');
    } catch (error: any) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Become a Partner</CardTitle>
        <CardDescription>
          Join our affiliate program and earn commissions by promoting our products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your Business LLC" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="john@example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social_links"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website/Social Media (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://yourwebsite.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why do you want to join our affiliate program?</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us about your experience and how you plan to promote our products..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferred_payout_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Payout Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payout method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Submit Application</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
