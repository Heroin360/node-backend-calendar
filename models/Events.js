const { Schema, model } = require('mongoose');

const EventShema = Schema({
	title: {
		type: String,
		required: true,
	},
	notes: {
		type: String,
	},
	start: {
		type: Date,
		required: true,
	},

	end: {
		type: Date,
		required: true,
	},

	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

EventShema.method('toJSON', function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model('Event', EventShema);
