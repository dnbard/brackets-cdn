define(function(require, exports, module){
    var BaseProvider = require('./baseProvider');

    function JsDelivrProvider(){
        this.api.hostedLibraries = 'http://api.jsdelivr.com/v1/jsdelivr/libraries';
    }

    JsDelivrProvider.prototype = new BaseProvider();

    module.exports = JsDelivrProvider;
});
