import socketio from 'socketio'


class Socket {

    constructor(config) {
        Object.assign(this, config)
        this.sockets = socketio.connection().subscribe(this.klass)
    }

    async create(dataArray) {
        return await this.sockets.set(dataArray)
    }

    async read(queryArray) {
        return await this.sockets.get(queryArray)
    }

    async update(queryArray, dataArray) {
        return await this.sockets.put(queryArray, dataArray)
    }

    async delete(queryArray) {
        return await this.sockets.del(queryArray)
    }

}