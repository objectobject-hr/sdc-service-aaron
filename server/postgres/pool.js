const Pool = require("pg").Pool;
const pool = new Pool({
  user: "student",
  host: "localhost",
  database: "sdc_pg",
  // password: 'postgres',
  port: 5432
});

module.exports = pool;
