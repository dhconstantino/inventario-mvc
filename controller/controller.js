/**
 * Autor:   Daniel HConstantino (@dhconstantino)
 * Fecha:   10/06/15 17:05
 * Descripción:
 * Configuración de módulos de rutas para el controlador
 */

module.exports = function(app) {
    var routes = require('../routes/index');
    var tests = require('../tests/test');
    var users = require('../routes/users');

    app.use('/', routes);
    app.use('/tests', tests);
    app.use('/users', users);
};