import OpenAI from "openai";

// const openai = new OpenAI({
//   organization: "org-k3NzgrklwfB5mXe4xFrw5vsI",
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

// async function getItineraryResponse(location, mood) {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "system", content: "You are tasked with assisting a traveler in a new city plan their day." },
//       { role: "system", content: "They will give you a city, and your goal is to respond with 10 potential activities for them to do, ranging in price from free to more expensive" },
//       { role: "system", content: "If applicable, please include relevant websites and links." },
//       { role: "system", content: "The user will also includle a 'mood' for the day that should inform you of the kind of activities they're interested in today. For example, if they're in the mood to relax, include more activities for relaxing when possible." },
//       { role: "system", content: "These activities should be grouped by time of day in the following format: 2 in the morning, 3 in the afternoon, 3 in the evening, and 2 at night" },
//       { role: "system", content: "Please format the response into a JSON array in the following format: [{timeOfDay: 'morning', activities: [{label: title, details: details}, {label: title, details: details}]}] " },
//       { role: "system", content: "Only respond with the JSON object. Do not include any text before or after this object in your response." },
//       { role: "user", content: `I'm planning on visiting ${location} and I'm in the mood for ${mood}. What should I do the first day I'm there` },
//     ],
//     model: "gpt-3.5-turbo",
//   });

//   let itineraryResponse = completion.choices[0].message.content;
//   console.log("ITINERARY: ", JSON.parse(itineraryResponse));
//   return JSON.parse(itineraryResponse);
//   // return null;
// }

function getItineraryResponse() {
  return [
    {
      timeOfDay: "morning",
      activities: [
        {
          label: "Visit the Atlanta Botanical Garden",
          details: "Enjoy a peaceful morning surrounded by beautiful flowers and plants. Admission fees apply. More information can be found at their website: https://atlantabg.org/",
        },
        {
          label: "Explore the Atlanta BeltLine Eastside Trail",
          details: "Take a relaxing walk or bike ride along the scenic Atlanta BeltLine Eastside Trail. Enjoy the urban art, parks, and vibrant atmosphere. Free to access.",
        },
      ],
    },
    {
      timeOfDay: "afternoon",
      activities: [
        {
          label: "Visit the Martin Luther King Jr. National Historic Site",
          details: "Explore the historic site dedicated to Martin Luther King Jr. Learn about his life and legacy through exhibits, tours, and a visit to his childhood home. Admission is free. More information can be found at their website: https://www.nps.gov/malu/",
        },
        {
          label: "Take a tour of the World of Coca-Cola",
          details: "Discover the history and taste the different Coca-Cola beverages at the World of Coca-Cola. Learn about the iconic brand and enjoy interactive exhibits. Admission fees apply. More information can be found at their website: https://www.worldofcoca-cola.com/",
        },
        {
          label: "Explore the Atlanta History Center",
          details: "Immerse yourself in Atlanta's history at the Atlanta History Center. Visit the exhibits, including the Civil War Museum and Swan House, and take a stroll through the beautiful gardens. Admission fees apply. More information can be found at their website: https://www.atlantahistorycenter.com/",
        },
      ],
    },
    {
      timeOfDay: "evening",
      activities: [
        {
          label: "Catch a show at the Fox Theatre",
          details: "Experience the grandeur of the Fox Theatre by attending a live performance. Enjoy Broadway shows, concerts, and more in this stunning historic venue. Ticket prices vary. More information can be found at their website: https://foxtheatre.org/",
        },
        {
          label: "Dine at the Atlanta Food Truck Park",
          details: "Savor a variety of delicious food from local food trucks at the Atlanta Food Truck Park. Enjoy the vibrant atmosphere and indulge in diverse cuisine options. Prices vary depending on the food trucks.",
        },
        {
          label: "Go bar hopping in the Virginia-Highland neighborhood",
          details: "Experience the lively nightlife in the Virginia-Highland neighborhood. Visit various bars and pubs, enjoy live music, and socialize with locals and fellow travelers.",
        },
      ],
    },
    {
      timeOfDay: "night",
      activities: [
        {
          label: "Visit the SkyView Atlanta",
          details: "Take a ride on the giant Ferris wheel, SkyView Atlanta, and enjoy breathtaking views of the city skyline at night. Ticket prices apply. More information can be found at their website: https://www.skyviewatlanta.com/",
        },
        {
          label: "Enjoy live music at the Blind Willie's",
          details: "Head to Blind Willie's, a blues club in Atlanta, and enjoy live music performances. Sit back, relax, and immerse yourself in the soulful atmosphere. Admission fees vary.",
        },
      ],
    },
  ];
}

export { getItineraryResponse };

// Ducking attribution - <a href="https://www.vecteezy.com/free-vector/rubber-duck">Rubber Duck Vectors by Vecteezy</a>
