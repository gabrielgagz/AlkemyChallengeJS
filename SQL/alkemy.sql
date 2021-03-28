CREATE DATABASE finances WITH OWNER alkemy;

CREATE TABLE users (
  user_id INTEGER NOT NULL,
  user_firstname VARCHAR(50) NOT NULL,
  user_lastname VARCHAR(50) NOT NULL,
  user_nickname VARCHAR(50) NOT NULL,
  user_profilepic VARCHAR(250) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE movements (
  movement_id INTEGER NOT NULL,
  movement_date TIMESTAMP NOT NULL,
  movement_type VARCHAR(50) NOT NULL,
  movement_amount BIGINT NOT NULL,
  movement_userid INTEGER NOT NULL,
  PRIMARY KEY (movement_id),
  FOREIGN KEY (movement_userid) REFERENCES users(user_id)
);
