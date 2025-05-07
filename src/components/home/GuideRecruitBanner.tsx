import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const GuideRecruitBanner = () => {
  const navigate = useNavigate();
  console.log("🎨 Rendering GuideRecruitBanner with theme colors");
  return <section className="relative py-20">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1551038247-3d9af20df552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" alt="Guide recruitment background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 container px-4 md:px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-fitzgerald font-bold text-white mb-6">
          Are you a guide willing to join TAG?
        </h2>
        
        <p className="text-lg text-white/90 max-w-3xl mx-auto mb-10">
          Are you a knowledgeable guide with a passion for India's heritage and culture? Join the TAG
          community and help others discover the beauty and significance of our historical treasures.
        </p>
        
        <Button variant="cta" onClick={() => navigate("/guides")} className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)]">
          Register Now
        </Button>
      </div>
    </section>;
};
export default GuideRecruitBanner;