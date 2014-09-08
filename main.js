define(function(require, exports, module){
    var ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        iconService = require('./services/icon'),
        API = require('./services/api');

    ExtensionUtils.loadStyleSheet(module, 'styles/main.css');
    ExtensionUtils.loadStyleSheet(module, 'http://cdn.jsdelivr.net/fontawesome/4.2.0/css/font-awesome.css');

    iconService.init();

    API.loadHostedLibraries().then(function(){
        iconService.click(require('./services/modal').showHandler);
    });
});
