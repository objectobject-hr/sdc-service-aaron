// jshint esversion:6
const faker = require("faker");
// const BookingDate = require("./models").BookingDate;
// const Listing = require("./models").Listing;
// const pgp = require("pg-promise");
const { Pool, Client } = require("pg");
const connectLocation = "postgres://localhost:5432/sdc_pg";
const path = require("path");
const db = require("./index.js");
const fs = require("fs");

const file = path.join(__dirname, "pglistings.csv");
const string = "";
const stream = fs.createWriteStream(file);

// const header =
//   "title;venuetype;bedrooms;sleepcapacity;bathrooms;squarefeet;reviewoverview;rating;reviewnumber;owners;cleaningfee;states;city;pic;listingid\n";
// stream.write(header, "utf8");

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

months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12"
];

datesInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
years = [2019, 2020];

dates = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31"
];

writeCSV = callback => {
  let i = 1000000;

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
      // let listingid = i;
      let data = `${title};${venuetype};${bedrooms};${sleepcapacity};${bathrooms};${squarefeet};${reviewoverview};${rating};${reviewnumber};${owners};${cleaningfee};${states};${city};${pic}\n`;

      if (i === 0) {
        stream.write(data, callback);
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
};

writeCSV(() => {
  console.log(`you're seeding CSV...`);
  stream.end(err => {
    console.log(`ended stream`);
    if (err) {
      console.log(err);
    } else {
      db.query(
        `COPY listings FROM '/Users/aaronsouthammavong/hrla33/sdc-service-aaron/dbhelpers/postgres/pglistings.csv' DELIMITER ';' CSV`
      )
        .then(() => {
          db.query(`ALTER TABLE listings ADD id serial;`);
          console.log(`successfully seeded database`);
          // db.end();
        })
        .then(() => {
          db.query(`create index idx_listings_listingid on listings(id);`);
          console.log(`indexed id`);
        })
        .catch(err => {
          throw err;
        });
    }
  });
});

// seedDB(stream);

// console.log(`wrote CSV`);

// writeCSV(() => {
//   console.log(`you're writing to database`);
//   stream.end(err => {
//     if (err) {
//       console.log(err);
//     } else {
//       db.query(`COPY listings FROM './listings.csv' DELIMITER ',' CSV HEADER`)
//         .then(() => {
//           console.log(`successfully wrote to database`);
//           db.end();
//         })
//         .catch(err => {
//           throw err;
//         });
//     }
//   });
// });

// generateBookingDates = async listing_id => {
//   let datecount = 0;
//   let bookingDates = [];
//   let date;
//   for (let i = 0; i < years.length; i++) {
//     for (let j = 0; j < datesInMonths.length; j++) {
//       for (let k = 0; k < datesInMonths[j]; k++) {
//         for (let l = 1; l < 101; l++) {
//           date = years[i] + "-" + months[j] + "-" + dates[k];
//           // date = "2020-09-17";
//           bookingDates.push({
//             date,
//             available: true,
//             checkin: false,
//             checkout: false,
//             rate: Math.floor(Math.random() * 750 + 50),
//             listingid: l
//           });
//           datecount++;
//         }
//       }
//     }
//   }

//   // using vanilla Postgres...
//   try {
//     // console.log(`connected under generateBookings()`);
//     for (var i = 0; i < bookingDates.length; i++) {
//       await db
//         .query(
//           `INSERT INTO dates (date, available, checkin, checkout, rate, listingid) VALUES ('${bookingDates[i].date}', '${bookingDates[i].available}', '${bookingDates[i].checkin}', '${bookingDates[i].checkout}', '${bookingDates[i].rate}', '${bookingDates[i].listingid}')`
//         )
//         .then(res => console.log(i))
//         .catch(err => console.log(err, "error"));
//     }
//   } catch (error) {
//     console.log(`can't seed: ${error}`);
//   } finally {
//     // await db.end(); // close connection
//     console.log(`disconnected from db`);
//   }

//   // using Sequelize on MySQL...
//   // await BookingDate.sync({ force: true })
//   //   .then(() => BookingDate.bulkCreate(bookingDates, { validate: true }))
//   //   .then(() => console.log("Created " + datecount + " bookings."))
//   //   .catch(err => console.log("failed to create bookings", err));
//   // await db.none()
// };

// generateListings = async () => {
//   let k;
//   let listings = [];
//   let obj;
//   let listingcount = 0;
//   for (let i = 0; i < 1000000; i++) {
//   obj = {};
//   let title =
//     listingAdjectives[Math.floor(Math.random() * listingAdjectives.length)] +
//     " " +
//     listingStyles[Math.floor(Math.random() * listingStyles.length)] +
//     " " +
//     listingAmenities[Math.floor(Math.random() * listingStyles.length)] +
//     " " +
//     listingAmenities[Math.floor(Math.random() * listingStyles.length)];
//   obj.title = title.slice(0, 1).toUpperCase() + title.slice(1);
//   obj.venuetype = listingType[Math.floor(Math.random() * listingType.length)];
//   obj.bedrooms = Math.floor(Math.random() * 5 + 1);
//   obj.sleepcapacity = obj.bedrooms * 2 + Math.floor(Math.random() * 3 + 1);
//   obj.bathrooms = Math.floor(Math.random() * 3 + 1);
//   obj.squarefeet = Math.floor(Math.random() * 600 + 1) * 10 + 1000;
//   obj.reviewoverview =
//     listingReview[Math.floor(Math.random() * listingReview.length)];
//   obj.rating = Math.floor(Math.random() * 10) / 10 + 4;
//   obj.reviewnumber = Math.floor(Math.random() * 200 + 15);
//   obj.owners = faker.name.findName();
//   obj.cleaningfee = Math.floor(Math.random() * 100) + 10;
//   obj.states = faker.address.state();
//   obj.city = faker.address.city();
//   // k = i + 1;
//   obj.pic = faker.image.image();
//   listings.push(obj);
//   listingcount = listingcount + 1;
// }

//   // using vanilla Postgres...
//   try {
//     // console.log(`connected under generateBookings()`);
//     for (var i = 0; i < listings.length; i++) {
//       await db
//         .query(
//           `INSERT INTO listings (title, venuetype, bedrooms, sleepcapacity, bathrooms, squarefeet, reviewoverview, rating, reviewnumber, owners, cleaningfee, states, city, pic) VALUES ($$${listings[i].title}$$, $$${listings[i].venuetype}$$, $$${listings[i].bedrooms}$$, $$${listings[i].sleepcapacity}$$, $$${listings[i].bathrooms}$$, $$${listings[i].squarefeet}$$, $$${listings[i].reviewoverview}$$, $$${listings[i].rating}$$, $$${listings[i].reviewnumber}$$, $$${listings[i].owners}$$, $$${listings[i].cleaningfee}$$, $$${listings[i].states}$$, $$${listings[i].city}$$, $$${listings[i].pic}$$)`
//         )
//         .then(res => console.log(i))
//         .catch(err => console.log(err, "error"));
//     }
//   } catch (error) {
//     console.log(`can't seed: ${error}`);
//   } finally {
//     await db.end(); // close connection
//     console.log(`disconnected from db`);
//   }

//   // using Sequelize on MySQL...
//   // console.log(listings);
//   // await Listing.sync({ force: true })
//   //   .then(() => Listing.bulkCreate(listings, { validate: true }))
//   //   .then(() => console.log("Created " + listingcount + " listings."))
//   //   .catch(err => console.log("failed to create listings", err));
// };

// generateBookingDates();
// generateListings();
