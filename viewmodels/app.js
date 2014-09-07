define(function(require, exports, module){
    var libs = require('../services/libraryProvider'),
        storage = require('../services/libraryStorage'),
        ko = libs.require('ko'),
        _ = libs.require('lodash');

    function AppViewModel(){
        var self = this;

        this.query = ko.observable(null);
        this.query.subscribe(function(value){
           var libs = _.sortBy(storage.query(value), function(lib){
                return lib.name;
            });

            self.libraries(libs);
        });

        this.libraries = ko.observableArray([]);

        this.query('');

        this.librariesCountLabel = ko.computed(function(){
            var count = this.libraries().length;
            return count === 0 ? 'Zero libraries found' :
                count === 1 ? 'One library found' :
                count + ' libraries found';
        }, this);
    }

    AppViewModel.prototype.getVersions = function(lib){
        return _.toArray(lib.versions);
    }

    module.exports = AppViewModel;
});
