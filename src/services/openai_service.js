import OpenAI from "openai";

// const openai = new OpenAI({
//   organization: "org-k3NzgrklwfB5mXe4xFrw5vsI",
//   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

async function getItineraryResponse(location, mood) {
  // const completion = await openai.chat.completions.create({
  //   messages: [
  //     { role: "system", content: "You are a helpful assistant." },
  //     { role: "system", content: "You are tasked with assisting a traveler in a new city plan their day." },
  //     { role: "system", content: "They will give you a city, and your goal is to respond with 10 potential activities for them to do, ranging in price from free to more expensive" },
  //     { role: "system", content: "If applicable, please include relevant websites and links." },
  //     { role: "system", content: "The user will also includle a 'mood' for the day that should inform you of the kind of activities they're interested in today. For example, if they're in the mood to relax, include more activities for relaxing when possible." },
  //     { role: "system", content: "These activities should be grouped by time of day in the following format: 2 in the morning, 3 in the afternoon, 3 in the evening, and 2 at night" },
  //     { role: "system", content: "Please format the response into a JSON array in the following format: [{timeOfDay: 'morning', activities: [{label: title, details: details}, {label: title, details: details}]}] " },
  //     { role: "system", content: "Only respond with the JSON object. Do not include any text before or after this object in your response." },
  //     { role: "user", content: `I'm planning on visiting ${location} and I'm in the mood for ${mood}. What should I do the first day I'm there` },
  //   ],
  //   model: "gpt-3.5-turbo",
  // });

  // let itineraryResponse = completion.choices[0].message.content;
  // return JSON.parse(itineraryResponse);
  let testing = import.meta.env.VITE_TEST;
  console.log(testing);
}

export { getItineraryResponse };

// Ducking attribution - <a href="https://www.vecteezy.com/free-vector/rubber-duck">Rubber Duck Vectors by Vecteezy</a>
