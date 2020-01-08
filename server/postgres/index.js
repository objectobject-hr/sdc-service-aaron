// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const db = require("../../dbhelpers/postgres/index.js");
// const pool = require("./pool.js");

const app = express();
const PORT = process.env.PORT || 3009;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("/dates/:id", (req, res) => {
  const id = parseInt(req.params.id);
  db.query("SELECT * FROM bookingdates WHERE id = $1", [id], (err, results) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(results.rows);
  });
});

app.get("/listings/search", (req, res) => {
  let results = [];
  db.query(
    `SELECT * FROM listings WHERE title SIMILAR TO '(${req.query.query}%|%${
      req.query.query
    }%|${req.query.query.slice(0, 1).toUpperCase() +
      req.query.query.slice(1)}%)' LIMIT 10;`,
    (err, titles) => {
      if (err) {
        res.status(404).send(err);
      }
      results.push(titles.rows);
      db.query(
        `SELECT * FROM listings WHERE city SIMILAR TO '(${req.query.query}%|%${
          req.query.query
        }%|${req.query.query.slice(0, 1).toUpperCase() +
          req.query.query.slice(1)}%)' LIMIT 10;`,
        (err, cities) => {
          if (err) {
            res.status(404).send(err);
          }
          results.push(cities.rows.slice(0, 10 - results.length));
          db.query(
            `SELECT * FROM listings WHERE states SIMILAR TO '(${
              req.query.query
            }%|%${req.query.query}%|${req.query.query
              .slice(0, 1)
              .toUpperCase() + req.query.query.slice(1)}%)' LIMIT 10;`,
            (err, states) => {
              if (err) {
                res.status(404).send(err);
              }
              results.push(states.rows);
              res
                .status(200)
                .send(results[0].concat(results[1].concat(results[2])));
            }
          );
        }
      );
    }
  );
});

app.get("/mlistings/:id", (req, res) => {
  console.log(`made it to get mlistings/:id get`);
  const id = parseInt(req.params.id);
  db.query("SELECT * FROM listings WHERE id = $1", [id], (err, results) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(results.rows);
  });
});

app.post("/mlistings", (req, res) => {
  const {
    title,
    venuetype,
    bedrooms,
    bathrooms,
    sleepcapacity,
    squarefeet,
    reviewoverview,
    rating,
    reviewnumber,
    owners,
    cleaningfee,
    states,
    city,
    pic
  } = req.body;

  db.query(
    "INSERT INTO listings (title, venuetype, bedrooms, bathrooms, sleepcapacity, squarefeet, reviewoverview, rating, reviewnumber, owners, cleaningfee, states, city, pic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;",
    [
      title,
      venuetype,
      bedrooms,
      bathrooms,
      sleepcapacity,
      squarefeet,
      reviewoverview,
      rating,
      reviewnumber,
      owners,
      cleaningfee,
      states,
      city,
      pic
    ],
    (err, results) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).send(results.rows);
    }
  );
});

app.put("/mlistings/:id", (req, res) => {
  console.log(req.body);
  const id = parseInt(req.params.id);

  const {
    title,
    venuetype,
    bedrooms,
    bathrooms,
    sleepcapacity,
    squarefeet,
    reviewoverview,
    rating,
    reviewnumber,
    owners,
    cleaningfee,
    states,
    city,
    pic
  } = req.body;

  db.query(
    "UPDATE listings SET title = $1, venuetype = $2, bedrooms = $3, bathrooms = $4, sleepcapacity = $5, squarefeet = $6, reviewoverview = $7, rating = $8, reviewnumber = $9, owners = $10, cleaningfee = $11, states = $12, city = $13, pic = $14 WHERE id = $15 RETURNING *;",
    [
      title,
      venuetype,
      bedrooms,
      bathrooms,
      sleepcapacity,
      squarefeet,
      reviewoverview,
      rating,
      reviewnumber,
      owners,
      cleaningfee,
      states,
      city,
      pic,
      id
    ],
    (err, results) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).send(results.rows);
    }
  );
});

app.delete("/mlistings/:id", (req, res) => {
  console.log(`made it to mlistings/:id delete`);
  const id = parseInt(req.params.id);
  db.query("DELETE FROM listings WHERE id = $1", [id], (err, results) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).send(results.rows);
  });
});

app.listen(PORT, () => {
  console.log("we are listening to port", PORT + ",  m o s t l y   k e y s");
});
