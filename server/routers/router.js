'use strict';

module.exports = function (app) {
	app.use('/api/venue', require('./routes/venue'));
	app.use('/api/venue/photos', require('./routes/venuePhotos'));
	app.use('/api/venue/similar', require('./routes/venueSimilar'));
	app.use('/api/venues', require('./routes/venues'));
};



