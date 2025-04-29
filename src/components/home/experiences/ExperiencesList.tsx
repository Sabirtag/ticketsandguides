
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {experiences.map((exp) => (
        <ExperienceCard 
          key={exp.id} 
          experience={exp} 
          onClick={onExperienceClick} 
        />
      ))}
    </div>
  );
};

export default ExperiencesList;
