exports.up = function(knex) {
  return knex.schema.createTable("sales", tbl => {
    tbl.increments();
    tbl.foreign("car_id").references("cars.id");
    // .notNullable();
  });
};

exports.down = function(knex) {};
