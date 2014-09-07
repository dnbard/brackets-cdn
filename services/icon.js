define(function(require, exports, module){
    var config = require('../config'),
        id = 'cdn_icon',
        icon = null;

    function init(){
        var imagePath = config.path + 'images/icon.png';
        icon = $('<a id="'+ id +'"></a>');
        //icon.css('background', 'url(' + config.path + 'images/icon.png)');
        icon.css('background', 'red');
        icon.appendTo($("#main-toolbar .buttons"));
    }

    function click(handler){
        if (icon === null){
            throw new Error('Icon is not initialized');
        }
        icon.on('click', handler);
    }

    exports.init = init;
    exports.click = click;
});
