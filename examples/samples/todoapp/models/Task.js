try {
  const Artisan = require('Artisan');
} catch (e) {
  console.log(Artisan)
  const Artisan = Artisan || {
    call: () => {}
  }
}


window.Task = function(attrs) {
  Artisan.call({
    adapters: {
      client: 'HTTP',
      server: 'Mongo'
    },
    schema: {
      id: Artisan.types.ID,
      title: Artisan.types.String,
      complete: Artisan.types.Boolean
    }
  });
  Object.assign(this, attrs)
}
// Task.prototype = Object.create(Artisan.prototype)
// Task.prototype.constructor = Task
window.Task.prototype.read = function() {console.log('its getting')}
window.Task.prototype.create = function() {console.log('created something')}
try {
  module.exports = window.Task
} catch (e) {
  window.Task = new Task()
}
