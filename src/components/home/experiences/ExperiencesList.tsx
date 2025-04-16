
import React from "react";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExperiencesListProps {
  experiences: Experience[];
  onExperienceClick: (id: number) => void;
}

const ExperiencesList = ({ experiences, onExperienceClick }: ExperiencesListProps) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {/* Mobile view: Scrollable horizontal list */}
      <div className="md:hidden overflow-x-auto flex gap-4 pb-4 -mx-4 px-4 scrollbar-none">
        {experiences.map((exp) => (
          <div key={exp.id} className="flex-shrink-0 w-[calc(100vw-64px)] sm:w-[270px]">
            <ExperienceCard 
              experience={exp} 
              onClick={onExperienceClick} 
            />
          </div>
        ))}
      </div>
      
      {/* Desktop view: Grid layout */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {experiences.map((exp) => (
          <ExperienceCard 
            key={exp.id} 
            experience={exp} 
            onClick={onExperienceClick} 
          />
        ))}
      </div>
    </>
  );
};

export default ExperiencesList;
