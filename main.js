define(function(require, exports, module){
    var ExtensionUtils = brackets.getModule('utils/ExtensionUtils'),
        iconService = require('./services/icon'),
        API = require('./services/api');

    ExtensionUtils.loadStyleSheet(module, 'styles/main.css');

    iconService.init();
    iconService.click(require('./services/modal').showHandler);

    API.loadHostedLibraries();
});
