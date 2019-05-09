DROP TABLE IF EXISTS "teammember";
DROP TABLE IF EXISTS "teaminvitation";
DROP TABLE IF EXISTS "teammeasure";
DROP TABLE IF EXISTS "measurement";
DROP TABLE IF EXISTS "measure";
DROP TABLE IF EXISTS "measurementuser";
DROP TABLE IF EXISTS "team";

CREATE TABLE "measurementuser"
(
  id SERIAL PRIMARY KEY,
  username varchar(64),
  email varchar(128)
);

CREATE TABLE "team"
(
  id SERIAL PRIMARY KEY,
  title varchar(128),
  info varchar(256)
);

CREATE TABLE "teammember" (
  id SERIAL PRIMARY KEY,
  is_admin BOOLEAN NOT NULL,
  team_id INTEGER REFERENCES team ON DELETE RESTRICT,
  measurementuser_id INTEGER REFERENCES measurementuser ON
DELETE RESTRICT
);


/* response: empty, accepted, declined*/
CREATE TABLE "teaminvitation" (
  id SERIAL PRIMARY KEY,
  response varchar(16) NOT NULL,
  team_id INTEGER REFERENCES team ON DELETE RESTRICT,
  inviter_id INTEGER REFERENCES measurementuser ON
DELETE RESTRICT,
  invited_id INTEGER
REFERENCES measurementuser ON
DELETE RESTRICT
);


CREATE TABLE "measure"
(
  id SERIAL PRIMARY KEY,
  measurementuser_id INTEGER,
  name varchar(128),
  type varchar(64),
  low_limit real,
  high_limit real
);

CREATE TABLE "teammeasure" (
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES team ON DELETE RESTRICT,
  measure_id INTEGER REFERENCES measure ON DELETE RESTRICT
);

CREATE TABLE "measurement" (
  id SERIAL PRIMARY KEY,
  measure_id INTEGER REFERENCES measure ON DELETE RESTRICT,
  measurementuser_id INTEGER REFERENCES measurementuser ON
DELETE RESTRICT,
  stamp timestamp,
  val real
);

