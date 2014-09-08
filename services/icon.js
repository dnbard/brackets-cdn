define(function(require, exports, module){
    var config = require('../config'),
        id = 'cdn_icon',
        icon = null;

    function init(){
        var imagePath = config.path + 'images/icon.png';
        icon = $('<a class="fa fa-cogs" id="'+ id +'"></a>');

        icon.css('color', 'red');
        icon.css('font-size', '18pt');
        icon.appendTo($("#main-toolbar .buttons"));
    }

    function click(handler){
        if (icon === null){
            throw new Error('Icon is not initialized');
        }
        icon.on('click', handler);
        icon.css('color', '#BBBABA');
    }

    exports.init = init;
    exports.click = click;
});
