import OpenAI from "openai";

const openai = new OpenAI({
  organization: "org-k3NzgrklwfB5mXe4xFrw5vsI",
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

async function getItineraryResponse(location, mood) {
  console.log("loading...");
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "system", content: "You are tasked with assisting a traveler in a new city plan their day." },
      { role: "system", content: "They will give you a city, and your goal is to respond with 10 potential activities for them to do, ranging in price from free to more expensive" },
      { role: "system", content: "The user will also includle a 'mood' for the day that should inform you of the kind of activities they're interested in today. For example, if they're in the mood to relax, include more activities for relaxing when possible." },
      { role: "system", content: "These activities should be grouped by time of day in the following format: 2 in the morning, 3 in the afternoon, 3 in the evening, and 2 at night" },
      { role: "system", content: "Please format the response into a JSON array in the following format: [{timeOfDay: 'morning', activities: [{label: title, details: details}, {label: title, details: details}]}] " },
      { role: "system", content: "You should only respond with the JSON object." },
      { role: "user", content: `I'm planning on visiting ${location} and my mood is ${mood}. What should I do the first day I'm there` },
    ],
    model: "gpt-3.5-turbo",
  });

  let itineraryResponse = completion.choices[0].message.content;
  console.log("ITINERARY RESPONSE: ", itineraryResponse);
  return JSON.parse(itineraryResponse);
}

export { getItineraryResponse };

// Ducking attribution - <a href="https://www.vecteezy.com/free-vector/rubber-duck">Rubber Duck Vectors by Vecteezy</a>
