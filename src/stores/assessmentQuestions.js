const questions = [
  {
    question: "Are you feeling social?",
    value: null,
    label: "Social Activities",
    options: [
      {
        value: 0,
        label: "Yes!",
        businessCodes: [9379, 9379004, 9379006] /* Nightlife, Bar, Cocktail Bar */,
        numResults: 3,
      },
      {
        value: 1,
        label: "Maybe a little.",
        businessCodes: [9379004, 9379006],
        numResults: 1,
      },
      {
        value: 2,
        label: "I'd much rather fly solo..",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: 'Do you consider yourself a "foodie"',
    value: null,
    label: "Food",
    options: [
      {
        value: 0,
        label: "Absolutely!",
        businessCodes: [7315, 9376, 7315081, 7315002, 7315082, 7315003, 7315083, 9315084, 7315085, 7315062, 7315086, 7315004, 7315005, 7315087, 7315006, 7315007, 7315088, 7315089, 7315072, 7315008, 7315142, 7315090, 7315091, 9376002, 9376006],
        numResults: 3,
        /* Restaurant, Cafe/Pub, Afghan Restaurant, African Restaurant, 
        Algerian Restaurant, American Restaurant, Arabian Restaurant, Argentinian Restaurant, 
        Armenian Restaurant, Asian Restaurant, Australian Restaurant, Austrian Restaurant
        Barbecue Restaurant, Basque Restaurant, Belgian Restaurant, Bistro, Bolivian Restaurant, 
        Bosnian Restaurant, Brazilian Restaurant, British Restaurant, Buffet Restaurant, Bulgarian Restaurant, 
        Burmese Restaurant, Cafe, Coffee Shop */
        /* STILL NEED TO GO BACK AND ADD THE OTHER NICHE/CULTURE SPECIFIC RESTAURANTS */
      },
      {
        value: 1,
        label: "I like food.",
        businessCodes: [7315, 9376, 7315003, 7315062, 7315005, 7315007, 7315142, 9376002, 9376006],
        numResults: 2,
      },
      {
        value: 2,
        label: "Meh, I eat to survive.",
        businessCodes: [7315, 7315003, 7315062, 7315005, 7315007, 7315142, 9376002, 9376006],
        numResults: 1,
      },
      {
        value: 3,
        label: "No, don't put food in my plans.",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "How do you feel about outdoor activities?",
    value: null,
    label: "Outdoor Activities",
    options: [
      {
        value: 0,
        label: "Love them!",
        businessCodes: [7360, 9927, 9362, 7302, 8099, 9927002, 8099016] /* Campground, Zoo Arboreta & Botanical Gardens, Park & Recreation Area, Trails, Geographic Feature, Arboreta & Botanical Gardens, Bay */,
        numResults: 2,
      },
      {
        value: 1,
        label: "Occasionally",
        businessCodes: [7360, 9927, 9362, 8099, 9927002, 8099016],
        numResults: 1,
      },
      {
        value: 2,
        label: "Not a fan",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "Are you interested in exploring cultural and historical sites?",
    value: null,
    label: "Cultural and Historical Sites",
    options: [
      {
        value: 0,
        label: "Absolutely!",
        businessCodes: [9362002] /* Battlefield */,
        numResults: 2,
      },
      {
        value: 1,
        label: "Somewhat",
        businessCodes: [9362002],
        numResults: 1,
      },
      {
        value: 2,
        label: "Not really",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "Do you seek adventurous activities during your day out?",
    value: null,
    label: "Adventurous Activities",
    options: [
      {
        value: 0,
        label: "Bring it on!",
        businessCodes: [9902, 9902003, 9902003] /* Amusement Park, Amusement Park, Amusement Place */,
        numResults: 2,
      },
      {
        value: 1,
        label: "Maybe a little.",
        businessCodes: [],
        numResults: 1,
      },
      {
        value: 2,
        label: "Not at all",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "Are you interested in shopping during your day?",
    value: null,
    label: "Shopping",
    options: [
      {
        value: 0,
        label: "I love shopping",
        businessCodes: [9361, 7332, 9361058, 9361002, 9361006, 9361007, 9361008] /* Shop, Market, Bags & Leatherware, Book Shop, Clothing Shop, Men's Clothing, Women's Clothing */,
        numResults: 4,
      },
      {
        value: 1,
        label: "Casual Shopper",
        businessCodes: [9361, 7332, 9361006, 9361007, 9361008],
        numResults: 2,
      },
      {
        value: 2,
        label: "Not interested",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "How important are art and creativity to your interests?",
    value: null,
    label: "Art & Creativity",
    options: [
      {
        value: 0,
        label: "Very Important",
        businessCodes: [7318, 9361049] /* Theater, Antique/Art Shop */,
        numResults: 3,
      },
      {
        value: 1,
        label: "Somewhat",
        businessCodes: [],
        numResults: 1,
      },
      {
        value: 2,
        label: "Not a priority",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "Do you enjoy live music or attending event?",
    value: null,
    label: "Live Music & Events",
    options: [
      {
        value: 0,
        label: "Love it!",
        businessCodes: [7318007, 7318002, 9379009] /* Amphitheater, Concert Hall, Comedy Club */,
        numResults: 3,
      },
      {
        value: 1,
        label: "Occassionally",
        businessCodes: [7318007],
        numResults: 1,
      },
      {
        value: 2,
        label: "Not my thing",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "Would you like some downtime for relaxation during your day?",
    value: null,
    label: "Relaxation & Downtime",
    options: [
      {
        value: 0,
        label: "Yes, please!",
        businessCodes: [9362, 9378],
        numResults: 2,
      },
      {
        value: 1,
        label: "Maybe a bit.",
        businessCodes: [9362, 9378],
        numResults: 1,
      },
      {
        value: 2,
        label: "No, I prefer constant activity",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "Are you interested in incorporating fitness activities into your itinerary?",
    value: null,
    label: "Fitness Activities",
    options: [
      {
        value: 0,
        label: "Absolutely!",
        businessCodes: [7374002] /* Athletics Track */,
        numResults: 2,
      },
      {
        value: 1,
        label: "Maybe a light activity.",
        businessCodes: [],
        numResults: 1,
      },
      {
        value: 2,
        label: "Not interested",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "How interested are you in sports activities?",
    value: null,
    label: "Sports Activities",
    options: [
      {
        value: 0,
        label: "Love them!",
        businessCodes: [7320, 7374, 7374009, 7374012] /* Sports Center, Stadium, Baseball Park, Basketball Arena */,
        numResults: 2,
      },
      {
        value: 1,
        label: "Not for me",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
  {
    question: "Would you like to include educational or learning experiences in your itinerary?",
    value: null,
    label: "Educational Experiences",
    options: [
      {
        value: 0,
        label: "Sure!",
        businessCodes: [],
        numResults: 1,
      },
      {
        value: 1,
        label: "I'll stick to the rivers and the lakes that I'm used to.",
        businessCodes: [],
        numResults: 0,
      },
    ],
  },
];

export default questions;
/* CATEGORIES TO ADD
7342 - Movie Theater
7376 - Tourist Attraction
9927004 - Aquatic Zoo
9378002 - Bowling
7318006 - Cabaret Theater
*/
