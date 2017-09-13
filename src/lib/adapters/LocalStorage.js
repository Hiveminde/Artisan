
class LocalStorage {
    // Production: need to add key codes: LocalStorage.read(1)   // 'key.1' == 'channelId' etc
    // Production: need to support numbers  // LocalStorage.update('mynum', 1) => 13
    constructor(config) {
        if (!!window.localStorage) {
            throw new Error('localStorage not available in this browser.')
        }

        this.ENV = config.ENV
        this.keys = []
        this.watchers = {}
    }

    // Sets new val. Existing watchers on key will be called.
    create(k, v) {
        if (this._notAKey(k)) return undefined
        if (this._notAVal(v)) throw new Error('LocalStorage: Please provide valid value.')
        if (this._callWatcher(k, v) === false) return false
        if (typeof v == 'object') var j = JSON.stringify(v)
        // Registering all keys
        if (!(this.keys.indexOf(k) >= 0)) this.keys.push(k)
        localStorage.setItem(k, j || v)
        return v
    }

    // Gets key
    read(k) {
        if (this._notAKey(k)) return undefined
        var v = localStorage.getItem(k)
        if (this._notAVal(v)) return null
        return this._tryJSON(v) || v
    }

    // Updates key with similar object. Ex: `LocalStorage.create('a', {a:1})  LocalStorage.update('a', {b:2})` => {a:1, b2}. If string or array, will concat.
    update(k, update) {
        var v, ov = this.read(k)
        if (ov === null) throw new Error('LocalStorage: Cannot put nonexistent key.')
        else if (typeof ov == 'boolean') throw new Error('LocalStorage: Cannot put boolean.')
        else if (typeof ov == 'string') v = ov + update
        else {
            v = (Array.isArray(ov) ? ov.concat(update) : _.merge({}, ov, update))
            var j = JSON.stringify(v)
            if (JSON.stringify(ov) == j) return v // Extra JSON.stringify here could be optimized by getting JSON string from `get` function instead. // This is a quick and dirty comparo(nv,ov) to check for !changes
        }
        if (this._callWatcher(k, v, ov) === false) return false
        localStorage.setItem(k, j || v)
        return v
    }

    // Removes key and calls watcher. Does not remove watcher. To remove key and watcher see `LocalStorage._clear(k)`
    destroy(k) {
        if (this._notAKey(k)) return undefined
        localStorage.removeItem(k)
        if (this._callWatcher(k, null) === false) return false
        return null
    }



    // Watches for LocalStorage changes for key and calls given cb(key,newValue,oldValue). If cb returns false, update to key is cancelled.
    _watch(k, cb) {
        if (this._notAKey(k)) return undefined
        if (typeof cb != 'function') throw new Error('LocalStorage: Please provide valid callback.')
        this.watchers[k] = cb
    }

    // Removes watcher on key
    _unwatch(k) {
        if (this._notAKey(k)) return undefined
        delete this.watchers[k]
    }

    // If (key) {removes key and its watcher} else {removes all keys and watchers registered with LocalStorage}
    _clear(k) {
        if (k) {
            this._unwatch(k)
            this.destroy(k)
            var key = this.keys.indexOf(k)
            if (key >= 0) this.keys.splice(key, 1)
        } else {
            this.watchers = {}
            localStorage.clear()
            this.keys = []
        }
    }

    _notAKey(k) {
        var nk = (!k || typeof k != 'string')
        if (nk) throw new Error('LocalStorage: Please provide valid key.')
        return nk
    }

    _notAVal(v) {
        return (v === null || v === undefined || v === 'undefined')
    }

    _tryJSON(v) {
        try { var j = JSON.parse(v) }
        catch (e) { return undefined }
        return j
    }

    _callWatcher(k, v, ov) {
        var watcher = this.watchers[k]
        if (typeof watcher == 'function') return watcher(k, v, ov)
    }
}