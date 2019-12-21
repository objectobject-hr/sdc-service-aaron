const { Pool, Client } = require("pg");
const connectionLocation = "postgres://localhost:5432/sdc_pg";
const createDB = require("./");

const db = new Client({
  connectionString: connectionLocation
});

db.connect()
  // .then(obj => {
  //   // Can check the server version here (pg-promise v10.1.0+):
  //   // const serverVersion = obj.client.serverVersion;
  //   console.log(`we are now connected to  l e w d   b e a t s`);
  //   obj.done(); // success, release the connection;
  // })
  .then(() => {
    console.log(`we are now connected to  m o s t l y   k e y s`);
  })
  .then(() => {
    db.query("DROP TABLE IF EXISTS listings");
  })
  .then(() => {
    db.query("DROP TABLE IF EXISTS dates");
  })
  .then(() => {
    db.query(
      `CREATE TABLE dates (
        id serial primary key,
        date varchar(355),
        available BOOLEAN not null,
        checkin BOOLEAN not null,
        rate varchar(355),
        checkout BOOLEAN not null,
        listingid int
      )`
    );
  })
  .then(() => {
    db.query(
      `CREATE TABLE listings (
        id serial primary key,
        title varchar(355),
        venuetype varchar(355),
        bedrooms int,
        bathrooms int,
        sleepcapacity int,
        squarefeet int,
        reviewoverview varchar(355),
        rating varchar(355),
        reviewnumber int,
        owners varchar(355),
        cleaningfee varchar(355),
        states varchar(355),
        city varchar(355),
        pic varchar(355)
      )`
    );
  })
  .catch(error => {
    console.log("ERROR:", error.message || error);
  });

module.exports = db;
