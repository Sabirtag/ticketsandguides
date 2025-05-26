
import React from "react";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "./types";

interface ExperiencesListProps {
  experiences: Experience[];
  onExperienceClick: (id: number) => void;
}

/**
 * Renders a grid of experience cards
 * Responsive layout that adapts to different screen sizes
 */
const ExperiencesList = ({ experiences, onExperienceClick }: ExperiencesListProps) => {
  if (!experiences.length) {
    return <p className="text-muted-foreground">No experiences available.</p>;
  }

  return (
    <div>
      {/* Mobile horizontal scrollable layout */}
      <div className="md:hidden overflow-x-auto scrollbar-none pb-4">
        <div className="flex gap-3 min-w-max">
          {experiences.map((exp) => (
            <div key={exp.id} className="w-44 flex-shrink-0">
              <ExperienceCard 
                experience={exp} 
                onClick={onExperienceClick} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop grid layout */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 md:gap-5">
        {experiences.map((exp) => (
          <ExperienceCard 
            key={exp.id} 
            experience={exp} 
            onClick={onExperienceClick} 
          />
        ))}
      </div>
    </div>
  );
};

export default ExperiencesList;
