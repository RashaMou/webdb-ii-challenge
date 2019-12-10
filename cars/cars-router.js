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

router.put("/:id", (req, res) => {
  const carUpdate = req.body;

  knex("cars")
    .where({ id: req.params.id })
    .update(carUpdate)
    .then(count => {
      if (count > 0) {
        res.status(201).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json("Record not found");
      }
    })
    .catch(error => {
      res.status(500).json("Error updating record");
    });
});

router.delete("/:id", (req, res) => {
  knex("cars")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted` });
    })
    .catch(error => {
      res.status(500).json({ message: "error deleting the car" });
    });
});

module.exports = router;
