'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://charlotte.axios.com/wp-content/uploads/2022/11/435-Beaumont-Ave-exterior.jpg",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://charlotte.axios.com/wp-content/uploads/2022/11/435-Beaumont-Ave-living-room.jpg",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://charlotte.axios.com/wp-content/uploads/2022/11/435-Beaumont-Ave-kitchen.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/eRV3EtGh3sdmhslYqSacyg/o.jpg",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://s3-media0.fl.yelpcdn.com/bphoto/u3RjQ0E6K8viHxse8qkKjw/o.jpg",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://commercialobserver.com/wp-content/uploads/sites/3/2015/04/90-fifth-avenue.jpg?quality=80&w=370",
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://charlotte.axios.com/wp-content/uploads/2022/11/1820-Herrin-Ave-exterior.jpg',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://charlotte.axios.com/wp-content/uploads/2022/11/1820-Herrin-Ave-living-room.jpg',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://charlotte.axios.com/wp-content/uploads/2022/11/1820-Herrin-Ave-kitchen.jpgg',
          preview: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        preview: {
          [Op.in]: [true, false],
        },
      },
      {}
    );
  },
};