/**
 *  Autor:  Daniel HConstantino
 *          @dhconstantino
 *  Fecha:  09/06/15 12:27
 *  Descripción:
 *  Parámetros de configuración de la Base de Datos y funciones de acceso para conectar,
 *  obtener y cerrar una conexión con MongoDB.
 */

var MongoClient = require('mongodb').MongoClient;
var state = {db: null, uri: 'mongodb://localhost:27017/inventariodb'};
exports.getDB   = function() {return state.db};
exports.getURI  = function() {return state.uri};
exports.connect = function (uri, done) {
    if(state.db) {
        return done();
    }

    MongoClient.connect(uri, function(err, db) {
        if(err) {
            return done(err);
        }
        state.db = db;
        done();
    });
};
exports.close   = function(done) {
    if(state.db) {
        state.db.close(function (err) {
            state.db = null;
            done(err);
        });
    }
};