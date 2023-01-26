'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 3,
          startDate: new Date(2022, 0, 3),
          endDate: new Date(2022, 0, 6),
        },
        {
          spotId: 2,
          userId: 3,
          startDate: new Date(2022, 0, 10),
          endDate: new Date(2022, 0, 17),
        },
        {
          spotId: 1,
          userId: 2,
          startDate: new Date(2022, 0, 10),
          endDate: new Date(2022, 0, 15),
        },
        {
          spotId: 2,
          userId: 1,
          startDate: new Date(2023, 1, 3),
          endDate: new Date(2023, 1, 10),
        },

        {
          spotId: 1,
          userId: 3,
          startDate: new Date(2023, 1, 15),
          endDate: new Date(2023, 1, 16),
        },
        {
          spotId: 1,
          userId: 1,
          startDate: new Date(2024, 1, 15),
          endDate: new Date(2024, 1, 16),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        startDate: {
          [Op.startsWith]: ['20%'],
        },
      },
      {}
    );
  },
};