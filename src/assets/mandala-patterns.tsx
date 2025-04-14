
import React from "react";

// Simplified corner mandala pattern with reduced opacity
export const CornerMandala: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    width="80" 
    height="80" 
    viewBox="0 0 100 100" 
    fill="none" 
    className={`opacity-20 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="currentColor" strokeWidth="0.8" fill="none">
      <circle cx="50" cy="50" r="40" />
      <circle cx="50" cy="50" r="35" />
      <circle cx="50" cy="50" r="30" />
      <path d="M50 10 L50 90 M10 50 L90 50 M25 25 L75 75 M25 75 L75 25" />
      <path d="M50 15 A35 35 0 0 1 85 50 M50 15 A35 35 0 0 0 15 50" />
      <path d="M50 85 A35 35 0 0 0 85 50 M50 85 A35 35 0 0 1 15 50" />
      <path d="M62 28 A25 25 0 0 1 72 38 M38 28 A25 25 0 0 0 28 38" />
      <path d="M62 72 A25 25 0 0 0 72 62 M38 72 A25 25 0 0 1 28 62" />
    </g>
  </svg>
);

// Button hover mandala decoration
export const ButtonMandala: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg 
    width="30" 
    height="30" 
    viewBox="0 0 50 50" 
    fill="none"
    className={`opacity-15 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="currentColor" strokeWidth="0.5" fill="none">
      <circle cx="25" cy="25" r="20" />
      <circle cx="25" cy="25" r="15" />
      <path d="M25 5 L25 45 M5 25 L45 25" />
      <path d="M15 15 L35 35 M15 35 L35 15" />
    </g>
  </svg>
);

// Section divider mandala
export const DividerMandala: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative flex items-center justify-center w-full my-8 ${className}`}>
    <div className="flex-grow h-px bg-[rgba(100,73,37,0.2)]"></div>
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 60 60" 
      fill="none"
      className="mx-4 opacity-25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="rgba(100,73,37,1)" strokeWidth="0.6" fill="none">
        <circle cx="30" cy="30" r="25" />
        <circle cx="30" cy="30" r="20" />
        <circle cx="30" cy="30" r="15" />
        <path d="M30 5 L30 55 M5 30 L55 30" />
        <path d="M12 12 L48 48 M12 48 L48 12" />
      </g>
    </svg>
    <div className="flex-grow h-px bg-[rgba(100,73,37,0.2)]"></div>
  </div>
);
