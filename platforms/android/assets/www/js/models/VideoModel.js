define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");

	var VideoModel = Backbone.Model.extend({
		constructorName: "VideoModel",
		title: undefined,
		guid: undefined,
		videoId: undefined,
		url: undefined,
	});
	return VideoModel;
});