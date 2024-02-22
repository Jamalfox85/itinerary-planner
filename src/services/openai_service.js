import OpenAI from "openai";

const openai = new OpenAI({
  organization: "org-k3NzgrklwfB5mXe4xFrw5vsI",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getItineraryResponse(location, mood) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "system", content: "You are tasked with assisting a traveler in a new city plan their day." },
      { role: "system", content: "They will give you a city, and your goal is to respond with 10 potential activities for them to do. Include at least a title and description for each. Include other information as applicable." },
      { role: "system", content: "A desired price range may be included. For example, if a user wants free actiities, only include free actitivites. If they're comfortable with moderately expensive options, for example 2 out of 3 $ on google, return moderately priced options." },
      { role: "system", content: "If applicable, please include relevant websites and links." },
      { role: "system", content: "The user may also includle a 'mood' for the day that should inform you of the kind of activities they're interested in today. For example, if they're in the mood to relax, include more activities for relaxing when possible." },
      { role: "system", content: "Please format the response into a JSON object array with required properties for title and description, and optional properties for price range, website, and address as applicable." },
      { role: "system", content: "Only respond with the JSON object. Do not include any text before or after this object in your response." },
      { role: "user", content: `I'm planning on visiting ${location}. I'm in the mood for ${mood}. What are some activities you would recommend?` },
    ],
    model: "gpt-3.5-turbo",
  });

  let itineraryResponse = completion.choices[0].message.content;
  return JSON.parse(itineraryResponse);
}

// function getItineraryResponse() {
//   return [
//     {
//       title: "Explore Strasbourg Cathedral",
//       description: "Embark on an adventure by visiting Strasbourg Cathedral, a masterpiece of Gothic architecture offering panoramic views from its tower. Discover intricate carvings and beautiful stained glass windows.",
//     },
//     {
//       title: "Canoeing on the Ill River",
//       description: "Take an adventurous canoe trip on the Ill River, where you can paddle through the city and enjoy the scenic views of Strasbourg from a unique perspective.",
//     },
//     {
//       title: "Visit La Petite France",
//       description: "Wander through the charming quarter of La Petite France with its half-timbered houses, canals, and bridges. Explore the narrow streets and soak in the historic ambiance of the area.",
//     },
//     {
//       title: "Strasbourg Boat Tour",
//       description: "Embark on a boat tour along the picturesque canals of Strasbourg. Experience a different angle of the city while learning about its history and architecture.",
//     },
//     {
//       title: "Explore the Vosges Mountains",
//       description: "For a thrilling outdoor adventure, head to the Vosges Mountains near Strasbourg. Hike through scenic trails, discover picturesque villages, and enjoy breathtaking views.",
//     },
//     {
//       title: "Visit Parc de l'Orangerie",
//       description: "Embark on a leisurely adventure in Parc de l'Orangerie, the oldest public park in Strasbourg. Enjoy a relaxing stroll, visit the zoo, or rent a boat for a peaceful ride on the lake.",
//     },
//     {
//       title: "Strasbourg Escape Game",
//       description: "Challenge yourself with an adventure-themed escape game in Strasbourg. Put your problem-solving skills to the test and work with your team to solve puzzles and escape within a set time.",
//     },
//     {
//       title: "Guided Bike Tour of Strasbourg",
//       description: "Embark on an adventurous bike tour around Strasbourg with a knowledgeable guide. Pedal through the city's streets, parks, and attractions while learning about its history and culture.",
//     },
//     {
//       title: "Visit Château du Haut-Kœnigsbourg",
//       description: "Embark on a day trip from Strasbourg to Château du Haut-Kœnigsbourg, a majestic castle nestled in the Vosges Mountains. Explore the castle's ramparts, towers, and scenic surroundings.",
//     },
//     {
//       title: "Hang out at Jardin des Deux Rives",
//       description: "Engage in outdoor adventures and leisure activities at Jardin des Deux Rives, a park located along the Rhine River. Enjoy walking, cycling, picnicking, or simply taking in the natural beauty.",
//     },
//   ];
// }

export { getItineraryResponse };
