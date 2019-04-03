exports.seed = function(knex, Promise) {
  return knex("cohorts").insert([
    { name: "Dragon Gang" },
    { name: "Slick Paradise Bullies" },
    { name: "Uniformed Creeps" }
  ]);
};
