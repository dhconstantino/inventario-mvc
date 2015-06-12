/**
 * Autor:   Daniel HConstantino (@dhconstantino)
 * Fecha:   09/06/15 17:04
 */
var db = require('./dao');
var crypto = require('crypto');
var collection = 'users';

var hash    = function(password) {
    return crypto.createHash('sha1').update(password).digest('base64');
};

exports.insert  = function(name, lastName, surName, email, username, password, profile, area, cb) {
    var user = {
        nombre:     name,
        aPaterno:   lastName,
        aMaterno:   surName,
        email:      email,
        usuario:    username,
        clave:      hash(password),
        perfil:     profile,
        area:       area,
        estatus:    'ACTIVO'
    };
    db.insert(collection, user, cb);
};
exports.find    = function(username, cb) {
    db.find(collection, {usuario: username}, cb);
};
exports.update  = function(username, updates, cb) {
    db.update(collection, {usuario: username}, {$set: updates}, cb);
};
exports.remove  = function (username, cb) {
    db.update(collection, {usuario: username}, {$set: {estatus:'INACTIVO'}}, cb);
};
exports.login   = function(user, pass, cb){
    db.find(collection, {usuario: user, clave: hash(pass)}, cb);
};