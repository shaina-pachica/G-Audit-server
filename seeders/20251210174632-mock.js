'use strict';

const argon2 = require("argon2");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      { name: "Owner" },
      { name: "Employee" }
    ]);

    // Hash passwords inside the async function
    const ownerPassword = await argon2.hash("owner", {
      type: argon2.argon2id,
      timeCost: 2,
      memoryCost: 2 ** 16,
      parallelism: 1,
    });

    const employeePassword = await argon2.hash("employee", {
      type: argon2.argon2id,
      timeCost: 2,
      memoryCost: 2 ** 16,
      parallelism: 1,
    });

    await queryInterface.bulkInsert('Users', [
      { name: "owner", password: ownerPassword },
      { name: "employee", password: employeePassword }
    ]);

    await queryInterface.bulkInsert('UserRoles', [
      { user_id: 1, role_id: 1 },
      { user_id: 2, role_id: 2 }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserRoles', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
