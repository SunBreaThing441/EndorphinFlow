const express = require("express");
const router = express.Router();

module.exports = (dbHelpers) => {
  console.log(dbHelpers);
  /* Access all patients */
  router.get("/", function (req, res, next) {
    dbHelpers
      .getPatients()
      // hit this with an axios request at the get/route
      .then((result) => res.json(result));
  });
  router.get("/:patient_id", function (req, res, next) {
    const patients = { name: "Bob", email: "bob@email.com" };
    res.json(patients);
  });
  return router;
};
