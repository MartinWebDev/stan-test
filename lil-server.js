const express = require("express");
const cors = require("cors");
const showData = require("./data/shows.json");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

//////////////////////
// Helper functions //
//////////////////////

// Random delay time in whole seconds between 1 and 5
const getRandomDelay = () => {
  const time = Math.ceil((Math.random() * 4000) / 1000) * 1000;
  console.log("Delay time:", time)
  return time;
};

// Random chance of error to demonstrate client side error handling
const shouldCrash = () => {
  const should = Math.random() < 0.1; // 1/10 should be enough. Didn't want it to happen too often, but also not take 100 reloads to get it. Feel free to move this value around if you want errors to happen more or less often.
  console.log(should ? "Server crash set for this request" : "Continue request");
  return should;
};

////////////
// Routes //
////////////

app.get("/getShows", (req, res) => {
  if (shouldCrash()) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  setTimeout(() => {
    return res.status(200).json(showData);
  }, getRandomDelay());
});

app.get("/getShowById", (req, res) => {
  if (shouldCrash()) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  const showId = req.query.showId;
  if (!showId || !parseInt(showId)) return res.status(400).json({ message: "Show ID not included in querystring" });

  const show = showData.find((x) => x.id === parseInt(showId));
  if (!show) return res.status(404).json({ message: "Show not found" });

  setTimeout(() => {
    return res.status(200).json(show);
  }, getRandomDelay());
});

/////////////////
// Make it go! //
/////////////////

app.listen(4000, () => {
  console.log("Ol' faithful is runnin'");
});
