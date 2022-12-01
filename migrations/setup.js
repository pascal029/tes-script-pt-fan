const { pool } = require("../config/");

const tableUser = `CREATE TABLE IF NOT EXISTS "Users"(
    "id" SERIAL PRIMARY KEY,
    "nama" VARCHAR(120) NOT NULL,
    "email" VARCHAR(120) NOT NULL,
    "npp" VARCHAR(10) NOT NULL,
    "npp_supervisor" VARCHAR(10) NULL,
    "password" VARCHAR(100) NOT NULL
)`;

const tableEpresence = `CREATE TABLE IF NOT EXISTS "Epresence"(
    "id" SERIAL PRIMARY KEY,
    "id_users" INTEGER REFERENCES "Users"(id),
    "type" VARCHAR(3) NOT NULL,
    "is_approve" BOOLEAN NOT NULL DEFAULT FALSE,
    "waktu" VARCHAR(50) NOT NULL
)`;

pool.query(tableUser, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log("success create table Users");
    pool.query(tableEpresence, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success create table Epresence");
      }
    });
  }
});
