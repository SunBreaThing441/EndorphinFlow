DROP TABLE IF EXISTS uploaded_videos CASCADE;

CREATE TABLE uploaded_videos(
    id SERIAL PRIMARY KEY NOT NULL,
    practitioner_id INTEGER REFERENCES practitioners(id) ON DELETE CASCADE,
    link VARCHAR(255) NOT NULL
);