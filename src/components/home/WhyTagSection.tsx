
import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Clock, CreditCard, Users, Shield, Award } from "lucide-react";
import { CornerMandala, DividerMandala } from "@/assets/mandala-patterns";

const WhyTagSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-6 bg-[rgba(250,245,240,255)]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-8 relative">
          <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 opacity-10 pointer-events-none">
            <CornerMandala className="text-[rgba(100,73,37,255)] w-40 h-40" />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-6 w-6 text-[rgba(100,73,37,255)]" />
            <h2 className="text-2xl md:text-3xl font-bold font-fitzgerald">Why Choose TAG</h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl">
            TAG is the official platform authorized by the Archaeological Survey of India 
            for booking tickets to heritage sites across India.
          </p>
          <div className="mt-4 w-32 h-1 bg-gradient-to-r from-transparent via-[rgba(100,73,37,0.3)] to-transparent"></div>
        </div>
        
        <div 
          ref={scrollContainerRef} 
          className="flex overflow-x-auto pb-4 gap-4 scrollbar-none scroll-smooth snap-x"
        >
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm card-hover animate-fade-in group relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <CornerMandala className="text-[rgba(100,73,37,255)] w-20 h-20" />
            </div>
            <CardContent className="p-4">
              <BadgeCheck className="h-8 w-8 text-[rgba(100,73,37,255)] mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Authentic Experience</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Skip the queue with our e-tickets and enjoy direct entry.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm card-hover animate-fade-in [animation-delay:100ms] group relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <CornerMandala className="text-[rgba(100,73,37,255)] w-20 h-20" />
            </div>
            <CardContent className="p-4">
              <Clock className="h-8 w-8 text-[rgba(100,73,37,255)] mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Real-time Availability</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Book tickets for your preferred date and time.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm card-hover animate-fade-in [animation-delay:200ms] group relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <CornerMandala className="text-[rgba(100,73,37,255)] w-20 h-20" />
            </div>
            <CardContent className="p-4">
              <CreditCard className="h-8 w-8 text-[rgba(100,73,37,255)] mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Secure Payments</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Multiple payment options with bank-grade security.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm card-hover animate-fade-in [animation-delay:300ms] group relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <CornerMandala className="text-[rgba(100,73,37,255)] w-20 h-20" />
            </div>
            <CardContent className="p-4">
              <Users className="h-8 w-8 text-[rgba(100,73,37,255)] mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Expert Guides</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Connect with certified local guides for enhanced experiences.
              </p>
            </CardContent>
          </Card>
          
          <Card className="flex-shrink-0 w-72 snap-center shadow-sm card-hover animate-fade-in [animation-delay:400ms] group relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
              <CornerMandala className="text-[rgba(100,73,37,255)] w-20 h-20" />
            </div>
            <CardContent className="p-4">
              <Shield className="h-8 w-8 text-[rgba(100,73,37,255)] mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Government Authorized</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Official platform by Archaeological Survey of India.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <DividerMandala />
    </section>
  );
};

export default WhyTagSection;
