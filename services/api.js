define(function(require, exports, module){
    var libs = require('./libraryProvider'),
        _ = libs.require('lodash'),
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
        _.each(this.providers, function(provider){
            provider.loadHostedLibraries().success(function(data){
                provider.processHostedLibraries(data);
            }).error(function(err){
                throw new Error(err);
            });
        });
    }

    ApiService.prototype.getFileUrl = function(asset, library){
        if (!this.providers[asset.provider]){
            throw new Error('Unregistered provider');
        }

        return this.providers[asset.provider].getFileUrl(asset.file, asset.version, library.name);
    }

    module.exports = new ApiService();
});
