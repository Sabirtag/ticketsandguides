
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import AISearch from "@/components/AISearch";
import SearchResults from "@/components/SearchResults";
import { useSearch } from "@/contexts/SearchContext";

// Mock featured sites data
const featuredSites = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Red Fort",
    location: "Delhi",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1624461050280-25ccc5af9256?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Qutub Minar",
    location: "Delhi",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1557246572-83179c258ac5?q=80&w=2070&auto=format&fit=crop"
  }
];

// Helper function to format date
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

const Index = () => {
  const navigate = useNavigate();
  const { searchResults } = useSearch();
  const today = new Date();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Discover India's <br className="md:hidden" />
              <span className="text-primary">Heritage Treasures</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-10">
              Book tickets for India's most remarkable historical sites and monuments.
              Your journey through time begins here.
            </p>
            <div className="w-full max-w-3xl">
              <AISearch />
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <SearchResults />
        </div>
      </section>

      {/* Featured Sites Section - Only show if no search results */}
      {searchResults.length === 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Featured Heritage Sites</h2>
                <p className="text-muted-foreground">
                  Explore some of India's most iconic historical wonders
                </p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0" onClick={() => navigate('/explore')}>
                View All Sites
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredSites.map((site) => (
                <div key={site.id} className="group cursor-pointer" onClick={() => navigate(`/booking?site=${site.id}`)}>
                  <div className="rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg">
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={site.image} 
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
                      <div className="flex items-center text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {site.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Dates Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8">Upcoming Available Dates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => {
              const date = new Date(today);
              date.setDate(today.getDate() + i + 1);
              return (
                <div 
                  key={i} 
                  className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-center cursor-pointer hover:bg-primary/10 transition-colors"
                  onClick={() => navigate('/explore')}
                >
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="font-medium">{formatDate(date)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/><path d="M3 16.2V21m0 0h4.8M3 21l6-6"/><path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/><path d="M3 7.8V3m0 0h4.8M3 3l6 6"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Search & Discover</h3>
              <p className="text-muted-foreground">
                Browse through India's heritage sites or use our AI assistant to find exactly what you're looking for.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 9h8"/><path d="M8 13h5"/><path d="M8 17h2"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Book Tickets</h3>
              <p className="text-muted-foreground">
                Select your preferred date and time, then book your tickets quickly and securely.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Visit & Explore</h3>
              <p className="text-muted-foreground">
                Receive your e-tickets instantly, then visit the site at your chosen time and enjoy your heritage experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">TAG</h3>
              <p className="text-muted-foreground">
                Your gateway to India's heritage. Book tickets and guides for ASI sites.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground" onClick={() => navigate('/')}>Home</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground" onClick={() => navigate('/explore')}>Explore Sites</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground" onClick={() => navigate('/guides')}>Find Guides</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground" onClick={() => navigate('/')}>About Us</Button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">FAQs</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground">Contact Us</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground" onClick={() => navigate('/terms')}>Terms of Service</Button></li>
                <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground" onClick={() => navigate('/privacy')}>Privacy Policy</Button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
              <p className="text-muted-foreground mb-4">
                Follow us for updates on new sites and features
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} TAG. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
