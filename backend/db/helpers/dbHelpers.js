module.exports = (db) => {
  const getPractitioners = (email) => {
    const query = {
      text: `SELECT practitioners.id, first_name, last_name, email, specialty, picture, information, cost, treatmenttype,clientfocus, school, available FROM users JOIN practitioners ON users.id = user_id`,
    };
    console.log(query);

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getPatients = (email) => {
    const query = {
      text: `SELECT patients.id, first_name, last_name, age, disease, available, picture, information, gender, city FROM users JOIN patients ON users.id = user_id`,
    };
    console.log(query);

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getAppointments = (email) => {
    const query = {
      text: `SELECT * FROM appointments`,
    };
    console.log(query);

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const setAppointment = (appointment) => {
    const query = {
      text: `INSERT into appointments(title, practitioner_id, start_date, end_date )
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      values: [
        appointment.title,
        appointment.ownerId,
        appointment.startDate,
        appointment.endDate,
      ],
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const updateAppointment = (appointment, appointment_id) => {
    console.log('++++++', appointment, appointment_id);
    const query = {
      text: `UPDATE appointments SET title = $1, practitioner_id = $2, start_date = $3, end_date = $4
      WHERE id = $5`,
      values: [
        appointment.title,
        appointment.ownerId,
        appointment.startDate,
        appointment.endDate,
        appointment.id,
      ],
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => console.log('error=====', err));
  };

  const deleteAppointment = (appointment) => {
    console.log('appointments delete=', appointment);
    const query = {
      text: `DELETE FROM appointments WHERE id = $1`,
      values: [appointment],
    };
    console.log('delete query = ', query);
    return db
      .query(query)
      .then((result) => {
        result.rows;
        console.log('result.rows=', result.rows);
      })
      .catch((err) => err);
  };
  return {
    getAppointments,
    getPatients,
    getPractitioners,
    setAppointment,
    updateAppointment,
    deleteAppointment,
  };
};
