define(function(require, exports){
    var Dialogs = brackets.getModule('widgets/Dialogs'),
        modalTemplate = require('text!../templates/modal.html'),
        libraryProvider = require('./libraryProvider'),
        ko = libraryProvider.require('ko'),
        AppViewModel = require('../viewmodels/app');

    function showHandler(){
        var dlg = Dialogs.showModalDialogUsingTemplate(modalTemplate)._$dlg,
            appViewModel = new AppViewModel(dlg);

        ko.applyBindings(appViewModel, dlg[0]);
        return appViewModel;
    }
    exports.showHandler = showHandler;
});
