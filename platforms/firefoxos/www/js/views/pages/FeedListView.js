define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Item = require("views/pages/FeedListItemView");
  var Utils = require("utils");

  var FeedListView = Utils.Page.extend({

    constructorName: "FeedListView",


    tagName: "ul",
    id: "feeds",

    initialize: function() {
      this.template = Utils.templates.feedlist
    },
    render: function(eventName) {
      this.model.bind("reset", this.render, this);
      $(this.el).empty();
      _.each(this.model.models, function(ad) {
        $(this.el).append(new Item({
          model: ad
        }).render().el);
      }, this);
      return this;
    },
  });

  return FeedListView;

});