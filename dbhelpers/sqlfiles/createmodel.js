const promise = require("bluebird"); // best promise library today
const pgp = require("pg-promise")({ promiseLib: promise });
const sql = require("./index.js");
const path = require("path");

async function createModel() {
  const connectionStringPg = "postgres://localhost:5432/postgres";
  const connectionString = "postgres://localhost:5432/sdc_pg";
  const dbPG = pgp(connectionStringPg);
  const createDBFullPath = path.join(__dirname, "./createdb.sql");
  const createSchemaFullPath = path.join(__dirname, "./createtable.sql");
  // const sqlDropDB = sql(dropDBFullPath);
  const sqlCreateDB = sql(createDBFullPath);
  // console.log(sqlCreateDB);
  const sqlCreateSchema = sql(createSchemaFullPath);
  // console.log(sqlCreateSchema);
  try {
    await dbPG.none(sqlCreateDB);
    console.log("done creating db");
  } catch (error) {
    console.log(`error creating db: ${error}`);
  } finally {
    try {
      const dbPgSdc = pgp(connectionString);
      await dbPgSdc.none(sqlCreateSchema);
      console.log("done creating schema");
    } catch (error) {
      console.log(`error creating schema: ${error}`);
    }
  }
}
createModel();
