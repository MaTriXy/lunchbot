"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('LunchTemplates', 'args', DataTypes.STRING);
    migration.addColumn('LunchTemplates', 'canceled', DataTypes.BOOLEAN);
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('LunchTemplates', 'args');
    migration.removeColumn('LunchTemplates', 'canceled');
    done();
  }
};
