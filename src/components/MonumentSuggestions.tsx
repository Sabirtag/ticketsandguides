
import React from "react";
import { Monument, indianMonuments } from "@/data/monuments";

interface MonumentSuggestionsProps {
  searchQuery: string;
  onSelect: (monument: Monument) => void;
}

/**
 * Displays a list of monument suggestions based on user search input
 */
const MonumentSuggestions: React.FC<MonumentSuggestionsProps> = ({ searchQuery, onSelect }) => {
  // Filter monuments based on search query with trimming and case insensitivity
  const filteredMonuments = React.useMemo(() => {
    if (!searchQuery?.trim()) return [];
    
    const normalizedQuery = searchQuery.toLowerCase().trim();
    return indianMonuments.filter(monument => 
      monument.name.toLowerCase().includes(normalizedQuery) ||
      monument.city.toLowerCase().includes(normalizedQuery) ||
      monument.state.toLowerCase().includes(normalizedQuery)
    );
  }, [searchQuery]);

  if (!searchQuery?.trim() || filteredMonuments.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-20 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
      <ul className="py-1">
        {filteredMonuments.map((monument) => (
          <li 
            key={monument.id}
            className="px-4 py-2 hover:bg-[rgba(100,73,37,0.1)] cursor-pointer text-left"
            onClick={() => onSelect(monument)}
          >
            <div className="text-sm font-medium">{monument.name}</div>
            <div className="text-xs text-muted-foreground">{monument.city}, {monument.state}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MonumentSuggestions;
