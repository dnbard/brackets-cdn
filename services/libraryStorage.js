define(function(require, exports, module){
    var libs = require('./libraryProvider'),
        _ = libs.require('lodash');

    function LibraryStorage(){
        this.storage = {};
    }

    LibraryStorage.prototype.create = function(id){
        if (!this.storage[id]){
            this.storage[id] = {};
        }

        return this;
    }

    LibraryStorage.prototype.field = function(id, field, value, overwrite){
        overwrite = overwrite || false;

        if (!this.storage[id]){
            this.storage[id] = {};
        }

        if (!this.storage[id][field] || overwrite){
            this.storage[id][field] = value;
        }

        return this;
    }

    LibraryStorage.prototype.version = function(id, version, provider){
        if (!this.storage[id]){
            this.storage[id] = {};
        }

        if (!this.storage[id].versions){
            this.storage[id].versions = {};
        }

        this.storage[id].versions[version] = {
            version: version,
            provider: provider
        }

        return this;
    }

    LibraryStorage.prototype.asset = function(id, version, provider, file){
        if (!this.storage[id]){
            this.storage[id] = {};
        }

        if (!this.storage[id].assets){
            this.storage[id].assets = [];
        }

        this.storage[id].assets.push({
            version: version,
            provider: provider,
            file: file
        });
    }

    LibraryStorage.prototype.query = function(str){
        var result = [];

        if (typeof str !== 'string' || str.length === 0){
            return _.toArray(this.storage);
        }

        _.each(this.storage, function(lib){
            if (lib.name.indexOf(str) !== -1){
                result.push(lib);
            }
        });

        return result;
    }

    module.exports = new LibraryStorage();
});
