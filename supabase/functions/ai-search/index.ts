
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Search query:', query);

    // Enhanced mock data for heritage sites with complete booking information
    const mockSites = [
      {
        id: 1,
        name: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        description: "One of the seven wonders of the world, a symbol of eternal love built by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal.",
        rating: 4.9,
        price: "₹1,100",
        foreignerPrice: "₹1,100",
        category: "UNESCO World Heritage",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop",
        available: true,
        openingHours: "6:00 AM - 7:00 PM",
        closedOn: "Friday",
        visitDuration: "3 hours",
        address: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
        coordinates: { lat: 27.1751, lng: 78.0421 },
        amenities: ["Guided Tours", "Photography Allowed", "Wheelchair Accessible", "Restrooms", "Souvenir Shop"],
        restrictions: ["No Tripods", "No Food", "No Large Bags"],
        nearbyAttractions: ["Agra Fort", "Fatehpur Sikri", "Mehtab Bagh"],
        bookingTimeSlots: ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
      },
      {
        id: 2,
        name: "Red Fort",
        location: "Delhi",
        description: "A historic fort that served as the main residence of the Mughal Emperors for nearly 200 years, until 1857. It's a UNESCO World Heritage Site.",
        rating: 4.7,
        price: "₹35",
        foreignerPrice: "₹500",
        category: "Monuments",
        image: "https://images.unsplash.com/photo-1624461050280-25ccc5af9256?q=80&w=1974&auto=format&fit=crop",
        available: true,
        openingHours: "9:30 AM - 4:30 PM",
        closedOn: "Monday",
        visitDuration: "2-3 hours",
        address: "Netaji Subhash Marg, Lal Qila, Chandni Chowk, New Delhi, Delhi 110006",
        coordinates: { lat: 28.6562, lng: 77.2410 },
        amenities: ["Sound and Light Show", "Museum", "Restrooms", "Guide Services", "Photography Allowed"],
        restrictions: ["No Drones", "No Smoking", "No Food Inside"],
        nearbyAttractions: ["Chandni Chowk", "Jama Masjid", "India Gate"],
        bookingTimeSlots: ["9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM"]
      },
      {
        id: 3,
        name: "Qutub Minar",
        location: "Delhi",
        description: "The tallest brick minaret in the world, an incredible example of early Indo-Islamic architecture dated to 1193, constructed by Qutb al-Din Aibak.",
        rating: 4.5,
        price: "₹35",
        foreignerPrice: "₹550",
        category: "UNESCO World Heritage",
        image: "https://images.unsplash.com/photo-1557246572-83179c258ac5?q=80&w=2070&auto=format&fit=crop",
        available: true,
        openingHours: "7:00 AM - 5:00 PM",
        closedOn: "None",
        visitDuration: "1-2 hours",
        address: "Mehrauli, New Delhi, Delhi 110030",
        coordinates: { lat: 28.5244, lng: 77.1855 },
        amenities: ["Guide Services", "Wheelchair Access", "Photography Allowed", "Restrooms", "Gardens"],
        restrictions: ["No Climbing", "No Touching Artifacts"],
        nearbyAttractions: ["Mehrauli Archaeological Park", "Garden of Five Senses", "Saket Mall"],
        bookingTimeSlots: ["7:00 AM", "9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"]
      },
      {
        id: 4,
        name: "Humayun's Tomb",
        location: "Delhi",
        description: "The tomb of the Mughal Emperor Humayun, built by his wife Bega Begum in 1569-70, first garden-tomb on the Indian subcontinent and inspiration for the Taj Mahal.",
        rating: 4.6,
        price: "₹35",
        foreignerPrice: "₹550",
        category: "UNESCO World Heritage",
        image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=2069&auto=format&fit=crop",
        available: true,
        openingHours: "6:00 AM - 6:00 PM",
        closedOn: "None",
        visitDuration: "1-2 hours",
        address: "Mathura Road, Opposite Nizamuddin Mosque, New Delhi, Delhi 110013",
        coordinates: { lat: 28.5933, lng: 77.2507 },
        amenities: ["Garden", "Photography Allowed", "Wheelchair Access", "Guide Services", "Restrooms"],
        restrictions: ["No Food Inside", "No Commercial Photography Without Permit"],
        nearbyAttractions: ["Nizamuddin Dargah", "Sunder Nursery", "Lodhi Garden"],
        bookingTimeSlots: ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
      },
      {
        id: 5,
        name: "Ajanta Caves",
        location: "Aurangabad, Maharashtra",
        description: "Buddhist cave monuments dating from the 2nd century BCE to about 480 CE, featuring paintings depicting the past lives and rebirths of the Buddha.",
        rating: 4.8,
        price: "₹40",
        foreignerPrice: "₹600",
        category: "UNESCO World Heritage",
        image: "https://images.unsplash.com/photo-1575505018692-6e6476246e6e?q=80&w=2070&auto=format&fit=crop",
        available: false,
        openingHours: "9:00 AM - 5:30 PM",
        closedOn: "Monday",
        visitDuration: "4-5 hours",
        address: "Ajanta Village, Aurangabad District, Maharashtra 431117",
        coordinates: { lat: 20.5525, lng: 75.7033 },
        amenities: ["Guided Tours", "Museum", "Viewpoint", "Rest Area", "Photography Allowed"],
        restrictions: ["No Flash Photography", "No Touching Paintings", "No Food Inside Caves"],
        nearbyAttractions: ["Ellora Caves", "Bibi Ka Maqbara", "Daulatabad Fort"],
        bookingTimeSlots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"]
      },
      {
        id: 6,
        name: "Khajuraho Group of Monuments",
        location: "Madhya Pradesh",
        description: "Famous for their Nagara-style architectural symbolism and erotic sculptures, these medieval Hindu and Jain temples are a UNESCO World Heritage site.",
        rating: 4.7,
        price: "₹40",
        foreignerPrice: "₹600",
        category: "Temples",
        image: "https://images.unsplash.com/photo-1602302586676-63d8eee6c345?q=80&w=1974&auto=format&fit=crop",
        available: true,
        openingHours: "8:00 AM - 6:00 PM",
        closedOn: "None",
        visitDuration: "3-4 hours",
        address: "Khajuraho, Madhya Pradesh 471606",
        coordinates: { lat: 24.8518, lng: 79.9215 },
        amenities: ["Light and Sound Show", "Guide Services", "Museum", "Photography Allowed", "Rest Areas"],
        restrictions: ["No Touching Sculptures", "Modest Dress Code"],
        nearbyAttractions: ["Raneh Falls", "Panna National Park", "Ken River"],
        bookingTimeSlots: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
      },
      {
        id: 7,
        name: "Konark Sun Temple",
        location: "Odisha",
        description: "A 13th-century Sun temple dedicated to the Hindu god Surya, known for its exquisite stone carvings and chariot-shaped architecture.",
        rating: 4.8,
        price: "₹40",
        foreignerPrice: "₹600",
        category: "Temples",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12cc?q=80&w=1974&auto=format&fit=crop",
        available: true,
        openingHours: "6:00 AM - 8:00 PM",
        closedOn: "None",
        visitDuration: "2-3 hours",
        address: "Konark, Puri District, Odisha 752111",
        coordinates: { lat: 19.8876, lng: 86.0945 },
        amenities: ["Guide Services", "Museum", "Light and Sound Show", "Rest Areas", "Photography Allowed"],
        restrictions: ["No Climbing on Structures", "Modest Dress Code"],
        nearbyAttractions: ["Puri Beach", "Jagannath Temple", "Chilika Lake"],
        bookingTimeSlots: ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"]
      },
      {
        id: 8,
        name: "Ellora Caves",
        location: "Aurangabad, Maharashtra",
        description: "A UNESCO World Heritage Site featuring Buddhist, Hindu and Jain cave temples carved out of the vertical face of the Charanandri hills between the 6th and 10th centuries CE.",
        rating: 4.7,
        price: "₹40",
        foreignerPrice: "₹600",
        category: "UNESCO World Heritage",
        image: "https://images.unsplash.com/photo-1633862449409-82b7cf19e640?q=80&w=1974&auto=format&fit=crop",
        available: true,
        openingHours: "8:00 AM - 5:30 PM",
        closedOn: "Tuesday",
        visitDuration: "4-5 hours",
        address: "Ellora Cave Rd, Ellora, Maharashtra 431102",
        coordinates: { lat: 20.0258, lng: 75.1790 },
        amenities: ["Guide Services", "Rest Areas", "Souvenir Shop", "Wheelchair Access", "Photography Allowed"],
        restrictions: ["No Flash Photography", "No Touching Sculptures", "No Food Inside Caves"],
        nearbyAttractions: ["Ajanta Caves", "Bibi Ka Maqbara", "Daulatabad Fort"],
        bookingTimeSlots: ["8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
      },
      {
        id: 9,
        name: "Hampi",
        location: "Karnataka",
        description: "The ruins of Hampi represent the former capital of the Vijayanagara Empire, featuring stunning temples, palaces, and monuments from the 14th century.",
        rating: 4.9,
        price: "₹40",
        foreignerPrice: "₹600",
        category: "UNESCO World Heritage",
        image: "https://images.unsplash.com/photo-1600100598009-ae00a94cdba9?q=80&w=1974&auto=format&fit=crop",
        available: true,
        openingHours: "6:00 AM - 6:00 PM",
        closedOn: "None",
        visitDuration: "2 days recommended",
        address: "Hampi, Karnataka 583239",
        coordinates: { lat: 15.3350, lng: 76.4600 },
        amenities: ["Guide Services", "Boat Rides", "Bicycle Rentals", "Rest Areas", "Photography Allowed"],
        restrictions: ["No Climbing on Structures", "No Removing Artifacts"],
        nearbyAttractions: ["Tungabhadra Dam", "Anegundi Village", "Hospet"],
        bookingTimeSlots: ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
      },
      {
        id: 10,
        name: "Mahabalipuram",
        location: "Tamil Nadu",
        description: "A UNESCO World Heritage Site known for its 7th and 8th-century rock-cut temples and monuments built by the Pallava dynasty.",
        rating: 4.6,
        price: "₹40",
        foreignerPrice: "₹600",
        category: "UNESCO World Heritage",
        image: "https://images.unsplash.com/photo-1600621332348-af49b9482062?q=80&w=1974&auto=format&fit=crop",
        available: true,
        openingHours: "6:00 AM - 6:00 PM",
        closedOn: "None",
        visitDuration: "3-4 hours",
        address: "Mahabalipuram, Tamil Nadu 603104",
        coordinates: { lat: 12.6269, lng: 80.1929 },
        amenities: ["Guide Services", "Beach Access", "Rest Areas", "Photography Allowed", "Souvenir Shops"],
        restrictions: ["No Climbing on Structures", "No Touching Sculptures"],
        nearbyAttractions: ["Crocodile Bank", "DakshinaChitra Museum", "ECR Beach"],
        bookingTimeSlots: ["6:00 AM", "8:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"]
      }
    ];

    const siteInfoJson = JSON.stringify(mockSites);

    // Call OpenAI API to interpret the search query
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a search assistant for a heritage tourism platform in India. 
            You help users find heritage sites based on their queries.
            
            Here is the database of heritage sites:
            ${siteInfoJson}
            
            Your task is to analyze the user's query and return the most relevant site IDs from the database above.
            Return ONLY a JSON array of IDs matching the query, nothing else.
            For example: [1, 3, 4]
            
            If the query is vague or could match multiple sites, return all matching IDs.
            If no sites match, return an empty array: []`
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      })
    });

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.text();
      console.error('OpenAI API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Error processing search query with AI' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const openAIData = await openAIResponse.json();
    console.log('OpenAI response:', openAIData);

    let siteIds;
    try {
      // Extract the IDs from the AI response
      const content = openAIData.choices[0].message.content.trim();
      siteIds = JSON.parse(content);
      
      if (!Array.isArray(siteIds)) {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to parse search results' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Filter the mock data based on the IDs returned by OpenAI
    const results = mockSites.filter(site => siteIds.includes(site.id));

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in ai-search function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
