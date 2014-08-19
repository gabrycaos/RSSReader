define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var FeedModel = require("models/FeedModel");
  var VideoModel = require("models/VideoModel");
  var StructureView = require("views/StructureView");
  var Aggregator = require("models/Aggregator");
  var FeedCollection = require("collections/FeedCollection");
  var VideoCollection = require("collections/VideoCollection");
  var FbPostCollection = require("collections/FbPostCollection");
  var FeedListView = require("views/pages/FeedListView");
  var FeedView = require("views/pages/FeedView");
  var VideoListView = require("views/pages/VideoListView");
  var FbPostListView = require("views/pages/FbPostListView");
  var UrlConfig = require("urlConfig");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "feedlist": "feedlist",
      "feeds/:id": "feedDetails",
      "videolist": "goVideos",
      "postlist": "posts",
    },

    firstView: "feedlist",

    initialize: function(options) {
      this.currentView = undefined;
      // highlight the nav1 tab bar element as the current one
      this.aggregator = new Aggregator();
      this.feeds = new FeedCollection([]);
      this.videos = new VideoCollection([]);
      this.posts = new FbPostCollection([]);
      this.aggregator.fetch(this.feeds, UrlConfig.news);
      this.aggregator.youtube(this.videos, UrlConfig.youtube);
      this.aggregator.facebook(this.posts, UrlConfig.facebook);
    },

    feedlist: function() {
      this.structureView.setActiveTabBarElement("nav1");
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
      posts: function() {
      this.structureView.setActiveTabBarElement("nav3");
      var page = new FbPostListView({
        model: this.posts
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