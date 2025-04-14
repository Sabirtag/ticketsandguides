
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SearchContextType {
  isSearching: boolean;
  searchResults: any[];
  searchError: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  performSearch: () => Promise<void>;
  clearSearch: () => void;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  visitors: VisitorCategory[];
  setVisitors: React.Dispatch<React.SetStateAction<VisitorCategory[]>>;
  guideChoice: string;
  setGuideChoice: React.Dispatch<React.SetStateAction<string>>;
}

interface VisitorCategory {
  type: 'Indian' | 'SAARC' | 'Foreign';
  count: number;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Initialize state from localStorage or default values
  const [searchQuery, setSearchQuery] = useState(() => {
    const saved = localStorage.getItem("searchQuery");
    return saved ? JSON.parse(saved) : "";
  });
  
  const [date, setDate] = useState<Date | undefined>(() => {
    const saved = localStorage.getItem("searchDate");
    return saved ? new Date(JSON.parse(saved)) : undefined;
  });
  
  const [visitors, setVisitors] = useState<VisitorCategory[]>(() => {
    const saved = localStorage.getItem("searchVisitors");
    return saved ? JSON.parse(saved) : [
      { type: 'Indian', count: 0 },
      { type: 'SAARC', count: 0 },
      { type: 'Foreign', count: 0 }
    ];
  });
  
  const [guideChoice, setGuideChoice] = useState<string>(() => {
    const saved = localStorage.getItem("searchGuideChoice");
    return saved ? JSON.parse(saved) : "";
  });

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
  }, [searchQuery]);
  
  useEffect(() => {
    localStorage.setItem("searchDate", JSON.stringify(date?.toISOString()));
  }, [date]);
  
  useEffect(() => {
    localStorage.setItem("searchVisitors", JSON.stringify(visitors));
  }, [visitors]);
  
  useEffect(() => {
    localStorage.setItem("searchGuideChoice", JSON.stringify(guideChoice));
  }, [guideChoice]);

  const performSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchError("Please enter a search query");
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const { data, error } = await supabase.functions.invoke("ai-search", {
        body: { query: searchQuery }
      });

      if (error) {
        throw new Error(error.message);
      }

      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("An error occurred while searching. Please try again.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setSearchError(null);
    setDate(undefined);
    setVisitors([
      { type: 'Indian', count: 0 },
      { type: 'SAARC', count: 0 },
      { type: 'Foreign', count: 0 }
    ]);
    setGuideChoice("");
    
    // Clear from localStorage
    localStorage.removeItem("searchQuery");
    localStorage.removeItem("searchDate");
    localStorage.removeItem("searchVisitors");
    localStorage.removeItem("searchGuideChoice");
  };

  return (
    <SearchContext.Provider
      value={{
        isSearching,
        searchResults,
        searchError,
        searchQuery,
        setSearchQuery,
        performSearch,
        clearSearch,
        date,
        setDate,
        visitors,
        setVisitors,
        guideChoice,
        setGuideChoice
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
