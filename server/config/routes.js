var controllers = require('./../controllers/controllers.js');
var podcasts = require('./../controllers/podcasts.js');
module.exports = function(app) {
    app.get('/api/:terms', podcasts.search);
    // app.get('/rss/:uri', podcasts.rss);
    // app.get(/^\/(.+)/, function(req, res) {
    //   var href = req.params[0]; // regexp's numbered capture group
    //   console.log(typeof req.params[0]);
    //   res.json(req.params[0]);
    // });
    app.get(/^\/(.+)/, podcasts.rss);
};
