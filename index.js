const express = require("express");
const bodyParser = require("body-parser");
const webpush = require("web-push");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const publicVapidKey =
  "BJ2TBvZx9d95NVO_lBj4uekE3mhaZJAJH4JX4BG98lcM4EvPNIE8JTuNC3cVwZ-yg1m5N4E-b6m9QfUi6-NVx-c";
const privateVapidKey = "xExVFMzHHk0xO6aaTMXAaPql8iqr1HWsOE5aAOk1p8c";

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  publicVapidKey,
  privateVapidKey,
);

let subscriptions = [];

app.post("/subscribe", (req, res) => {
  console.log(req.body)
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: "Subscribed successfully!" });

  const payload = JSON.stringify({
    title: "Welcome!",
    body: "Thank you for subscribing to our notifications.",
  });
  webpush
    .sendNotification(subscription, payload)
    .catch((error) => console.error(error));
  setInterval(() => {
    const weather = JSON.stringify({
      title: "Weather Alert!",
      body: "This is the weather alert.",
    });
    webpush
      .sendNotification(subscription, weather)
      .catch((error) => console.error(error));
  }, 20000);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
