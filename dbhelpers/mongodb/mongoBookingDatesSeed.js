// USING CSV-WRITER LIBRARY...
// const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;// using csv-writer

const mongoose = require("mongoose"); // only necessary if we plan to seed CSV directly into MongoDB
// const db = require("./index.js");

// USING CSV-WRITER
// const fs = require("fs");
// const file = fs.createWriteStream(
//   "../../dbhelpers/mongodb/mongoBookingDates.csv"
// );

const path = require("path");
const fs = require("fs");
const file = path.join(__dirname, "mongoBookingDates.csv");
const stream = fs.createWriteStream(file);

const header = "date,available,checkin,rate,checkout,listingid\n";
stream.write(header, "utf8");

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
// let date;
let data;
var increment = 0;
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

          data = `${date},${available},${checkin},${checkout},${rate},${listingid}\n`;
          let ok = true;
          function generateData() {
            if (l === 0) {
              stream.write(data); // needs callback as a parameter to write() (inherited method of fs)
            } else {
              increment++;
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
};

writeCSV(() => {
  console.log(`done writing CSV...`);
});
// .then(() => mongoose.connection.close())
// .catch(err => mongoose.connection.close());

// THIS CAN SEED 73,000 DATES USING CSV-WRITER
// const writeCSV = async () => {
// let bookingDates = [];
// let date;

// function generateData() {
//   let increment;
//   for (let i = 0; i < years.length; i++) {
//     for (let j = 0; j < datesInMonths.length; j++) {
//       for (let k = 0; k < datesInMonths[j]; k++) {
//         for (let l = 1; l < 101; l++) {
//           date = years[i] + "-" + months[j] + "-" + dates[k];
//           bookingDates.push({
//             date,
//             available: true,
//             checkin: false,
//             checkout: false,
//             rate: Math.floor(Math.random() * 750 + 50),
//             listingid: l
//           });
//           // console.log(increment); // log which record number currently working
//           increment++; // increment record number
//           // if (increment % 1000 === 0) {
//           //   console.log(increment);
//           // }
//         }
//       }
//     }
//   }
// }
//   await generateData();
//   await file.write(csvStringifier.stringifyRecords(bookingDates));
//   mongoose.connection.close(); // only necessary if we need to seed directly into MongoDB
// };

// const asyncWrite = async () => {
//   await writeCSV();
//   console.log(`successfully wrote booking dates to CSV file`);
// };

// file.write(csvStringifier.getHeaderString()); // writes the CSV header row
// asyncWrite();
