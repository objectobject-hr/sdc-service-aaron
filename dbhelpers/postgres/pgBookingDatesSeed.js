const { Pool, Client } = require("pg");
const connectLocation = "postgres://localhost:5432/sdc_pg";
const path = require("path");
const db = require("./index.js");
const fs = require("fs");

const file = path.join(__dirname, "pgBookingDates.csv");
const stream = fs.createWriteStream(file);

// const header = "date,available,checkin,rate,checkout,listingid\n";
// stream.write(header, "utf8");

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

// USING CSV-WRITER
// const csvStringifier = createCsvStringifier({
//   header: [
//     { id: "date", title: "date" },
//     { id: "available", title: "available" },
//     { id: "checkin", title: "checkin" },
//     { id: "rate", title: "rate" },
//     { id: "checkout", title: "checkout" },
//     { id: "listingid", title: "listingid" }
//   ]
// });

let bookingDates = [];
let data;
var increment = 10000271;
let date;
let available;
let checkin;
let checkout;
let rate;
let listingid;

writeCSV = async () => {
  for (let i = 0; i < years.length; i++) {
    for (let j = 0; j < datesInMonths.length; j++) {
      for (let k = 0; k < datesInMonths[j]; k++) {
        for (let l = 1; l < 13700; l++) {
          date = years[i] + "-" + months[j] + "-" + dates[k];
          available = true;
          checkin = false;
          checkout = false;
          rate = Math.floor(Math.random() * 750 + 50);
          listingid = l;

          data = `${date},${available},${checkin},${rate},${checkout},${listingid}\n`;
          let ok = true;
          function generateData() {
            if (increment === 0) {
              stream.write(data); // needs callback as a parameter to write() (inherited method of fs)
            } else {
              increment--;
              if (increment % 10000 === 0) {
                console.log(increment);
              }
              ok = stream.write(data);
            }
          }
          // do {
          if (l > 0 && ok) {
            generateData();
          }
          // } while (l > 0 && ok);
        }
      }
    }
    if (i > 0) {
      stream.once("drain", generateData);
    }
  }
  // await mongoose.connection.close();
  console.log(`you've successfully written the CSV file, export to database`);
  stream.end(err => {
    console.log(`ended stream`);
    if (err) {
      console.log(err);
    } else {
      db.query(
        `COPY bookingdates FROM '/Users/aaronsouthammavong/hrla33/sdc-service-aaron/dbhelpers/postgres/pgBookingDates.csv' DELIMITER ',' CSV`
      )
        .then(() => {
          db.query(`ALTER TABLE bookingdates ADD id serial;`);
          console.log(`successfully seeded database`);
          // db.end();
        })
        .then(() => {
          db.query(`create index idx_bookingdates_id on bookingdates(id);`);
          console.log(`indexed id`);
        })
        .catch(err => {
          throw err;
        });
    }
  });
};

writeCSV();

// writeCSV(() => {
//   console.log(`you're seeding CSV...`);
//   stream.end(err => {
//     console.log(`ended stream`);
//     if (err) {
//       console.log(err);
//     } else {
//       db.query(
//         `COPY bookingdates FROM '/Users/aaronsouthammavong/hrla33/sdc-service-aaron/dbhelpers/postgres/pgBookingDates.csv' DELIMITER ',' CSV`
//       )
//         .then(() => {
//           console.log(`successfully seeded database`);
//           db.end();
//         })
//         .catch(err => {
//           throw err;
//         });
//     }
//   });
// });
