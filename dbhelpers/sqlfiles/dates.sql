DROP TABLE IF EXISTS dates;

CREATE TABLE dates(
  id serial primary key,
  dates varchar(200),
  available BOOLEAN not null,
  check_in BOOLEAN not null,
  rate float,
  check_out BOOLEAN not null,
  listing_id int
)