
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Star, Clock, Calendar, Info, Check, X } from "lucide-react";
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
    <div className="py-10">
      <h2 className="text-2xl font-semibold mb-8">Search Results</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((site) => (
          <Card key={site.id} className="group overflow-hidden transition-all hover:shadow-lg border-border/60">
            <div className="h-52 overflow-hidden relative">
              <img
                src={site.image || "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop"}
                alt={site.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {!site.available && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <span className="text-white font-bold px-4 py-2 bg-red-500/80 rounded">
                    Temporarily Unavailable
                  </span>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="flex items-center bg-primary/90 text-white px-2.5 py-1">
                  <Star className="h-3 w-3 fill-white mr-1" />
                  <span className="text-sm font-medium">{site.rating}</span>
                </Badge>
              </div>
            </div>
            
            <CardHeader className="p-5 pb-0">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl">{site.name}</CardTitle>
                <Badge variant="outline" className="bg-secondary/60 text-primary">{site.category}</Badge>
              </div>
              <div className="flex items-center text-muted-foreground text-sm mt-2">
                <MapPin className="h-4 w-4 mr-1.5" />
                {site.location}
              </div>
            </CardHeader>
            
            <CardContent className="p-5 pt-3">
              <CardDescription className="line-clamp-2 mb-4 mt-1 text-foreground/70">
                {site.description}
              </CardDescription>
              
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{site.openingHours}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{site.closedOn === "None" ? "Open Daily" : `Closed: ${site.closedOn}`}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mb-3">
                {site.amenities && site.amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1 text-xs bg-accent/50">
                    <Check className="h-3 w-3" /> {amenity}
                  </Badge>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="p-5 pt-0 flex items-center justify-between gap-4 border-t mt-2">
              <div>
                <p className="text-sm font-medium">
                  Indian: <span className="text-primary">{site.price}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Foreigner: {site.foreignerPrice}
                </p>
              </div>
              <Button size="sm" disabled={!site.available} asChild className="rounded-full">
                <Link to={`/booking?site=${site.id}`}>
                  {site.available ? "Book Now" : "Unavailable"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
