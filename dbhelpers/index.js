// const pgp = require('pg-promise')({});
// const db = pgp(connectionString);
// module.exports = db;
const promise = require("bluebird"); // best promise library today
const pgPromise = require("pg-promise"); // pg-promise core library
const initOptions = {
  // Use a custom promise library, instead of the default ES6 Promise:
  promiseLib: promise
};
const pgp = pgPromise(initOptions);

const connection = {
  // host: "localhost", // server name or IP address;
  database: "sdc_pg",
  // port: 3009,
  user: "student"
};
// const connectionString = 'postgres://localhost:5432/sdc_pg';
// Creating the database instance:
const db = pgp(connection);

db.connect()
  .then(obj => {
    // Can check the server version here (pg-promise v10.1.0+):
    // const serverVersion = obj.client.serverVersion;
    console.log(`we are now connected to  l e w d   b e a t s`);
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log("ERROR:", error.message || error);
  });

// db.none("CREATE DATABASE $1:name", "sdc_postgres")
//   .then(data => {
//     console.log("created new database");
//   })
//   .catch(error => {
//     // console.log(error);
//     console.log(`you're in .catch dbhelper index.js`);
//     console.log(error);
//   });

module.exports = { db, pgp };
