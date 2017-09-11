// const Artisan = require('Artisan');

const Task = function(attrs) {
  // Artisan.call({
  //   adapters: {
  //     client: 'HTTP',
  //     server: 'Mongo'
  //   },
  //   schema: {
  //     id: Artisan.types.ID,
  //     title: Artisan.types.String,
  //     complete: Artisan.types.Boolean
  //   }
  // });
  Object.assign(this, attrs)
}
// Task.prototype = Object.create(Artisan.prototype)
Task.prototype.constructor = Task
Task.prototype.read = function() {console.log('its getting')}
Task.prototype.create = function() {console.log('created something')}
try {
  module.exports = Task
} catch (e) {
}
