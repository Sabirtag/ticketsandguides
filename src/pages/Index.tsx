
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, Search, UserCheck } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 z-10" />
        <div 
          className="relative h-[70vh] bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop')" 
          }}
        >
          <div className="container relative z-20 h-full flex flex-col justify-center items-start px-4 md:px-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Discover India's Heritage
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-8">
              Book ASI site tickets and certified tour guides in one place. Experience India's rich cultural heritage with personalized tours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link to="/explore">Explore Sites</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-background/20 text-white border-white/30 hover:bg-background/30">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="py-8 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="bg-background rounded-lg shadow-lg p-4 md:p-6 -mt-16 relative z-30">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center border bg-background rounded-md px-3 py-2">
                  <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search heritage sites..."
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center border bg-background rounded-md px-3 py-2">
                  <CalendarDays className="mr-2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Select date..."
                    className="flex-1 bg-transparent outline-none"
                  />
                </div>
              </div>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Search className="h-10 w-10" />}
              title="Find Heritage Sites"
              description="Browse through hundreds of ASI protected monuments and heritage sites across India."
            />
            <FeatureCard 
              icon={<CalendarDays className="h-10 w-10" />}
              title="Book Tickets Instantly"
              description="Real-time availability and instant booking for all archaeological sites."
            />
            <FeatureCard 
              icon={<UserCheck className="h-10 w-10" />}
              title="Connect with Certified Guides"
              description="Book verified local guides who bring history to life with their expertise."
            />
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Popular Destinations</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore India's most visited heritage sites with real-time ticket availability
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DestinationCard
              image="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop"
              title="Taj Mahal"
              location="Agra, Uttar Pradesh"
            />
            <DestinationCard
              image="https://images.unsplash.com/photo-1624461050280-25ccc5af9256?q=80&w=1974&auto=format&fit=crop"
              title="Red Fort"
              location="Delhi"
            />
            <DestinationCard
              image="https://images.unsplash.com/photo-1557246572-83179c258ac5?q=80&w=2070&auto=format&fit=crop"
              title="Qutub Minar"
              location="Delhi"
            />
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg">View All Destinations</Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore India's Heritage?</h2>
          <p className="mb-8 max-w-2xl mx-auto text-primary-foreground/90">
            Join thousands of travelers who have discovered the rich history and culture of India through our platform.
          </p>
          <Button size="lg" variant="secondary">
            Sign Up Now
          </Button>
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
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Home</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Explore Sites</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Find Guides</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
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

// Helper Components
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => {
  return (
    <div className="bg-background rounded-lg p-6 text-center">
      <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const DestinationCard = ({ image, title, location }: {
  image: string;
  title: string;
  location: string;
}) => {
  return (
    <div className="group rounded-lg overflow-hidden bg-background shadow-md transition-all hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        <div className="flex justify-between items-center">
          <Button variant="link" className="px-0">View Details</Button>
          <div className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
            Available
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
