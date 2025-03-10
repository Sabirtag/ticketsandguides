
import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Clock, CreditCard, Users, Shield } from "lucide-react";

const WhyTagSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-8 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 className="text-2xl font-bold mb-2">Why Choose TAG</h2>
          <p className="text-muted-foreground text-sm">
            TAG is the official platform authorized by the Archaeological Survey of India 
            for booking tickets to heritage sites across India.
          </p>
        </div>
        
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto pb-4 hide-scrollbar snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <Card className="flex-shrink-0 w-72 mr-4 snap-center shadow-sm">
            <CardContent className="p-4">
              <BadgeCheck className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-lg font-bold mb-1">Authentic Experience</h3>
              <p className="text-muted-foreground text-sm">
                Skip the queue with our e-tickets and enjoy direct entry.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 mr-4 snap-center shadow-sm">
            <CardContent className="p-4">
              <Clock className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-lg font-bold mb-1">Real-time Availability</h3>
              <p className="text-muted-foreground text-sm">
                Book tickets for your preferred date and time.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 mr-4 snap-center shadow-sm">
            <CardContent className="p-4">
              <CreditCard className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-lg font-bold mb-1">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">
                Multiple payment options with bank-grade security.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 mr-4 snap-center shadow-sm">
            <CardContent className="p-4">
              <Users className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-lg font-bold mb-1">Expert Guides</h3>
              <p className="text-muted-foreground text-sm">
                Connect with certified local guides for enhanced experiences.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 mr-4 snap-center shadow-sm">
            <CardContent className="p-4">
              <Shield className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-lg font-bold mb-1">Government Authorized</h3>
              <p className="text-muted-foreground text-sm">
                Official platform by Archaeological Survey of India.
              </p>
            </CardContent>
          </Card>
        </div>

        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  );
};

export default WhyTagSection;
