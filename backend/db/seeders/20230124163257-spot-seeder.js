'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 House Lane",
          city: "Anaheim",
          state: "CA",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Totally Safe House",
          description:
            "There is nothing suspicious about this house please come stay here.",
          price: 100.0,
        },
        {
          ownerId: 2,
          address: "90 5th Ave",
          city: "NYC",
          state: "NY",
          country: "United States of America",
          lat: 40.7645358,
          lng: -60.4730327,
          name: "App Academy",
          description:
            "Abandon hope all ye who enter here.",
          price: 250.0,
        },
        {
          ownerId: 3,
          address: "321 Pixar Rd",
          city: "Anaheim",
          state: "CA",
          country: "United States of America",
          lat: 31.7645984,
          lng: -142.47335627,
          name: "House Near The Void",
          description:
            "This is a sample description of what this building will be like",
          price: 100.0,
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        country: {
          [Op.in]: ["United States of America"],
        },
      },
      {}
    );
  },
};