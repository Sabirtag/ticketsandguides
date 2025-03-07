
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from "lucide-react";
import { useSearch } from "@/contexts/SearchContext";

const SearchResults = () => {
  const { searchResults, isSearching, searchQuery } = useSearch();

  if (isSearching) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse text-xl">Searching...</div>
      </div>
    );
  }

  if (searchResults.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No results found for "{searchQuery}"
        </p>
        <p className="text-sm mt-2">
          Try different keywords or explore our featured sites below.
        </p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-xl font-semibold mb-6">Search Results</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((site) => (
          <div
            key={site.id}
            className="group rounded-lg overflow-hidden bg-background shadow-md transition-all hover:shadow-lg"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={site.image || "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop"}
                alt={site.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold">{site.name}</h3>
                <div className="flex items-center bg-primary/10 text-primary px-2 py-1 rounded">
                  <Star className="h-3 w-3 fill-primary mr-1" />
                  <span className="text-sm font-medium">{site.rating}</span>
                </div>
              </div>
              <div className="flex items-center text-muted-foreground mb-3 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {site.location}
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {site.description}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Indian: {site.price}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Foreigner: {site.foreignerPrice}
                  </p>
                </div>
                <Button size="sm" asChild>
                  <Link to={`/booking?site=${site.id}`}>Book Now</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
