
import React from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";
import { useToast } from "@/hooks/use-toast";

const AISearch = () => {
  const { searchQuery, setSearchQuery, performSearch, isSearching, searchError } = useSearch();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await performSearch();
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to perform search. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Try 'Find UNESCO sites in Delhi' or 'Monuments under ₹50'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2"
          />
        </div>
        <Button type="submit" disabled={isSearching || !searchQuery.trim()}>
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </Button>
      </form>
      {searchError && (
        <p className="text-red-500 text-sm mt-2">{searchError}</p>
      )}
    </div>
  );
};

export default AISearch;
