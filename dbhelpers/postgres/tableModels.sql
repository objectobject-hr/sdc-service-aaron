DROP DATABASE IF EXISTS sdc_pg;

CREATE DATABASE sdc_pg
  OWNER = student
  ENCODING = 'UTF8'
  CONNECTION LIMIT = 25;

\c sdc_pg;

CREATE TABLE BookingDate (
  id serial NOT NULL,
  date VARCHAR,
  available BOOLEAN NOT NULL,
  checkin BOOLEAN NOT NULL,
  rate NUMERIC(10, 2),
  checkout BOOLEAN NOT NULL,
  listingid INT
)

CREATE TABLE Listing (
  id serial PRIMARY KEY,
  title VARCHAR,
  venuetype VARCHAR,
  bedrooms INT,
  bathrooms INT,
  sleepcapacity INT,
  squarefeet INT,
  reviewoverview VARCHAR,
  rating NUMERIC(10, 2),
  reviewnumber INT,
  owners VARCHAR,
  cleaningfee NUMERIC(10, 2),
  states VARCHAR,
  city VARCHAR,
  pic VARCHAR,
  listingid INT
)

ALTER SEQUENCE listingid_seq RESTART WITH 10000001;