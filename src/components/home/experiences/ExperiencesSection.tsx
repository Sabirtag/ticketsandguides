
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ExperiencesList from "./ExperiencesList";
import { experiences } from "./experiencesData";

export const BookExperiences = () => {
  const navigate = useNavigate();
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  
  const handleExperienceClick = (id: number) => {
    navigate(`/guide-selection?experience=${id}`);
  };

  const visibleExperiences = showAllExperiences 
    ? experiences 
    : experiences.slice(0, 4);

  return (
    <section className="py-8 md:py-12 bg-[rgba(250,250,250,255)]">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 font-fitzgerald text-center">
          Book Unique Experiences
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 text-center">
          Explore India's heritage through authentic experiences led by certified local guides
        </p>
        
        <ExperiencesList 
          experiences={visibleExperiences} 
          onExperienceClick={handleExperienceClick}
        />
        
        {experiences.length > 4 && (
          <div className="flex justify-center mt-6 md:mt-8">
            <Button 
              variant="outline" 
              className="bg-[rgba(100,73,37,255)] text-white hover:bg-[rgba(100,73,37,0.9)] border-none px-6 md:px-8 py-2 text-sm md:text-base"
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
