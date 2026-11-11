DROP TABLE IF EXISTS practitioners CASCADE;

CREATE TABLE practitioners(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    picture VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL,
    available SMALLINT,
    information VARCHAR(1000) NOT NULL,
    cost VARCHAR(255) NOT NULL,
    treatmenttype VARCHAR(255) NOT NULL,
    clientfocus VARCHAR(255) NOT NULL,
    school VARCHAR(255) NOT NULL
);