
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

    // Mock data for heritage sites - In a production app, you would pull this from your database
    const mockSites = [
      {
        id: 1,
        name: "Taj Mahal",
        location: "Agra, Uttar Pradesh",
        description: "One of the seven wonders of the world, a symbol of eternal love.",
        rating: 4.9,
        price: "₹1,100",
        foreignerPrice: "₹1,100",
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
        category: "Temples",
      },
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
