define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");

	var FbPostModel = Backbone.Model.extend({
		constructorName: "FeedModel",
		img: undefined,
		desc: undefined,
		date: undefined,
		author: undefined,
		link: undefined
	});

	return FbPostModel;
});