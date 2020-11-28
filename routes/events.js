const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validatedFields } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const {
	getEvent,
	createEvent,
	updateEvent,
	deleteEvent,
} = require('../controllers/events');

const router = Router();

router.use(validarJWT); //todas las rutas tienen que pasar por la validacion del JWT

router.get(
	'/',

	getEvent
);

router.post(
	'/',
	[
		check('title', 'El titulo es obligatorio').not().isEmpty(),
		check('start', 'Fecha de inicio es obligatoria').custom(isDate),
		check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
		validatedFields,
	],
	createEvent
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;
