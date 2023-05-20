require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT, DB_DEPLOY } =
  process.env;

const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
});

/* const pool = new Pool({
  DB_DEPLOY,
}); */

module.exports = pool;
