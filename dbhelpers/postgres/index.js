const { Pool, Client } = require("pg");
const connectionLocation = "postgres://localhost:5432/sdc_pg";
// const createDB = require("./index");

const db = new Client({
  connectionString: connectionLocation
});

db.connect()
  .then(() => {
    console.log(`we are now connected to  m o s t l y   k e y s`);
  })
  .then(() => {
    // id serial primary key,
    db.query(
      `CREATE TABLE IF NOT EXISTS bookingdates (
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
    // id serial primary key,
    db.query(
      `CREATE TABLE IF NOT EXISTS listings (
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
