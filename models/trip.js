const bookshelf = require('../bookshelf');

const Trip = bookshelf.Model.extend({
  hasTimestamps: true,
  tableName: 'trips',
  user: function(){
    const User = require('./user');
    return this.belongsTo(User)
  },
  driver: function(){
    const Driver = require('./driver');
    return this.belongsTo(Driver)
  },
  vehicle: function(){
    const Vehicle = require('./vehicle');
    return this.belongsTo(Vehicle)
  },
  cancelTrip: async function(){
    const now = Date.now();
    const tripTime = new Date(this.toJSON().updated_at).getTime();
    let comparisonTime = (now - tripTime)
    comparisonTime = (comparisonTime / 1000) / 60;
    console.log(comparisonTime);
    if (this.toJSON().status == 'holding' || (this.toJSON().status == 'active' && comparisonTime <= 1.5)){
      return await this.save({status: 'canceled'},{patch: true});
    }
    return this
  }
});

module.exports = Trip;
