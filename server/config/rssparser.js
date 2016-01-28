var request = require('request');
var FeedParser = require('feedparser');
var parser = new FeedParser();
module.exports = (function () {
  return {
    parser: function(aURI) {
      var parseThis = request(aURI);
      parseThis.on('error', function (error) {
        // handle any request errors
      });
      parseThis.on('response', function (res) {
        var stream = this;

        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

        stream.pipe(parser);
      });

      parser.on('error', function(error) {
        // always handle errors
      });
      parser.on('readable', function() {
        // This is where the action is!
        var stream = this
          , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
          , item;
        var results = [];
        while (item = stream.read()) {
          results.push(item);
        }
        console.log(typeof results);
        return results;
      });
    }
  }
})();
