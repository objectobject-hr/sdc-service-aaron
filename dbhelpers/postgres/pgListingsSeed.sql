\c sdc_pg;

COPY listing
FROM '/Users/aaronsouthammavong/hrla/sdc-service-aaron/dbhelpers/mongodb/mongoListings.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX listing_title_index ON listing (title varchar_pattern_ops);
CREATE INDEX listing_states_index ON listing (states varchar_pattern_ops);
CREATE INDEX listing_city_index ON listing (city varchar_pattern_ops);
CREATE INDEX listing_table_id_index ON listing (id);