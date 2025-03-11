
import React from "react";
import ExperienceCard from "./ExperienceCard";
import { Experience } from "./types";

interface ExperiencesListProps {
  experiences: Experience[];
  onExperienceClick: (id: number) => void;
}

const ExperiencesList = ({ experiences, onExperienceClick }: ExperiencesListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
