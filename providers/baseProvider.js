define(function(require, exports, module){
    function BaseProvider(){
        this.api = {};
    }

    BaseProvider.prototype.loadHostedLibraries = function(){
        return $.ajax({
            url: this.api['hostedLibraries']
        });
    }

    module.exports = BaseProvider;
});
