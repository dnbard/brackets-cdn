define(function(require, exports, module){
    var libs = require('../services/libraryProvider'),
        library = require('../services/libraryStorage'),
        ko = libs.require('ko'),
        _ = libs.require('lodash');

    function LibraryViewModel(){
        var self = this;

        this.id = ko.observable(null);
        this.id.subscribe(function(value){
            var object = null;

            self.element(null);
            self.version(null);
            self.selectedUrl(null);

            if (value && typeof value === 'string' && library.storage[value]){
                object = library.storage[value];

                self.element(object);

                setTimeout(function(){
                    self.version(object.latestversion);
                }, 1);
                self.versions(_.toArray(object.versions));
            }
        });

        this.element = ko.observable(null);

        this.version = ko.observable(null);
        this.version.subscribe(function(){
            self.selectedUrl(null);
        });


        this.versions = ko.observableArray([]);

        this.selectedUrl = ko.observable(null);
        this.selectedUrlCaption = ko.computed(function(){
            var url = this.selectedUrl(), sections, filename;

            if (typeof url !== 'string'){
                return '';
            }

            sections = url.split('/');
            filename = sections[sections.length - 1];

            if (filename.indexOf('.js') !== -1){
                return _.template('<script type="text/javascript" src="${url}"></script>',{
                    url: url
                });
            } else if (filename.indexOf('.css') !== -1){
                return _.template('<link rel="stylesheet" href="${url}">',{
                    url: url
                });
            } else {
                console.log('Not implemented handler for ' + filename);
                this.selectedUrl(null);
                return '';
            }
        }, this);
    }

    module.exports = LibraryViewModel;
});
