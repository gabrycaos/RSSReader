define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var FbPostListItemView = Utils.Page.extend({

    constructorName: "FbPostListItemView",

      id: "post",

      initialize: function() {
      this.template = Utils.templates.postlistitem;
      this.model.bind("change", this.render, this);
      this.model.bind("destroy", this.close, this);
    },

    render: function(eventName) {
      var ad = this.model.toJSON();
      var desc = this.model.get("desc");
      ad.cid = this.model.cid;
      $(this.el).html(this.template(ad));
      $(this.el).append($(desc));
      return this;
    },

  });

  return FbPostListItemView;

});