const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  database: "test-backend-pt-fan",
  host: "localhost",
  port: 5432,
  connectionTimeoutMillis: 1000,
  idleTimeoutMillis: 2000,
  max: 20,
});

module.exports = { pool };
