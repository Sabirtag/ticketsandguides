
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const GuideRecruitBanner = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <section className="relative py-12 sm:py-16 md:py-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
          alt="Guide recruitment background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 container px-4 md:px-6 text-center">
        <h2 className="heading-text text-white mb-4 sm:mb-6">
          Are you a guide willing to join TAG?
        </h2>
        
        <p className={`subheading-text text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10`}>
          Are you a knowledgeable guide with a passion for India's heritage and culture? Join the TAG
          community and help others discover the beauty and significance of our historical treasures.
        </p>
        
        <Button 
          className={`bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto mobile-tap-target`}
          onClick={() => navigate("/guides")}
        >
          Register Now
        </Button>
      </div>
    </section>
  );
};

export default GuideRecruitBanner;
