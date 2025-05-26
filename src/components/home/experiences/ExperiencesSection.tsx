import React from "react";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import ExperiencesList from "./ExperiencesList";
import { experiences } from "./experiencesData";
import { useNavigate } from "react-router-dom";
const ExperiencesSection = () => {
  const navigate = useNavigate();
  console.log("🎨 Rendering ExperiencesSection with theme colors");
  const handleExperienceClick = (id: number) => {
    navigate(`/experience/${id}`);
  };
  return <section className="py-8 md:py-12 bg-[#f8f9fa]">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            
            <h2 className="text-2xl md:text-3xl font-bold font-fitzgerald">Book Unique Experiences</h2>
          </div>
        </div>
        
        <ExperiencesList experiences={experiences} onExperienceClick={handleExperienceClick} />
        
        <div className="flex justify-center mt-6">
          <Button variant="cta" onClick={() => navigate('/experiences')} className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)]">
            View All Experiences
          </Button>
        </div>
      </div>
    </section>;
};
export default ExperiencesSection;