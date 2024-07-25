function errorHandler(err, req, res, next) {
    console.error(err); // Loguear error al sistema de monitorización
    res.status(500).send('Ocurrió un error en el servidor');
}

module.exports = {errorHandler};
