try {
    Artisan = require('../../src/lib/Artisan')
} catch (error) {
    console.error(error.toString())
}

class Task extends Artisan {

    constructor(attrs) {
        super({
            adapters: {
                client: 'NOOP',
                server: 'NOOP'
            },
            schema: {
                title: Artisan.types.String,
                complete: Artisan.types.String
            }
        })

        Object.assign(this, attrs)
    }

    beforeCreate() {

    }

}


if (Artisan.environment() === 'SERVER') {
    module.exports = Task
} else {
    window.Task = Task
}
