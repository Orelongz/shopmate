module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn(
        'customer',
        'facebook_id',
        {
          type: Sequelize.STRING
        }
      );
      await queryInterface.addColumn(
        'customer',
        'google_id',
        {
          type: Sequelize.STRING
        }
      );
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface) => {
    try {
      await queryInterface.removeColumn('customer', 'facebook_id');
      await queryInterface.removeColumn('customer', 'google_id');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
