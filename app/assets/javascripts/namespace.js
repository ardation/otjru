var namespace = {
    fetchTemplate: function (path, done) {
        var JST = window.JST = window.JST || {};
        var def = new $.Deferred();
        if (JST[path]) {
            if (_.isFunction(done)) {
                done(JST[path]);
            }
            return def.resolve(JST[path]);
        }
        $.ajax({
            url: "/" + path,
            type: "get",
            dataType: "text",
            cache: true,
            global: false,
            success: function (contents) {
                JST[path] = _.template(contents);
                if (_.isFunction(done)) {
                    done(JST[path]);
                }
                def.resolve(JST[path]);
            }
        });
        return def.promise();
    },
    module: function (additionalProps) {
        return _.extend({
            Views: {}
        }, additionalProps);
    },
    app: _.extend({}, Backbone.Events)
};