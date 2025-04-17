
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import ExperienceDetailContent from "@/components/experience/ExperienceDetailContent";
import { experiences } from "@/components/home/experiences/experiencesData";
import { Experience } from "@/components/home/experiences/types";

const ExperienceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const expId = parseInt(id);
      const foundExperience = experiences.find(e => e.id === expId);
      
      if (foundExperience) {
        setExperience(foundExperience);
      } else {
        navigate('/not-found');
      }
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!experience) {
    return <div className="h-screen flex items-center justify-center">Experience not found</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <Navbar />
      <ExperienceDetailContent experience={experience} />
      <Footer />
    </div>
  );
};

export default ExperienceDetail;
