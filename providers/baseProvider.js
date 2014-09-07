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

    BaseProvider.prototype.getFileUrl = function(fileUrl, version, libName){
        if (!this.urlPrefix){
            throw new Error('Not implemented');
        }

        return this.urlPrefix + libName + '/' + version + '/' + fileUrl;
    }

    module.exports = BaseProvider;
});
