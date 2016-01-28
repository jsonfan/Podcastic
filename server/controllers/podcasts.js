var mongoose = require('mongoose');
var searchitunes = require('searchitunes');
var parseString = require('xml2js').parseString;
var http = require('http');

module.exports = (function () {
  return {
    search: function(req, res) {
      searchitunes (
        {
          entity: 'podcast',
          country: 'US',
          term: req.params.terms,
          limit: 200
        },
        function (err, data) {
          if (err) {
            res.json(
            {
              resultCode: -1,
              resultReason: "ERROR",
              resultValue: "",
              resultArray: []
            });
          } else {
            res.json(
            {
              resultCode: 1,
              resultReason: "SUCCESS",
              resultValue: "",
              resultArray: data.results
            });
          }
        } // SEARCH ITUNES CALLBACK
      ); // SEARCH ITUNES
    }, // search
    rss: function(req, response){
        http.get(req.params[0], function(res) {
          var xml = '';

          res.on('data', function(chunk) {
            xml += chunk;
          });

          res.on('error', function(e) {
            callback(e, null);
          });

          res.on('timeout', function(e) {
            callback(e, null);
          });

          res.on('end', function() {
            parseString(xml, function(err, result) {
              // callback(null, result);
              // console.log(result.rss.channel[0].item);
              return response.json(
              {
                resultCode: 1,
                resultReason: "SUCCESS",
                resultValue: "",
                resultArray: result.rss.channel[0].item // an array of episodes
              });
            });
          });
        });
      // }
    }
  }
})();
