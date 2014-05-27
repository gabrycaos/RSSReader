define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var FeedModel = require("models/FeedModel");
  var Aggregator = require("models/Aggregator");
  var FeedCollection = require("collections/FeedCollection");
  var StructureView = require("views/StructureView");
  var FeedListView = require("views/pages/FeedListView");
  var FeedView = require("views/pages/FeedView");

  var AppRouter = Backbone.Router.extend({

    constructorName: "AppRouter",

    routes: {
      // the default is the structure view
      "": "showStructure",
      "feedlist": "feedlist",
      "feeds/:id": "feedDetails",
    },

    firstView: "feedlist",

    initialize: function(options) {
      this.currentView = undefined;
      this.url = "http://www.rietimeeting.com/feed";
      // highlight the nav1 tab bar element as the current one
      //this.structureView.setActiveTabBarElement("nav1");
      //in StructureView I have disable the navbar
      // create a model with an arbitrary attribute for testing the template engine
      this.aggregator = new Aggregator();
      this.feeds = new FeedCollection([]);
      this.aggregator.fetch(this.feeds, this.url);
    },

    feedlist: function() {
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