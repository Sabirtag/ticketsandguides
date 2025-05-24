
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/home/Footer';

const Guides = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-muted-foreground mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Professional Heritage Guides</h1>
          
          <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Our Certified Guides?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Expert Knowledge</h3>
                <p className="text-muted-foreground">Our guides are certified experts with deep knowledge of India's rich heritage and history.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Multilingual Support</h3>
                <p className="text-muted-foreground">Available in multiple languages including English, Hindi, and regional languages.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Personalized Experience</h3>
                <p className="text-muted-foreground">Tailored tours based on your interests and preferences.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Verified & Trusted</h3>
                <p className="text-muted-foreground">All guides are background-verified and highly rated by previous visitors.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 border border-amber-200">
            <h2 className="text-2xl font-semibold mb-4">Ready to Explore?</h2>
            <p className="text-muted-foreground mb-6">
              Book your heritage site visit and select from our pool of expert guides to enhance your experience.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Start Booking Now
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Guides;
