define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
 // var FeedModel = require("models/FeedModel");
  var Utils = require("utils");

  var FeedListItemView = Utils.Page.extend({

    constructorName: "FeedListItemView",

   // model: FeedModel,

    events: {
      "touchend": "goToDetails"
    },
      initialize: function() {
      this.template = Utils.templates.feedlistitem;
      this.model.bind("change", this.render, this);
      this.model.bind("destroy", this.close, this);
    },

    render: function(eventName) {
      var ad = this.model.toJSON();
      ad.cid = this.model.cid;
      $(this.el).html(this.template(ad));
      return this;
    },

    goToDetails: function(event) {
      Backbone.history.navigate("feeds/" + this.model.cid, {
        trigger: true
      });
    }

  });

  return FeedListItemView;

});