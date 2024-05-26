import OpenAI from "openai";

const openai = new OpenAI({
  organization: "org-k3NzgrklwfB5mXe4xFrw5vsI",
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

async function getItineraryResponse(location, price, mood) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "system", content: "You are tasked with assisting a traveler in a new city plan their day." },
      { role: "system", content: "A user will provide a city, and your goal is to respond with 10 potential activities for them to do in that location." },
      { role: "system", content: "You should always include a title and description of the activity." },
      { role: "system", content: "A desired price range may be included. On a scale of 0 to 3 - 0 being free and 3 being the most expensive, activities should meet this criteria. If no price is included, ignore this parameter." },
      { role: "system", content: "The user may also includle a 'mood' for that should inform you of the kind of activities they're interested in. For example, if they're in the mood to relax, include more activities for relaxing when possible. If no mood is included, ignore this parameter." },
      { role: "system", content: "Please format the response into a JSON object array with required properties for title, description, price, mood. If no mood is included, give the mood a value of 'adventure', 'relaxation', 'history', 'culture', or null depending on whichever category fits best." },
      { role: "system", content: "Only respond with the JSON object. Do not include any text before or after this object in your response." },
      { role: "user", content: `I'm planning on visiting ${location}. My ideal price range is ${price}. I'm in the mood for ${mood}. What are some activities you would recommend?` },
    ],
    model: "gpt-3.5-turbo",
  });

  let itineraryResponse = completion.choices[0].message.content;
  return JSON.parse(itineraryResponse);
}

async function getDayPlan(location, date, year) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "system", content: "You are tasked with helping a user plan their day in their city." },
      { role: "system", content: "A user will provide a city, and your goal is to respond with several activities (3-4) for that day." },
      { role: "system", content: `You should always include a title and start and end time of the activity. The start and end props must be ${date}. The date object is currently in "YY/MM/DD" format.` },
      { role: "system", content: `BOTH THE SELECTED START AND END PROPERTIES MUST HAVE DATE TIME STRINGS THAT ARE FOR THE CURRENT DATE for the year ${year}.` },
      { role: "system", content: "Please format the response into a JSON object array with required properties for title, description, start (datetime string format), and end (datetime string format). " },
      { role: "system", content: "Only respond with the JSON object. Do not include any text before or after this object in your response." },
      { role: "user", content: `I'm currently in ${location} and need help planning my day. Can you generate a schedule for my day?` },
    ],
    model: "gpt-3.5-turbo",
  });

  let scheduleResponse = completion.choices[0].message.content;
  return JSON.parse(scheduleResponse);
}

export { getItineraryResponse, getDayPlan };
