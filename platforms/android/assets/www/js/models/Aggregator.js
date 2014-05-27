define(function(require) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var FeedModel = require("models/FeedModel");
    var VideoModel = require("models/VideoModel");
    //var FeedCollection = require("collections/FeedCollection")

    var Aggregator = Backbone.Model.extend({
        constructorName: "Aggregator",
        fetch: function(feeds, link) {
            $.ajax({
                url: link,
                dataType: 'xml',
                success: function(res, code) {
                    entries = [];
                    var xml = $(res);
                    var items = xml.find("item");
                    $.each(items, function(i, v) {
                        entry = new FeedModel({
                            title: $(v).find("title").text(),
                            desc: $.trim($(v).find("encoded").text()),
                            link: $(v).find("link").text(),
                        });
                        var find = entry.get('desc');
                        var url = $(find).find('img').eq(0).attr('src');
                        entry.set('img', url);
                        entries.push(entry);
                    });
                    feeds.reset(entries);
                },
                error: function(jqXHR, status, error) {
                    alert("ERROR ON FETCHING NEWS!");
                }
            });
        },
        youtube: function(videos, link) {
            $.ajax({
                url: link,
                dataType: 'xml',
                success: function(res, code) {
                    entries = [];
                    var xml = $(res);
                    var items = xml.find("item");
                    $.each(items, function(i, v) {
                        entry = new VideoModel({
                            title: $(v).find("title").text(),
                            guid: $(v).find("guid").text(),
                        });
                        var find = entry.get('guid');
                        var idVideo = find.replace("tag:youtube.com,2008:video:", "");
                        entry.set("url", 'http://www.youtube.com/embed/' + idVideo + '?html5=true?modestbranding=1??wmode=opaque&amp;rel=0&amp;autohide=1&amp;showinfo=0&amp;wmode=transparent');
                        localStorage["videos"] = JSON.stringify(entries);
                        entries.push(entry);
                    });
                    videos.reset(entries);
                },
                error: function(jqXHR, status, error) {
                    alert("ERROR ON FETCHING VIDEOS!")
                }
            });
        },
    });

    return Aggregator;
});