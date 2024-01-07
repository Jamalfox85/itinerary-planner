let adventureCodes = [9902, 7302];
let cultureCodes = [7318, 7318007, 7317];
let learningCodes = [7317];
let relaxingCodes = [9376, 9378, 9927002, 9376006];
let connectingCodes = [9379, 9379004];

let generalCodes = [7315, 9361];

/* Potential Categories */
let touristyCodes = [7376, 7376004];

function getMoodPoiCodes(moodId) {
  let codes;
  switch (moodId) {
    case 0:
      codes = adventureCodes;
    case 1:
      codes = cultureCodes;
    case 2:
      codes = learningCodes;
    case 3:
      codes = relaxingCodes;
    case 4:
      codes = connectingCodes;
    default:
      codes = [];
  }
  return [...codes, ...generalCodes];
}
export { getMoodPoiCodes };
