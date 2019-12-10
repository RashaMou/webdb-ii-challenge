exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        { VIN: "1111111", make: "Mazda3", mileage: 40000 }
      ]);
    });
};
