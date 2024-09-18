CREATE EXTENSION IF NOT EXISTs "uuid-ossp";


CREATE TABLE users (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_password TEXT NOT NULL
);


SELECT * FROM users;

INSERT INTO users (user_name,user_email,user_password) VALUES ('tomek', 'tomek@wp.pl', 'tomek123');

--psql -U postgres -d postgres
--\c nodejwt
--\dt du
--heroku pg:psql