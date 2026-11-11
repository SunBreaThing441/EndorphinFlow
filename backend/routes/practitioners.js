const express = require("express");
const router = express.Router();

module.exports = (dbHelpers) => {
  console.log(dbHelpers);
  /* Access all practitioners */
  router.get("/", function (req, res, next) {
    dbHelpers
      .getPractitioners()
      // hit this with an axios request at the get/route
      .then((result) => res.json(result));
  });
  router.get("/:practitioner_id", function (req, res, next) {
    const practitioners = { name: "Bob", email: "bob@email.com" };
    res.json(practitioners);
  });
  return router;
};
