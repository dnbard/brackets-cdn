define(function(require, exports, module){
    var libs = require('./libraryProvider'),
        _ = libs.require('lodash'),
        q = libs.require('q'),
        JsDelivrProvider = require('../providers/jsDelivr');

    function ApiService(){
        this.providers = {};

        this.registerProvider('jsDelivr', new JsDelivrProvider());
    }

    ApiService.prototype.registerProvider = function(id, provider){
        if (typeof id !== 'string' || !_.isObject(provider)){
            throw new Error('Invalid argument');
        }

        this.providers[id] = provider;
    }

    ApiService.prototype.loadHostedLibraries = function(){
        function checkLoadingState(){
            if (providerCount === libsLoaded){
                defer.resolve();
            }
        }

        var providerCount = _.size(this.providers),
            libsLoaded = 0,
            defer = q.defer();

        _.each(this.providers, function(provider){
            provider.loadHostedLibraries().success(function(data){
                provider.processHostedLibraries(data);

                libsLoaded ++;
                checkLoadingState();
            }).error(function(err){
                libsLoaded ++;
                checkLoadingState();

                throw new Error(err);
            });
        });

        checkLoadingState();

        return defer.promise;
    }

    ApiService.prototype.getFileUrl = function(asset, library){
        if (!this.providers[asset.provider]){
            throw new Error('Unregistered provider');
        }

        return this.providers[asset.provider].getFileUrl(asset.file, asset.version, library.name);
    }

    module.exports = new ApiService();
});
