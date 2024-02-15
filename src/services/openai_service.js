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
      title: "Visit the Atlanta Botanical Garden",
      details: "Enjoy a peaceful morning surrounded by beautiful flowers and plants. Admission fees apply. More information can be found at their website: https://atlantabg.org/",
    },
    {
      title: "Explore the Atlanta BeltLine Eastside Trail",
      details: "Take a relaxing walk or bike ride along the scenic Atlanta BeltLine Eastside Trail. Enjoy the urban art, parks, and vibrant atmosphere. Free to access.",
    },
    {
      title: "Visit the Martin Luther King Jr. National Historic Site",
      details: "Explore the historic site dedicated to Martin Luther King Jr. Learn about his life and legacy through exhibits, tours, and a visit to his childhood home. Admission is free. More information can be found at their website: https://www.nps.gov/malu/",
    },
    {
      title: "Take a tour of the World of Coca-Cola",
      details: "Discover the history and taste the different Coca-Cola beverages at the World of Coca-Cola. Learn about the iconic brand and enjoy interactive exhibits. Admission fees apply. More information can be found at their website: https://www.worldofcoca-cola.com/",
    },
    {
      title: "Explore the Atlanta History Center",
      details: "Immerse yourself in Atlanta's history at the Atlanta History Center. Visit the exhibits, including the Civil War Museum and Swan House, and take a stroll through the beautiful gardens. Admission fees apply. More information can be found at their website: https://www.atlantahistorycenter.com/",
    },
  ];
}

export { getItineraryResponse };
