
import React, { createContext, useContext, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SearchContextType {
  isSearching: boolean;
  searchResults: any[];
  searchError: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  performSearch: () => Promise<void>;
  clearSearch: () => void;
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
  const [searchQuery, setSearchQuery] = useState("");

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
        clearSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
