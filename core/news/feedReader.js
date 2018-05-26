var feedParser = require('feedparser')
    , request = require('request')
    , striptags = require('striptags');
var jsdom = require("jsdom");
var _ = require("lodash");
const { JSDOM } = jsdom;

function FeedReader(max, parseDescription, imageEmbeddedInSummary) {
   this.posts = [];
   this.maxFeeds =  max || 10;
   this.parseDescription = parseDescription===true;
   this.imageEmbeddedInSummary = imageEmbeddedInSummary;
}

FeedReader.prototype.fetch = function (url, resolve, reject) {
    var thisPosts = this.posts;
    var max = this.maxFeeds, parseDescription = this.parseDescription;
    var imageEmbeddedInSummary = this.imageEmbeddedInSummary;

    return fetch(url);

    function fetch(feed) {
        var req = request(feed, {timeout: 10000, pool: false});
        req.setMaxListeners(50);
        // Some feeds do not respond without user-agent and accept headers.
        req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
        req.setHeader('accept', 'text/html,application/xhtml+xml');

        var feedparser = new feedParser();

        // Define our handlers
        req.on('error', done);
        req.on('response', function (res) {
            //console.log(res);
            if (res.statusCode != 200)
                return this.emit('error', new Error('Bad status code'));
            // And boom goes the dynamite
            res.pipe(feedparser);
        });

        feedparser.on('error', done);
        feedparser.on('end', done);
        feedparser.on('readable', function () {
            var post, postData;
            while (post = this.read()) {
                if (thisPosts.length > max) {
                    break;
                }
                if (parseDescription) {
                    postData ={description: cleanDescription(post.description) };
                } else {
                    postData = {
                        title: post.title,
                       // description:post.description,
                        summary: getSummary(post.summary),
                        link: post.link,
                        date: post.date,
                        pubdate: post.pubdate,
                        author: post.author,
                        image: imageEmbeddedInSummary? exactImageFromSummary(post.summary): post.image,
                        categories: post.categories
                    };
                    if (!postData.summary) {
                       delete postData.summary;
                    }
                    if (!postData.imge || _.isEmpty(postData.image)) {
                      delete postData.image;
                    }
                }

                thisPosts.push(postData);
            }
        });
    }


    function cleanDescription(description) {
        var regex = /\(Visit.*rank.\)/;
        return description.replace(regex, '');
    }

    function exactImageFromSummary(summary) {
      const dom = new JSDOM(summary);
      var img = dom.window.document.querySelector("img");
      return _.get(img, 'src', '');//.src;
    }

    function getSummary(summary) {
        if (!summary) {
            return '';
        }
       // summary.replace('\n', '');
        //summary.replace('\t', '');
        var summaryStr = summary + '',
            words = summaryStr.split(' ');
            words.splice(100);

        return words.join(' ');
    }


    function done(err) {
        if (err) {
            console.log(err, err.stack);

            resolve([]);
        }
        resolve(thisPosts);

    }


};

module.exports = FeedReader;
