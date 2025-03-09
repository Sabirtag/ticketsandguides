
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { MapPin, UserCheck, Globe, Clock, Languages, FileCheck } from "lucide-react";

const Guides = () => {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    languages: [],
    experience: "",
    expertise: "",
    about: "",
    hasLicense: false,
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.city || 
        !formData.experience || !formData.expertise || !formData.about) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    // In a real app, this would submit to a backend
    console.log("Form submitted:", formData);
    
    // Show success message and reset form
    toast.success("Registration submitted successfully!");
    setFormSubmitted(true);
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-4xl py-16 px-4">
          <Card className="text-center p-8">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Registration Successful!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Thank you for registering as a guide with TAG. We'll review your application and contact you soon.
              </p>
              <Button onClick={() => navigate("/")}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-r from-primary/20 to-primary/5">
        <div className="container px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Become a TAG Guide</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share your knowledge and passion for heritage sites with visitors from around the world.
            Join our network of professional guides today.
          </p>
        </div>
      </div>
      
      {/* Why Become a Guide */}
      <div className="py-12 bg-white">
        <div className="container px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Become a TAG Guide?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-primary/5">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 p-3 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Connect with Travelers</h3>
                <p className="text-muted-foreground">
                  Meet and guide visitors from across the globe, sharing your knowledge and creating memorable experiences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 p-3 w-12 h-12 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Flexible Schedule</h3>
                <p className="text-muted-foreground">
                  Choose when and where you want to work. Set your own availability and tour schedules.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="pt-6">
                <div className="mb-4 bg-primary/10 p-3 w-12 h-12 rounded-lg flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Professional Development</h3>
                <p className="text-muted-foreground">
                  Enhance your guiding skills with training workshops and materials provided by the Ministry of Culture.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Registration Form */}
      <div className="py-12 bg-gray-50">
        <div className="container max-w-3xl px-4">
          <Card>
            <CardHeader>
              <CardTitle>Guide Registration Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">City/Region *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter city or region"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("experience", value)} 
                      defaultValue={formData.experience}
                    >
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-2">0-2 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expertise">Area of Expertise *</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("expertise", value)} 
                      defaultValue={formData.expertise}
                    >
                      <SelectTrigger id="expertise">
                        <SelectValue placeholder="Select expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="historical">Historical Monuments</SelectItem>
                        <SelectItem value="religious">Religious Sites</SelectItem>
                        <SelectItem value="cultural">Cultural Heritage</SelectItem>
                        <SelectItem value="architectural">Architectural Wonders</SelectItem>
                        <SelectItem value="nature">Natural Heritage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="about">About Yourself *</Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    placeholder="Tell us about your experience, qualifications, and why you want to be a guide"
                    rows={5}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasLicense" 
                    checked={formData.hasLicense}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("hasLicense", checked as boolean)
                    }
                  />
                  <Label htmlFor="hasLicense" className="text-sm">
                    I have a valid tour guide license
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="agreeToTerms" 
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange("agreeToTerms", checked as boolean)
                    }
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the terms and conditions *
                  </Label>
                </div>
                
                <Button type="submit" className="w-full">Submit Registration</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Guides;
