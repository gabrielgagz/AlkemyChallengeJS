CREATE TABLE users (
  user_id SERIAL NOT NULL,
  user_email VARCHAR(25) NOT NULL,
  user_firstname VARCHAR(25) NOT NULL,
  user_lastname VARCHAR(25) NOT NULL,
  user_nickname VARCHAR(25) NOT NULL,
  user_password VARCHAR(8) NOT NULL,
  user_profilepic VARCHAR(250) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE movements (
  movement_id SERIAL NOT NULL,
  movement_amount BIGINT NOT NULL,
  movement_date TIMESTAMP NOT NULL,
  movement_description VARCHAR(25) NOT NULL,
  movement_type VARCHAR(10) NOT NULL,
  movement_userid INTEGER NOT NULL,
  PRIMARY KEY (movement_id),
  FOREIGN KEY (movement_userid) REFERENCES users(user_id)
);
