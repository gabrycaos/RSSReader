define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var VideoListItemView = Utils.Page.extend({

    constructorName: "VideoListItemView",

    events: {
      "touchend": "goToDetails"
    },
      initialize: function() {
      this.template = Utils.templates.videolistitem;
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
      Backbone.history.navigate("videos/" + this.model.cid, {
        trigger: true
      });
    }

  });

  return VideoListItemView;

});