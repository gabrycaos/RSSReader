define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var VideoModel = require("models/VideoModel");

	var VideoCollection = Backbone.Collection.extend({
		constructorName: "VideoCollection",
		model: VideoModel
	});

	return VideoCollection;
});