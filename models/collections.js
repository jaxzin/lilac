var Collections = {};
if (typeof exports !== 'undefined') {
	Collections = exports;

	_ = require('underscore')._;
	Backbone = require('backbone');
}

Collections.DelayedCollection = Backbone.Collection.extend({
	// realistically, this fetch call would go out to some external endpoint (database, cache, service, etc)
	// for this demo, it just uses setTimeout to simulate an asynchronous request that takes some amount of time
	fetch: function() {
		var self = this;
		this.each(function(model) {
			if (model.get('delay')) {
				setTimeout(function() { self.updateModel(model); }, model.get('delay'));
			} else {
				self.updateModel(model);
			}			
		});
	},
	
	updateModel: function(model) {
		model.set({message: 'fetched after ' + this.get('delay') + ' ms', isFetched: true});
	}
});