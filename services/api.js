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

    module.exports = new ApiService();
});
