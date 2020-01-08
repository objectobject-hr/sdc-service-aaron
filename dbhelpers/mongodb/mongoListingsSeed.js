const mongoose = require("mongoose");
const faker = require("faker");
const db = require("./index.js");
// const Listing = require("./model.js");

const path = require("path");
const fs = require("fs");
const file = path.join(__dirname, "mongoListings.csv");
const stream = fs.createWriteStream(file);

const header =
  "title,venuetype,bedrooms,sleepcapacity,bathrooms,squarefeet,reviewoverview,rating,reviewnumber,owners,cleaningfee,states,city,pic,listingid\n";
stream.write(header, "utf8");

listingAdjectives = [
  "sunset roost",
  "lux",
  "perfect nest",
  "private pool",
  "lakefront",
  "charming",
  "family-friendly",
  "secluded",
  "beach front",
  "relaxing",
  "lake cabin",
  "pine cone",
  "stunning",
  "gorgeous modern",
  "estes mountain",
  "river front",
  "water front",
  "charming",
  "winter special",
  "beautiful",
  "magnificent",
  "ocean view",
  "mountain getaway",
  "colonial",
  "rustic",
  "wondrous",
  "perfect getaway",
  "quiet",
  "historical",
  "modern",
  "gulf front",
  "relaxing river",
  "summer breezes",
  "enchanting rockwood",
  "cowell beach",
  "rustic country",
  "resort",
  "panoramic ocean view",
  "executive mountain",
  "executive beach",
  "executive",
  "comfortable and spacious",
  "private",
  "mountain lookout",
  "scenic luxury",
  "great escape",
  "stone lodge",
  "dream retreat",
  "dream guesthouse",
  "enchanting",
  "luxury",
  "lighthouse view",
  "comfortable",
  "bay front",
  "perfect & affordable",
  "beach",
  "scenic",
  "location, location!",
  "delightful vacation",
  "grand",
  "large",
  "beautiful contemporary",
  "ocean block",
  "elegant",
  "breathtaking",
  "new",
  "riverside",
  "beach bungalow",
  "wild dunes",
  "stargazer lodge",
  "quaint & cozy",
  "downtown",
  "amazing views",
  "centrally located",
  "seaside",
  "newly remodeled",
  "family vacation spot",
  "palm",
  "luxury",
  "dune",
  "fine-private",
  "winter views",
  "summer views",
  "fall views",
  "spring views",
  "restored",
  "expansive",
  "conveniently located",
  "total remodel",
  "hidden",
  "chic",
  "victorian",
  "sandy pines",
  "Norman Rockwell",
  "stylish",
  "greek",
  "revival style",
  "spacious",
  "good value",
  "at the water edge",
  "designer",
  "fun",
  "sandcastle",
  "sky ledge",
  "alpine",
  "free night!",
  "summer beach",
  "absolutely gorgeous",
  "asian-inspired",
  "autumn",
  "wine country",
  "classic",
  "bayside",
  "vacation",
  "southwest",
  "immaculate",
  "island style",
  "beautiful slope",
  "upscale",
  "vintage",
  "picturesque",
  "redwood retreat",
  "tuscan",
  "cliffside",
  "foresty",
  "artistic",
  "paradise",
  "jet luxury",
  "skyline view"
];

listingStyles = [
  "home",
  "loft",
  "chalet",
  "house",
  "beachhouse",
  "guesthouse",
  "cabin",
  "skyloft",
  "ranch",
  "cottage",
  "mansion",
  "treehouse",
  "lakehouse",
  "townhouse",
  "apartment",
  "condo",
  "resort",
  "lodge",
  "lodging",
  "country house",
  "manor",
  "estate",
  "summer home",
  "winter lodge",
  "retreat",
  "log home",
  "rental",
  "castle"
];

listingType = ["House", "Apartment", "Condo", "Townhouse"];

