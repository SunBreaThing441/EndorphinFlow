const express = require("express");
const router = express.Router();

module.exports = (dbHelpers) => {
  console.log(dbHelpers);
  /* Access all practitioners */
  router.get("/", function (req, res, next) {
    dbHelpers
      .getAppointments()
      // hit this with an axios request at the get/route
      .then((result) => res.json(result))
      .catch(error => console.log(error));
      
  });
  // router.get("/:appointment_id", function (req, res, next) {
  //   const practitioners = { name: "Bob", email: "bob@email.com" };
  //   res.json(practitioners)
    
  // });

  router.post('/new', function (req, res, next) {
    dbHelpers
    .setAppointment(req.body.appointment)
    .then(res.status(200).json({}))
    .catch(error => console.log(error));
    
  })

  router.put('/:appointment_id', function (req, res, next) {
    console.log('update req.body ===', req.body)
    const appointmentId = req.params.appointment_id
    console.log('appointment id ===', appointmentId)
   
    dbHelpers
    .updateAppointment(req.body.appointment)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => console.log(error));
    
  })

  router.delete('/:appointment_id', function (req, res, next) {
    const { appointment_id } = req.params
    console.log('appointmentid from express ====', appointment_id)
    dbHelpers
    .deleteAppointment(appointment_id)
    .then(res.status(200).json({}))
    .catch(error => console.log(error));
  })

  return router;
};
