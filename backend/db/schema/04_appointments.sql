DROP TABLE IF EXISTS appointments CASCADE;

CREATE TABLE appointments(
    id SERIAL PRIMARY KEY NOT NULL,
    practitioner_id INTEGER REFERENCES practitioners(id) ON DELETE CASCADE,
    patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    start_date VARCHAR(255) NOT NULL,
    end_date VARCHAR(255) NOT NULL
);