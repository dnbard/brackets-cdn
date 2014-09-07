define(function(require, exports, module){
    var BaseProvider = require('./baseProvider'),
        storage = require('../services/libraryStorage'),
        libs = require('../services/libraryProvider'),
        _ = libs.require('lodash');

    function JsDelivrProvider(){
        this.api.hostedLibraries = 'http://api.jsdelivr.com/v1/jsdelivr/libraries';
        this.name = 'jsDelivr';
        this.urlPrefix = 'http://cdn.jsdelivr.net/';
    }

    JsDelivrProvider.prototype = new BaseProvider();

    JsDelivrProvider.prototype.processHostedLibraries = function(libraries){
        var provider = this;

        _.each(libraries, function(lib){
            storage.create(lib.name)
                .field(lib.name, 'author', lib.author)
                .field(lib.name, 'name', lib.name)
                .field(lib.name, 'description', lib.description)
                .field(lib.name, 'github', lib.github)
                .field(lib.name, 'homepage', lib.homepage)
                .field(lib.name, 'lastversion', lib.lastversion)
                .field(lib.name, 'mainfile', lib.mainfile);

            _.each(lib.versions, function(version){
                storage.version(lib.name, version, provider.name);
            });

            _.each(lib.assets, function(assetsByVersion){
                _.each(assetsByVersion.files, function(asset){
                    storage.asset(lib.name, assetsByVersion.version, provider.name, asset);
                });
            });
        });

        console.log(storage);
        console.log(libraries);
    }

    module.exports = JsDelivrProvider;
});
