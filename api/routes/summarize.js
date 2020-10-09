const express = require("express");
const request = require("request");

require("dotenv").config();

const router = express.Router();

//Get summary of terms of service or privacy policy from a URL
router.post("/", async (req, res) => {
  const { url, sentences } = req.body;

  const options = {
    method: "GET",
    url:
      "https://meaningcloud-summarization-v1.p.rapidapi.com/summarization-1.0",
    qs: {
      url,
      sentences,
    },
    headers: {
      "x-rapidapi-host": "meaningcloud-summarization-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.APIKEY,
      accept: "application/json",
      useQueryString: true,
    },
  };

  request(options, function (error, response, body) {
    if (error) {
      return res.status(500).json({
        message: "Something went wrong",
        error: error.toString(),
      });
    }

    let summary = JSON.parse(body);
    res.status(200).json({ summary: summary.summary });
  });
});

module.exports = router;
