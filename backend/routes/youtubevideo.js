// import searchVideo from "../controller/youtubecontroller";
const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

module.exports = () => {
  router.get("/", function (req, res, next) {
    console.log("request", req.query.search);
    google
      .youtube("v3")
      .search.list({
        key: process.env.YOUTUBE_TOKEN,
        part: "snippet",
        maxResults: 20,
        q: req.query.search,
      })
      .then((response) => {
        const { data } = response;
        let arr = [];

        data.items.forEach((item) => {
          arr.push(`https://www.youtube.com/embed/` + item.id.videoId);
          console.log(`https://www.youtube.com/embed/` + item.id.videoId);
        });
        console.log("array backend---->", arr);
        res.json({
          videos: arr,
        });
      })
      .catch((err) => console.err);
  });
  return router;
};
