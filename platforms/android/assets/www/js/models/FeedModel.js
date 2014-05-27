define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");

	var FeedModel = Backbone.Model.extend({
		constructorName: "MyModel",
		title: undefined,
		img: undefined,
		desc: undefined,
		date: undefined,
		author: undefined,
		link: undefined
	});

	return FeedModel;
});