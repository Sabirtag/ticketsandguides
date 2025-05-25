
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/home/Footer';

const guideApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  location: z.string().min(2, 'Please enter your location'),
  experience: z.string().min(1, 'Please select your experience level'),
  languages: z.string().min(2, 'Please list the languages you speak'),
  specializations: z.string().min(2, 'Please describe your specializations'),
  qualifications: z.string().min(10, 'Please describe your qualifications'),
  motivation: z.string().min(50, 'Please tell us why you want to become a guide (minimum 50 characters)'),
});

type GuideApplicationForm = z.infer<typeof guideApplicationSchema>;

const GuideApplication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<GuideApplicationForm>({
    resolver: zodResolver(guideApplicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      experience: '',
      languages: '',
      specializations: '',
      qualifications: '',
      motivation: '',
    },
  });

  const onSubmit = async (data: GuideApplicationForm) => {
    try {
      console.log('Guide application submitted:', data);
      
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in becoming a TAG guide. We'll review your application and get back to you soon.",
      });
      
      // Reset form
      form.reset();
      
      // Navigate back to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting guide application:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-muted-foreground mb-4 sm:mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center px-4 sm:px-6 lg:px-8">
              <CardTitle className="text-2xl sm:text-3xl font-bold">Become a TAG Guide</CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Join our community of passionate heritage guides and help visitors discover India's rich history and culture.
              </p>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 lg:px-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
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
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 9876543210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location/City *</FormLabel>
                          <FormControl>
                            <Input placeholder="Delhi, Mumbai, Jaipur..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guiding Experience *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your experience level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                            <SelectItem value="experienced">Experienced (5-10 years)</SelectItem>
                            <SelectItem value="expert">Expert (10+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="languages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Languages Spoken *</FormLabel>
                        <FormControl>
                          <Input placeholder="Hindi, English, Tamil, French..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="specializations"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Areas of Specialization *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="e.g., Mughal architecture, Buddhist heritage, Colonial history, Local folklore..."
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="qualifications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Qualifications & Certifications *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List your relevant education, certifications, training programs, or professional qualifications..."
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="motivation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Why do you want to become a TAG guide? *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your passion for heritage, what motivates you to guide others, and what you hope to achieve..."
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
                    <h3 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">What happens next?</h3>
                    <ul className="text-xs sm:text-sm text-amber-700 space-y-1">
                      <li>• We'll review your application within 5-7 business days</li>
                      <li>• Shortlisted candidates will be contacted for an interview</li>
                      <li>• Successful applicants will undergo training and certification</li>
                      <li>• You'll join our exclusive network of heritage guides</li>
                    </ul>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[rgba(100,73,37,255)] hover:bg-[rgba(100,73,37,0.9)] py-2 sm:py-3"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GuideApplication;
