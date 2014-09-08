define(function(require, exports){
    var libraries = {
        ko: require('http://cdn.jsdelivr.net/knockout/3.2.0/knockout.js'),
        lodash: require('http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js'),
        q: require('http://cdn.jsdelivr.net/q/1.0.1/q.min.js')
    }


    exports.require = function(id){
        if (!libraries[id]){
            throw new Error('No such library - ' + id);
        }

        return libraries[id];
    }
});