listingAmenities = [
  "family-friendly",
  "pet-friendly",
  "pool",
  "gated community",
  "fooseball",
  "trampoline",
  "spa",
  "close walk to beach",
  "close walk to town",
  "close to village",
  "surrounded by woods",
  "golf resort",
  "ski resort",
  "gourmet kitchen",
  "fishing",
  "hiking-friendly",
  "amazing garden",
  "backyard wilderness",
  "yacht",
  "boating",
  "close to downtown",
  "game room",
  "ac/heating",
  "hot tub",
  "jacuzzi",
  "bicycles",
  "surf",
  "great amenities",
  "nearby pond",
  "fireplace",
  "nearby lake",
  "garage parking",
  "great for photography",
  "gym",
  "loofers",
  "fireplace",
  "wildlife",
  "nearby trails",
  "close to train station",
  "stargazing",
  "vineyards",
  "paddle-boat",
  "kayak",
  "dock",
  "fitness center"
];

listingReview = [
  "Great.",
  "Great find.",
  "Beautiful view.",
  "Great bargain.",
  "Good ammenities.",
  "Spectacular views.",
  "Convenient location.",
  "Excellent.",
  "Wonderful.",
  "Exceptional.",
  "Very good.",
  "Good for families."
];

writeCSV = callback => {
  let i = 10000000;

  function generateData() {
    let ok = true;

    do {
      i--;
      if (i % 10000 === 0) {
        console.log(i);
      }

      let listings = [];
      let obj;
      let listingcount = 0;
      // let data =
      //   "title,venuetype,bedrooms,sleepcapacity,bathrooms,squarefeet,reviewoverview,rating,reviewnumber,owners,cleaningfee,states,city,pic,listingid";
      obj = {};
      let title =
        listingAdjectives[
          Math.floor(Math.random() * listingAdjectives.length)
        ] +
        " " +
        listingStyles[Math.floor(Math.random() * listingStyles.length)] +
        " " +
        listingAmenities[Math.floor(Math.random() * listingStyles.length)] +
        " " +
        listingAmenities[Math.floor(Math.random() * listingStyles.length)];
      title = title.slice(0, 1).toUpperCase() + title.slice(1);
      let venuetype =
        listingType[Math.floor(Math.random() * listingType.length)];
      let bedrooms = Math.floor(Math.random() * 5 + 1);
      let sleepcapacity = bedrooms * 2 + Math.floor(Math.random() * 3 + 1);
      let bathrooms = Math.floor(Math.random() * 3 + 1);
      let squarefeet = Math.floor(Math.random() * 600 + 1) * 10 + 1000;
      let reviewoverview =
        listingReview[Math.floor(Math.random() * listingReview.length)];
      let rating = Math.floor(Math.random() * 10) / 10 + 4;
      let reviewnumber = Math.floor(Math.random() * 200 + 15);
      let owners = faker.name.findName();
      let cleaningfee = Math.floor(Math.random() * 100) + 10;
      let states = faker.address.state();
      let city = faker.address.city();
      let pic = faker.image.image();
      let listingid = i;
      data = `${title},${venuetype},${bedrooms},${sleepcapacity},${bathrooms},${squarefeet},${reviewoverview},${rating},${reviewnumber},${owners},${cleaningfee},${states},${city},${pic},${listingid}\n`;
      // listings.push(obj);
      // listingcount = listingcount + 1;

      if (i === 0) {
        stream.write(data, callback); // needs callback as a parameter to write() (inherited method of fs)
        // stream.end(); // we are going to end the connection after writing to CSV inside of seedDB's function definition INSTEAD
      } else {
        ok = stream.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      stream.once("drain", generateData);
    }
  }
  console.log(i);
  generateData();
  console.log(`you've successfully written the CSV file, export to database`);
  mongoose.connection.close();
};

writeCSV(() => {
  console.log(`done writing CSV...`);
});

/**
 *
 *
 *
 */
// ASYNC SEEDING; USES RAW MONGOOSE INSERTMANY() QUERIES
// // let k;
// // let listings = [];
// let obj;
// // let listingcount = 0;

// const seedDatabase = async (outer, inner) => {
//   Listing.deleteMany({});
//   console.log(`deleted previous collection...`);

//   let listingcount = 0;
//   for (let i = 0; i < outer; i++) {
//     let listings = [];
//     for (let j = 0; j < inner; j++) {
//       obj = {};
//       obj.title =
//         listingAdjectives[
//           Math.floor(Math.random() * listingAdjectives.length)
//         ] +
//         " " +
//         listingStyles[Math.floor(Math.random() * listingStyles.length)] +
//         " " +
//         listingAmenities[Math.floor(Math.random() * listingStyles.length)] +
//         " " +
//         listingAmenities[Math.floor(Math.random() * listingStyles.length)];
//       obj.title = obj.title.slice(0, 1).toUpperCase() + obj.title.slice(1);
//       obj.venuetype =
//         listingType[Math.floor(Math.random() * listingType.length)];
//       obj.bedrooms = Math.floor(Math.random() * 5 + 1);
//       obj.sleepcapacity = obj.bedrooms * 2 + Math.floor(Math.random() * 3 + 1);
//       obj.bathrooms = Math.floor(Math.random() * 3 + 1);
//       obj.squarefeet = Math.floor(Math.random() * 600 + 1) * 10 + 1000;
//       obj.reviewoverview =
//         listingReview[Math.floor(Math.random() * listingReview.length)];
//       obj.rating = Math.floor(Math.random() * 10) / 10 + 4;
//       obj.reviewnumber = Math.floor(Math.random() * 200 + 15);
//       obj.owners = faker.name.findName();
//       obj.cleaningfee = Math.floor(Math.random() * 100) + 10;
//       obj.states = faker.address.state();
//       obj.city = faker.address.city();
//       // k = i + 1;
//       obj.pic = faker.image.image();
//       // let data = `${title};${venuetype};${bedrooms};${sleepcapacity};${bathrooms};${squarefeet};${reviewoverview};${rating};${reviewnumber};${owners};${cleaningfee};${states};${city};${pic}\n`;
//       listings.push(obj);
//       listingcount = listingcount + 1;
//     }
//     await Listing.insertMany(listings)
//       .then(() => {
//         console.log(`listings inserted:`, listingcount);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// };

// seedDatabase(100, 10000).then(() => {
//   mongoose.connection.close();
// });

/**
 *
 *
 *
 */
// THIS IS PRIOR TO SWITCHING TO ASYNC SEED FUNCTION

// // let k;
// let listings = [];
// let obj;
// let listingcount = 0;

// const createListings = () => {
//   for (let i = 0; i < 1000; i++) {
//     obj = {};
//     obj.title =
//       listingAdjectives[Math.floor(Math.random() * listingAdjectives.length)] +
//       " " +
//       listingStyles[Math.floor(Math.random() * listingStyles.length)] +
//       " " +
//       listingAmenities[Math.floor(Math.random() * listingStyles.length)] +
//       " " +
//       listingAmenities[Math.floor(Math.random() * listingStyles.length)];
//     obj.title = obj.title.slice(0, 1).toUpperCase() + obj.title.slice(1);
//     obj.venuetype = listingType[Math.floor(Math.random() * listingType.length)];
//     obj.bedrooms = Math.floor(Math.random() * 5 + 1);
//     obj.sleepcapacity = obj.bedrooms * 2 + Math.floor(Math.random() * 3 + 1);
//     obj.bathrooms = Math.floor(Math.random() * 3 + 1);
//     obj.squarefeet = Math.floor(Math.random() * 600 + 1) * 10 + 1000;
//     obj.reviewoverview =
//       listingReview[Math.floor(Math.random() * listingReview.length)];
//     obj.rating = Math.floor(Math.random() * 10) / 10 + 4;
//     obj.reviewnumber = Math.floor(Math.random() * 200 + 15);
//     obj.owners = faker.name.findName();
//     obj.cleaningfee = Math.floor(Math.random() * 100) + 10;
//     obj.states = faker.address.state();
//     obj.city = faker.address.city();
//     // k = i + 1;
//     obj.pic = faker.image.image();
//     // let data = `${title};${venuetype};${bedrooms};${sleepcapacity};${bathrooms};${squarefeet};${reviewoverview};${rating};${reviewnumber};${owners};${cleaningfee};${states};${city};${pic}\n`;
//     listings.push(obj);
//     listingcount = listingcount + 1;
//   }
// };

// // THIS WORKS FOR < 100K RECORDS
// const seedDatabase = () => {
//   Listing.deleteMany({});
//   Listing.insertMany(listings)
//     .then(() => {
//       mongoose.connection.close();
//     })
//     .catch(err => console.log(err));
// };

// // db.deleteMany();
// createListings();
// // db.deleteAll();
// seedDatabase();
