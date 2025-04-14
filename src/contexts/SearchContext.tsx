
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

// Safely parse JSON from localStorage
const safelyParseJSON = (key: string, defaultValue: any) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null || item === 'undefined') return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing localStorage item "${key}":`, error);
    return defaultValue;
  }
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Initialize state from localStorage or default values using the safe parser
  const [searchQuery, setSearchQuery] = useState(() => 
    safelyParseJSON("searchQuery", "")
  );
  
  const [date, setDate] = useState<Date | undefined>(() => {
    const saved = safelyParseJSON("searchDate", null);
    return saved ? new Date(saved) : undefined;
  });
  
  const [visitors, setVisitors] = useState<VisitorCategory[]>(() => 
    safelyParseJSON("searchVisitors", [
      { type: 'Indian', count: 0 },
      { type: 'SAARC', count: 0 },
      { type: 'Foreign', count: 0 }
    ])
  );
  
  const [guideChoice, setGuideChoice] = useState<string>(() => 
    safelyParseJSON("searchGuideChoice", "")
  );

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
  }, [searchQuery]);
  
  useEffect(() => {
    if (date) {
      localStorage.setItem("searchDate", JSON.stringify(date.toISOString()));
    } else {
      localStorage.removeItem("searchDate");
    }
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
