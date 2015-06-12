/**
 * Autor:   Daniel HConstantino (@dhconstantino)
 * Fecha:   09/06/15 12:40
 */
var Db = require('./db');
var uri = Db.getURI();
var dbname = uri.split('/')[3];
var mongoclient;

Db.connect(uri, function(err) {
    if(err) {
        console.log('[ERROR] Falló la conexión con la BD');
    }
    else {
        mongoclient = Db.getDB();
    }
});

exports.insert  = function(collection, document, done) {
    mongoclient.open(function(err, mongo) {
        var db = mongo.db(dbname);
        db.collection(collection).insert(document, function(err) {
            if(err) {
                console.log('[ERROR] No se pudo realizar la operación .insertOne()');
                done(err);
            }
            else {
                done();
            }
        });
    });
    mongoclient.close();
};

exports.find    = function(collection, query, done) {
    mongoclient.open(function(err, mongo) {
        var db = mongo.db(dbname);
        db.collection(collection).findOne(query, function(err, data) {
            if(err) {
                console.log('[ERROR] No se pudo realizar la operación .findOne()');
            }
            done(err, data);
        });
    });
    mongoclient.close();
};

exports.update  = function(collection, query, update, done) {
    mongoclient.open(function(err, mongo) {
        var db = mongo.db(dbname);
        db.collection(collection).update(query, update, {upsert: false, multi: false}, function(err, data) {
            if(err) {
                console.log('[ERROR] No se pudo realizar la operación .update()');
            }
            done(err, data);
        });
    });
    mongoclient.close();
};