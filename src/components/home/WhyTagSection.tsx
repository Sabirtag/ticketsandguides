
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Clock, CreditCard, Users, Building, Shield } from "lucide-react";

const WhyTagSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose TAG</h2>
          <p className="text-muted-foreground">
            TAG is the official platform authorized by the Archaeological Survey of India 
            for booking tickets to heritage sites across India.
          </p>
        </div>
        
        {/* Ministry of Culture Feature Card */}
        <Card className="mb-12 border-primary/20 bg-primary/5">
          <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white p-4 rounded-lg">
              <Building className="h-16 w-16 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">An Initiative by the Ministry of Culture</h3>
              <p className="text-muted-foreground">
                Proudly supported by the Ministry of Culture India, this platform aims to enrich your experience 
                at India's historical and cultural sites.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <BadgeCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Authentic Experience</h3>
              <p className="text-muted-foreground">
                Skip the queue with our e-tickets and enjoy direct entry to monuments and heritage sites.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Real-time Availability</h3>
              <p className="text-muted-foreground">
                Check real-time availability and book tickets for your preferred date and time slot.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <CreditCard className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">
                Multiple payment options with bank-grade security for all your transactions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Guides</h3>
              <p className="text-muted-foreground">
                Connect with certified local guides who can enhance your experience with their knowledge.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Government Authorized</h3>
              <p className="text-muted-foreground">
                Official authorized platform by Archaeological Survey of India for monument tickets.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary mb-4"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Customer Support</h3>
              <p className="text-muted-foreground">
                Dedicated support team to help you with your queries and booking assistance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyTagSection;
