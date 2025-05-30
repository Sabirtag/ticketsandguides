import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Clock, CreditCard, Users, Shield, Award } from "lucide-react";
const WhyTagSection = () => {
  return <section className="py-6 bg-[rgba(250,250,250,255)]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            
            <h2 className="text-2xl md:text-3xl font-bold font-fitzgerald">Why Choose TAG</h2>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl">
            TAG is the official platform authorized by the Archaeological Survey of India 
            for booking tickets to heritage sites across India.
          </p>
        </div>
        
        {/* Mobile horizontal scrollable layout */}
        <div className="md:hidden overflow-x-auto scrollbar-none pb-4">
          <div className="flex gap-3 min-w-max">
            <Card className="shadow-sm card-hover animate-fade-in w-44 flex-shrink-0">
              <CardContent className="p-3">
                <BadgeCheck className="h-6 w-6 text-[rgba(100,73,37,255)] mb-2" />
                <h3 className="text-sm font-fitzgerald mb-1">Authentic Experience</h3>
                <p className="text-muted-foreground text-xs font-satoshi">
                  Skip the queue with our e-tickets and enjoy direct entry.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm card-hover animate-fade-in [animation-delay:100ms] w-44 flex-shrink-0">
              <CardContent className="p-3">
                <Clock className="h-6 w-6 text-[rgba(100,73,37,255)] mb-2" />
                <h3 className="text-sm font-fitzgerald mb-1">Real-time Availability</h3>
                <p className="text-muted-foreground text-xs font-satoshi">
                  Book tickets for your preferred date and time.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm card-hover animate-fade-in [animation-delay:200ms] w-44 flex-shrink-0">
              <CardContent className="p-3">
                <CreditCard className="h-6 w-6 text-[rgba(100,73,37,255)] mb-2" />
                <h3 className="text-sm font-fitzgerald mb-1">Secure Payments</h3>
                <p className="text-muted-foreground text-xs font-satoshi">
                  Multiple payment options with bank-grade security.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm card-hover animate-fade-in [animation-delay:300ms] w-44 flex-shrink-0">
              <CardContent className="p-3">
                <Users className="h-6 w-6 text-[rgba(100,73,37,255)] mb-2" />
                <h3 className="text-sm font-fitzgerald mb-1">Expert Guides</h3>
                <p className="text-muted-foreground text-xs font-satoshi">
                  Connect with certified local guides for enhanced experiences.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm card-hover animate-fade-in [animation-delay:400ms] w-44 flex-shrink-0">
              <CardContent className="p-3">
                <Shield className="h-6 w-6 text-[rgba(100,73,37,255)] mb-2" />
                <h3 className="text-sm font-fitzgerald mb-1">Government Authorized</h3>
                <p className="text-muted-foreground text-xs font-satoshi">
                  Official platform by Archaeological Survey of India.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Desktop grid layout */}
        <div className="hidden md:grid md:grid-cols-5 gap-4">
          <Card className="shadow-sm card-hover animate-fade-in">
            <CardContent className="p-4">
              <BadgeCheck className="h-8 w-8 text-[rgba(100,73,37,255)] mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Authentic Experience</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Skip the queue with our e-tickets and enjoy direct entry.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm card-hover animate-fade-in [animation-delay:100ms]">
            <CardContent className="p-4">
              <Clock className="h-8 w-8 text-[rgba(100,73,37,255)] mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Real-time Availability</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Book tickets for your preferred date and time.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm card-hover animate-fade-in [animation-delay:200ms]">
            <CardContent className="p-4">
              <CreditCard className="h-8 w-8 text-[rgba(100,73,37,255)] mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Secure Payments</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Multiple payment options with bank-grade security.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm card-hover animate-fade-in [animation-delay:300ms]">
            <CardContent className="p-4">
              <Users className="h-8 w-8 text-[rgba(100,73,37,255)] mb-2" />
              <h3 className="text-lg font-fitzgerald mb-1">Expert Guides</h3>
              <p className="text-muted-foreground text-sm font-satoshi">
                Connect with certified local guides for enhanced experiences.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm card-hover animate-fade-in [animation-delay:400ms]">
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
    </section>;
};
export default WhyTagSection;