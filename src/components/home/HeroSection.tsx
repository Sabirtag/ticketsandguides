
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/contexts/SearchContext";

const HeroSection = () => {
  const { searchQuery, setSearchQuery, performSearch, isSearching } = useSearch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await performSearch();
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <section className="relative h-[600px]">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
          alt="Heritage background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-3">
          Discover Heritage With Us
        </h1>
        <p className="text-xl text-white/90 max-w-2xl mb-12">
          Connecting People to Diverse Attractions and Cultural Wonders
        </p>
        
        {/* Search Bar */}
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1">Where</label>
              <Input
                placeholder="Search for Monuments"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90"
              />
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1">When</label>
              <Input
                placeholder="Add Date & Time"
                className="w-full bg-white/90"
                readOnly
              />
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1">Who</label>
              <Input
                placeholder="Add members"
                className="w-full bg-white/90"
                readOnly
              />
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1">With</label>
              <Input
                placeholder="Get a Guide?"
                className="w-full bg-white/90"
                readOnly
              />
            </div>
            
            <div className="md:col-span-1">
              <label className="block text-white text-sm mb-1 opacity-0">Book</label>
              <Button 
                type="submit" 
                className="w-full h-10 bg-amber-600 hover:bg-amber-700 text-white"
                disabled={isSearching || !searchQuery.trim()}
              >
                Book
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
