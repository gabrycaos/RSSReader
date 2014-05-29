define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var FbPostModel = require("models/FbPostModel");

	var FbPostCollection = Backbone.Collection.extend({
		constructorName: "FbPostCollection",
		model: FbPostModel
	});

	return FbPostCollection;
});