/*
    Routas de usuarios /auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validatedFields } = require('../middlewares/validar-campos');
const { createUser, loginUser, revaliderUser } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post(
	'/new',
	[
		//middlewares
		check('name', 'El nombre es obligaorio').not().isEmpty(),
		check('email', 'El email es obligaorio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validatedFields,
	],
	createUser
);

router.post(
	'/',
	[
		check('email', 'El email es obligaorio').isEmail(),
		check('password', 'El password debe de ser de 6 caracteres').isLength({
			min: 6,
		}),
		validatedFields,
	],
	loginUser
);

router.get('/renew', validarJWT, revaliderUser);

module.exports = router;
