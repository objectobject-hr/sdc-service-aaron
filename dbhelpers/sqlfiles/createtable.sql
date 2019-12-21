DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS dates;

CREATE TABLE listings (
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
);


CREATE TABLE dates (
  id serial primary key,
  dates varchar(355),
  available BOOLEAN not null,
  checkin BOOLEAN not null,
  rate varchar(355),
  checkout BOOLEAN not null,
  listingid int
);