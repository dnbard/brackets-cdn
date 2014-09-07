define(function(require, exports, module){
    function BaseProvider(){
        this.api = {};
    }

    BaseProvider.prototype.loadHostedLibraries = function(){
        return $.ajax({
            url: this.api['hostedLibraries']
        });
    }

    BaseProvider.prototype.processHostedLibraries = function(){
        throw new Error('Not implemented');
    }

    module.exports = BaseProvider;
});
