require("dotenv").config({ path: "../.env" });
const { Pool } = require("pg");

const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT } = process.env;

const pool = new Pool({
  user: PGUSER,
  host: PGHOST,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
});

module.exports = pool;
