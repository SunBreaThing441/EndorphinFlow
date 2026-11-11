DROP TABLE IF EXISTS favourite_videos CASCADE;

CREATE TABLE favourite_videos(
    id SERIAL PRIMARY KEY NOT NULL,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    uploaded_video_id INTEGER REFERENCES uploaded_videos(id) ON DELETE CASCADE
);