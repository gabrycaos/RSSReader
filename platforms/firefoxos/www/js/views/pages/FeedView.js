define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var FeedModel = require("models/FeedModel");
  var Utils = require("utils");

  var FeedView = Utils.Page.extend({

    constructorName: "FeedView",

    model: FeedModel,

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.feedview;
      // here we can register to inTheDOM or removing events
      // this.listenTo(this, "inTheDOM", function() {
      //   $('#content').on("swipe", function(data){
      //     console.log(data);
      //   });
      // });
      // this.listenTo(this, "removing", functionName);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "myview",
    className: "i-g page",

    events: {
      "touchend #goToMap": "goToMap"
    },

    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      var desc = this.model.get("desc");
      var tdesc = $(desc).text();
      console.log(tdesc);
      $(this.el).append(tdesc);
      return this;
    },

    goToMap: function(e) {
      Backbone.history.navigate("map", {
        trigger: true
      });
    }
  });

  return FeedView;

});