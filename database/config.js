const mongoose = require('mongoose');

const dbConexion = async () => {
	try {
		await mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log('DB online');
	} catch (error) {
		console.log(error);
		throw new Error('Error al inicializar Base de datos');
	}
};

module.exports = {
	dbConexion,
};
