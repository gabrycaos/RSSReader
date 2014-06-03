define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var FeedModel = require("models/FeedModel");

	var FeedCollection = Backbone.Collection.extend({
		constructorName: "FeedCollection",
		model: FeedModel
	});

	return FeedCollection;
});