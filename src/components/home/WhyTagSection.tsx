
import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Clock, CreditCard, Users, Shield } from "lucide-react";

const WhyTagSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-6 bg-[rgba(250,250,250,255)]">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-2xl font-fitzgerald mb-2">Why Choose TAG</h2>
          <p className="text-muted-foreground text-sm font-satoshi">
            TAG is the official platform authorized by the Archaeological Survey of India 
            for booking tickets to heritage sites across India.
          </p>
        </div>
        
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto pb-4 gap-4 scrollbar-none scroll-smooth snap-x"
        >
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm transition-all duration-300 hover:scale-105 animate-fade-in">
            <CardContent className="p-4">
              <BadgeCheck className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Authentic Experience</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Skip the queue with our e-tickets and enjoy direct entry.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm transition-all duration-300 hover:scale-105 animate-fade-in [animation-delay:200ms]">
            <CardContent className="p-4">
              <Clock className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Real-time Availability</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Book tickets for your preferred date and time.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm transition-all duration-300 hover:scale-105 animate-fade-in [animation-delay:400ms]">
            <CardContent className="p-4">
              <CreditCard className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Secure Payments</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Multiple payment options with bank-grade security.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm transition-all duration-300 hover:scale-105 animate-fade-in [animation-delay:600ms]">
            <CardContent className="p-4">
              <Users className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Expert Guides</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Connect with certified local guides for enhanced experiences.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm transition-all duration-300 hover:scale-105 animate-fade-in [animation-delay:800ms]">
            <CardContent className="p-4">
              <Shield className="h-8 w-8 text-primary mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Government Authorized</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Official platform by Archaeological Survey of India.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyTagSection;
