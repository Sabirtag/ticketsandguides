
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ExperiencesList from "./ExperiencesList";
import { experiences } from "./experiencesData";
import { Compass } from "lucide-react";

export const BookExperiences = () => {
  const navigate = useNavigate();
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  
  const handleExperienceClick = (id: number) => {
    navigate(`/experience/${id}`);
  };

  const visibleExperiences = showAllExperiences 
    ? experiences 
    : experiences.slice(0, 4);

  return (
    <section className="py-8 md:py-12 bg-[#f8f9fa]">
      <div className="container px-4 md:px-6">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="h-6 w-6 text-[rgba(100,73,37,255)]" />
          <h2 className="text-2xl md:text-3xl font-bold font-fitzgerald">
            Book Unique Experiences
          </h2>
        </div>
        <p className="text-sm md:text-base text-muted-foreground mb-6">
          Explore India's heritage through authentic experiences led by certified local guides
        </p>
        
        <ExperiencesList 
          experiences={visibleExperiences} 
          onExperienceClick={handleExperienceClick}
        />
        
        {experiences.length > 4 && (
          <div className="flex justify-center mt-6">
            <Button 
              variant="outline" 
              className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)] border-none px-6 py-2 text-sm md:text-base"
              onClick={() => setShowAllExperiences(!showAllExperiences)}
            >
              {showAllExperiences ? "Show Less" : "Explore More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookExperiences;
