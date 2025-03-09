
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GuideRecruitBanner = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/eddf3f47-f36a-4088-883d-513d144fff3a.png" 
          alt="Guide map background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 container px-4 md:px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
          Are you a guide willing to join TAG?
        </h2>
        
        <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10">
          Are you a knowledgeable guide with a passion for India's heritage and culture? Join the TAG
          community and help others discover the beauty and significance of our historical treasures.
        </p>
        
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg h-auto"
          onClick={() => navigate("/guides")}
        >
          Register Now
        </Button>
      </div>
    </section>
  );
};

export default GuideRecruitBanner;
