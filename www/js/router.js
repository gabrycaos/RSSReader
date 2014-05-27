define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var FeedModel = require("models/FeedModel");
  var VideoModel = require("models/VideoModel");
  var Aggregator = require("models/Aggregator");
  var FeedCollection = require("collections/FeedCollection");
  var VideoCollection = require("collections/VideoCollection");
  var StructureView = require("views/StructureView");
  var FeedListView = require("views/pages/FeedListView");
  var FeedView = require("views/pages/FeedView");
  var VideoListView = require("views/pages/VideoListView");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "feedlist": "feedlist",
      "feeds/:id": "feedDetails",
      "videolist": "goVideos",
    },

    firstView: "feedlist",

    initialize: function(options) {
      this.currentView = undefined;
      this.urlFeeds = "http://www.rietimeeting.com/feed";
      this.urlVideos = "http://gdata.youtube.com/feeds/base/users/calciofoggia/uploads?alt=rss&client=ytapi-youtube-rss-redirect&v=2&orderby=updated"
      // highlight the nav1 tab bar element as the current one
      this.aggregator = new Aggregator();
      this.feeds = new FeedCollection([]);
      this.videos = new VideoCollection([]);
      this.aggregator.fetch(this.feeds, this.urlFeeds);
      this.aggregator.youtube(this.videos, this.urlVideos);
      console.log(this.videos);
    },

    feedlist: function() {
      this.structureView.setActiveTabBarElement("nav1");
      console.log(this.feeds);
      // create the view
      var page = new FeedListView({
        model: this.feeds
      });
      // show the view
      this.changePage(page);
    },
    feedDetails: function(id) {
      var feed = this.feeds.get(id);
      this.changePage(new FeedView({
        model: feed
      }));
    },
    goVideos: function() {
      this.structureView.setActiveTabBarElement("nav2");
      var page = new VideoListView({
        model: this.videos
      });
      this.changePage(page);
    },
    // load the structure view
    showStructure: function() {
      if (!this.structureView) {
        this.structureView = new StructureView();
        // put the el element of the structure view into the DOM
        document.body.appendChild(this.structureView.render().el);
        this.structureView.trigger("inTheDOM");
      }
      // go to first view
      this.navigate(this.firstView, {
        trigger: true
      });
    },

  });

  return AppRouter;

});