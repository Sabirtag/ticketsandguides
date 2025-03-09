import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ArrowLeft, Building, LandmarkIcon, Bus, Hotel } from "lucide-react";

const CityPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // This would typically come from an API
  const getCityData = (cityId: string) => {
    const cities = [
      {
        id: "1",
        name: "Delhi",
        description: "The capital city of India, Delhi is a melting pot of cultures, histories, and architectural marvels that range from ancient to modern. With numerous UNESCO World Heritage sites, bustling markets, delicious cuisine, and vibrant neighborhoods, Delhi offers visitors a captivating glimpse into India's past, present, and future.",
        attractions: 48,
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5",
        topSites: [
          { id: 4, name: "Qutub Minar", type: "Historical" },
          { id: 2, name: "Red Fort", type: "Historical" },
          { id: 15, name: "India Gate", type: "Monument" },
          { id: 16, name: "Humayun's Tomb", type: "Historical" },
          { id: 17, name: "Lotus Temple", type: "Religious" },
          { id: 18, name: "Akshardham Temple", type: "Religious" }
        ],
        touristInfo: {
          bestTimeToVisit: "October to March",
          localTransport: "Metro, Buses, Auto-rickshaws",
          languages: "Hindi, English, Punjabi, Urdu"
        }
      },
      {
        id: "2",
        name: "Agra",
        description: "Home to the iconic Taj Mahal, Agra is one of India's most visited cities. Beyond the Taj, the city boasts magnificent Mughal-era architecture, bustling bazaars, and a rich cultural heritage that draws millions of visitors each year.",
        attractions: 23,
        image: "https://images.unsplash.com/photo-1548013146-72479768bada",
        topSites: [
          { id: 1, name: "Taj Mahal", type: "Historical" },
          { id: 21, name: "Agra Fort", type: "Historical" },
          { id: 22, name: "Fatehpur Sikri", type: "Historical" },
          { id: 23, name: "Mehtab Bagh", type: "Garden" },
          { id: 24, name: "Itimad-ud-Daulah", type: "Historical" }
        ],
        touristInfo: {
          bestTimeToVisit: "October to March",
          localTransport: "Auto-rickshaws, Cycle-rickshaws, Taxis",
          languages: "Hindi, English, Urdu"
        }
      },
      {
        id: "3",
        name: "Jaipur",
        description: "Known as the 'Pink City' for its distinctive terracotta-colored buildings, Jaipur is the capital of Rajasthan state. Famous for its royal heritage, magnificent palaces, colorful bazaars, and vibrant culture, Jaipur forms part of India's popular Golden Triangle tourist circuit.",
        attractions: 35,
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
        topSites: [
          { id: 3, name: "Hawa Mahal", type: "Historical" },
          { id: 31, name: "Amer Fort", type: "Historical" },
          { id: 32, name: "City Palace", type: "Historical" },
          { id: 33, name: "Jantar Mantar", type: "Scientific" },
          { id: 34, name: "Jal Mahal", type: "Historical" },
          { id: 35, name: "Albert Hall Museum", type: "Museum" }
        ],
        touristInfo: {
          bestTimeToVisit: "October to March",
          localTransport: "Auto-rickshaws, City Buses, Taxis",
          languages: "Hindi, English, Rajasthani"
        }
      },
      // Other cities...
      {
        id: "4",
        name: "Mumbai",
        attractions: 42,
        description: "The financial capital of India, Mumbai is a city of dreams, energy, and endless opportunities. From colonial architecture to modern skyscrapers, from Bollywood to bustling markets, Mumbai offers a vibrant mix of traditions and contemporary urban life.",
        image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
        topSites: [],
        touristInfo: {
          bestTimeToVisit: "October to March",
          localTransport: "Local Trains, Buses, Taxis",
          languages: "Marathi, Hindi, English"
        }
      },
      {
        id: "5",
        name: "Kolkata",
        attractions: 29,
        description: "The cultural capital of India, Kolkata is known for its literary, artistic, and revolutionary heritage. With colonial-era architecture, bustling markets, trams, and vibrant festivals, Kolkata offers visitors a uniquely immersive cultural experience.",
        image: "https://images.unsplash.com/photo-1536421629999-7048f1d6926f",
        topSites: [],
        touristInfo: {
          bestTimeToVisit: "October to March",
          localTransport: "Metro, Trams, Buses",
          languages: "Bengali, Hindi, English"
        }
      }
    ];
    
    return cities.find(city => city.id === cityId) || null;
  };
  
  const city = getCityData(id || "1");
  
  if (!city) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-12 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find information about this city.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        <img 
          src={city.image} 
          alt={city.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-end px-4 py-8 container">
          <Button variant="outline" className="w-fit mb-4 text-white border-white hover:bg-white/20 hover:text-white" asChild>
            <Link to="/" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl font-bold text-white mb-2">{city.name}</h1>
          <div className="flex items-center text-white/80">
            <MapPin className="h-5 w-5 mr-1" />
            <span>{city.attractions} attractions available to explore</span>
          </div>
        </div>
      </div>
      
      {/* City Description */}
      <div className="container px-4 py-8">
        <div className="max-w-3xl">
          <p className="text-lg text-muted-foreground mb-8">
            {city.description}
          </p>
        </div>
        
        {/* Travel Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary h-5 w-5" />
                <CardTitle className="text-base">Best Time to Visit</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{city.touristInfo.bestTimeToVisit}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Bus className="text-primary h-5 w-5" />
                <CardTitle className="text-base">Local Transport</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{city.touristInfo.localTransport}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Languages className="text-primary h-5 w-5" />
                <CardTitle className="text-base">Languages</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p>{city.touristInfo.languages}</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Top Attractions */}
        {city.topSites.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Top Attractions in {city.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {city.topSites.map((site) => (
                <Link to={`/destination/${site.id}`} key={site.id}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <LandmarkIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold">{site.name}</h3>
                          <p className="text-sm text-muted-foreground">{site.type}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Stay and Explore */}
        <div className="bg-primary/5 rounded-lg p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Stay and Explore</h2>
              <p className="text-muted-foreground mb-6">
                Make the most of your visit to {city.name} with our curated travel packages. 
                Stay at premium hotels, enjoy guided tours, and experience the best of what this city has to offer.
              </p>
              <Button size="lg">View Travel Packages</Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Hotel className="h-5 w-5 text-primary" />
                <span>Recommended Accommodations</span>
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between border-b pb-2">
                  <span>Luxury Hotels</span>
                  <span className="font-bold">12</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Boutique Stays</span>
                  <span className="font-bold">8</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span>Budget Friendly</span>
                  <span className="font-bold">15</span>
                </li>
                <li className="flex justify-between">
                  <span>Heritage Properties</span>
                  <span className="font-bold">5</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

// Import missing icons
const Calendar = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

const Languages = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
);

export default CityPage;
