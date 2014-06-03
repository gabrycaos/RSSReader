define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Item = require("views/pages/VideoListItemView");
  var Utils = require("utils");

  var VideoListView = Utils.Page.extend({

    constructorName: "VideoListView",


    tagName: "ul",
    id: "videos",

    initialize: function() {
      this.template = Utils.templates.videolist
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

  return VideoListView;

});