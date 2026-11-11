DROP TABLE IF EXISTS uploaded_blogs CASCADE;

CREATE TABLE uploaded_blogs(
    id SERIAL PRIMARY KEY NOT NULL,
    practitioner_id INTEGER REFERENCES practitioners(id) ON DELETE CASCADE,
    link VARCHAR(255) NOT NULL
);