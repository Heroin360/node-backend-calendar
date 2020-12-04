const { response } = require('express');
const Event = require('../models/Events');

const getEvent = async (req, res = response) => {
	const getEvents = await Event.find().populate('user', 'name');

	res.json({
		ok: true,
		getEvents,
	});
};

const createEvent = async (req, res = response) => {
	const event = new Event(req.body);

	try {
		event.user = req.uid;

		const eventSave = await event.save();
		res.json({
			ok: true,
			event: eventSave,
		});
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};

const updateEvent = async (req, res = response) => {
	const eventId = req.params.id;
	const uid = req.uid;

	try {
		const event = await Event.findById(eventId);

		if (!event) {
			return res.status(404).json({
				ok: false,
				msg: 'Evento no encontrado con ese Id',
			});
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'No tiene privilegios para editar este evento',
			});
		}

		const newEvent = {
			...req.body,
			user: uid,
		};

		const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
			new: true,
		});

		res.json({
			ok: true,
			event: eventUpdated,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador',
		});
	}
};
const deleteEvent = async (req, res = response) => {
	const eventId = req.params.id;
	const uid = req.uid;

	try {
		const event = await Event.findById(eventId);
		if (!eventId) {
			return res.status(404).json({
				ok: false,
				msg: 'El id que estas intentando borrar no existe',
			});
		}

		if (event.user.toString() !== uid) {
			return res.status(401).json({
				ok: false,
				msg: 'Usted no tiene privilegios para eliminar este evento',
			});
		}

		console.log(event.id, uid);

		await Event.findByIdAndDelete(eventId);

		res.status(201).json({
			ok: true,
			msg: 'Evento eliminado exitosamente',
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'No se pudo eliminar',
		});
	}
};

module.exports = {
	getEvent,
	createEvent,
	updateEvent,
	deleteEvent,
};
