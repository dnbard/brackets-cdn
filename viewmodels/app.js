define(function(require, exports, module){
    var libs = require('../services/libraryProvider'),
        storage = require('../services/libraryStorage'),
        API = require('../services/api'),
        LibraryViewModel = require('./library'),
        ko = libs.require('ko'),
        _ = libs.require('lodash');

    function AppViewModel(){
        var self = this;

        this.library = new LibraryViewModel();

        this.page = ko.observable('master');

        this.query = ko.observable(null);
        this.query.subscribe(function(value){
            function processArray(token){
                var lib = null, count = 10;

                if (token !== self.query()){
                    return;
                }

                for(var i = 0, max = libs.length > count ? count : libs.length ; i < max; i ++){
                    lib = libs.shift();
                    self.libraries.push(lib);
                }

                if (libs.length > 0){
                    setTimeout(function(){
                        processArray(token);
                    }, 0);
                }
            }

            libs = _.sortBy(storage.query(value), function(lib){
                return lib.name;
            });

            self.libraries([]);
            self.libraries.extend({ rateLimit: 50 });
            processArray(self.query());
        });

        this.libraries = ko.observableArray([]);

        this.query('');

        this.librariesCountLabel = ko.computed(function(){
            var count = this.libraries().length;
            return count === 0 ? 'Zero libraries found' :
                count === 1 ? 'One library found' :
                count + ' libraries found';
        }, this);

        this.getAsset = function(library){
            var mainAsset = _.find(library.assets, function(asset){
                return asset.file === library.mainfile &&
                    asset.version === library.lastversion;
            });

            return mainAsset;
        }

        this.getAssets = function(library, version){
            version = version || library.lastversion;

            var assets = _.filter(library.assets, function(asset){
                return asset.version === version;
            });

            return assets;
        }

        this.getFileUrl = function(asset, library){
            return API.getFileUrl(asset, library);
        }

        this.toMasterPage = function(){
            self.page('master');
        }

        this.toAboutPage = function(){
            self.page('about');
        }

        this.clickDelegate = function(model, event){
            var tag = event.target.tagName,
                target = $(event.target);

            if (!tag){
                return;
            }

            switch(tag){
                case 'LIBRARY-NAME':
                    self.setToLibraryPage(target.text());
                    break;
                case 'INPUT':
                    if (target.attr('data-attr') === undefined){
                        return;
                    }

                    target.select();

                    if (target.attr('data-attr') === 'input'){
                        self.library.selectedUrl(target.val());
                    }

                    break;
            }

            return true;
        }

        this.setToLibraryPage = function(id){
            this.library.id(id);
            this.page('library');
        }
    }

    AppViewModel.prototype.getVersions = function(lib){
        return _.toArray(lib.versions);
    }

    module.exports = AppViewModel;
});
