
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Filter, Calendar, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

// Mock data for heritage sites
const mockSites = [
  {
    id: 1,
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    description: "One of the seven wonders of the world, a symbol of eternal love.",
    rating: 4.9,
    price: "₹1,100",
    foreignerPrice: "₹1,100",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
    available: true,
    category: "UNESCO World Heritage",
  },
  {
    id: 2,
    name: "Red Fort",
    location: "Delhi",
    description: "A historic fort that served as the main residence of the Mughal Emperors.",
    rating: 4.7,
    price: "₹35",
    foreignerPrice: "₹500",
    image: "https://images.unsplash.com/photo-1624461050280-25ccc5af9256?q=80&w=1974&auto=format&fit=crop",
    available: true,
    category: "Monuments",
  },
  {
    id: 3,
    name: "Qutub Minar",
    location: "Delhi",
    description: "The tallest brick minaret in the world, an incredible example of early Indo-Islamic architecture.",
    rating: 4.5,
    price: "₹35",
    foreignerPrice: "₹550",
    image: "https://images.unsplash.com/photo-1557246572-83179c258ac5?q=80&w=2070&auto=format&fit=crop",
    available: true,
    category: "UNESCO World Heritage",
  },
  {
    id: 4,
    name: "Humayun's Tomb",
    location: "Delhi",
    description: "The tomb of the Mughal Emperor Humayun, built by his wife Bega Begum in 1569-70.",
    rating: 4.6,
    price: "₹35",
    foreignerPrice: "₹550",
    image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=2069&auto=format&fit=crop",
    available: true,
    category: "UNESCO World Heritage",
  },
  {
    id: 5,
    name: "Ajanta Caves",
    location: "Aurangabad, Maharashtra",
    description: "Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.",
    rating: 4.8,
    price: "₹40",
    foreignerPrice: "₹600",
    image: "https://images.unsplash.com/photo-1575505018692-6e6476246e6e?q=80&w=2070&auto=format&fit=crop",
    available: false,
    category: "UNESCO World Heritage",
  },
  {
    id: 6,
    name: "Khajuraho Group of Monuments",
    location: "Madhya Pradesh",
    description: "Famous for their Nagara-style architectural symbolism and erotic sculptures.",
    rating: 4.7,
    price: "₹40",
    foreignerPrice: "₹600",
    image: "https://images.unsplash.com/photo-1602302586676-63d8eee6c345?q=80&w=1974&auto=format&fit=crop",
    available: true,
    category: "Temples",
  },
];

const categories = ["All", "UNESCO World Heritage", "Monuments", "Temples", "Forts", "Museums"];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter sites based on search term and category
  const filteredSites = mockSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         site.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || site.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Explore India's Heritage Sites
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Discover and book tickets for India's most remarkable historical and archaeological sites.
            </p>
            
            {/* Search and Filter */}
            <div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-4 -mb-20 relative z-10">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search for heritage sites..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Select Date
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mt-24 mb-8">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="All" onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Sites Grid */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.length > 0 ? (
              filteredSites.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">No heritage sites found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-12">
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
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                <li><Link to="/explore" className="text-muted-foreground hover:text-foreground">Explore Sites</Link></li>
                <li><Link to="/guides" className="text-muted-foreground hover:text-foreground">Find Guides</Link></li>
                <li><Link to="/" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
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

// Helper Component
const SiteCard = ({ site }: { site: any }) => {
  return (
    <div className="group rounded-lg overflow-hidden bg-background shadow-md transition-all hover:shadow-lg">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={site.image} 
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
            <p className="text-sm text-muted-foreground">Indian: {site.price}</p>
            <p className="text-sm text-muted-foreground">Foreigner: {site.foreignerPrice}</p>
          </div>
          <Button size="sm" disabled={!site.available}>
            {site.available ? "Book Now" : "Unavailable"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
