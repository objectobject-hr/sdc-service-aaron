\c sdc_pg;

COPY bookingdate
FROM '/Users/aaronsouthammavong/hrla/sdc-service-aaron/dbhelpers/mongodb/mongoBookingDates.csv'
DELIMITER ',' CSV HEADER;

CREATE INDEX listingid_index ON bookingdate (listingid);