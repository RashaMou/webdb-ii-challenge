const express = require("express");
const router = express.Router();
const knex = require("../data/dbConfig");

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      res.status(500).json("Error retrieving cars");
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  knex("cars")
    .insert(carData, "id")
    .then(ids => {
      const id = ids[0];
      knex("*")
        .from("cars")
        .where({ id })
        .first()
        .then(car => {
          res.status(201).json(car);
        })
        .catch(error => {
          res.status(500).json("Error retrieving car with specified id");
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json("Error adding car");
    });
});

module.exports = router;
