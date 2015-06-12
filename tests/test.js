/**
 * Autor:   Daniel HConstantino (@dhconstantino)
 * Fecha:   10/06/15 17:00
 */
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var year = new Date().getFullYear();

router.get('/user-insert', function(req, res) {
    User.insert(
        'Daniel','Hernández','Constantino','hernandezd@ryclatam.com','hernandezd','s3cret','ADMINISTRADOR','SISTEMAS',
        function(err) {
            if(err) {
                res.render('tests/user_insert', {
                    response: 'Ha ocurrido un error al crear el usuario de prueba',
                    status: 'ERROR',
                    err: err,
                    errMessage: err.message,
                    errCode: err.code,
                    currentYear: year
                });
            }
            else {
                res.render('tests/user_insert', {
                    response: 'Usuario de prueba creado exitosamente!',
                    status: 'OK',
                    currentYear: year
                });
            }
        }
    );
});

router.get('/user-find', function(req, res) {
    User.find('hernandezd', function(err, data){
        if(err) {
            res.render('tests/user_find', {
                response: 'No se pudo realizar la consulta',
                status: 'ERROR',
                err: err,
                errMessage: err.message,
                errCode: err.code,
                currentYear: year
            });
        }
        else if(!data) {
            res.render('tests/user_find', {
                response: 'No se encontró el usuario',
                status: 'ADVERTENCIA',
                currentYear: year
            });
        }
        else {
            res.render('tests/user_find', {
                response: 'Usuario encontrado',
                user: {
                    name: data.nombre,
                    lastname: data.aPaterno,
                    surname: data.aMaterno,
                    area: data.area,
                    profile: data.perfil,
                    status: data.estatus
                },
                status: 'OK',
                currentYear: year
            });
        }
    });
});

router.get('/user-update', function(req, res) {
    User.update('hernandezd', {nombre: 'Ángel'}, function(err, data) {
        var affectedRows = JSON.parse(data).n;

        if(err) {
            res.render('tests/user_update', {
                response: 'No se pudo realizar la actualización',
                status: 'ERROR',
                err: err,
                errMessage: err.message,
                errCode: err.code,
                currentYear: year
            });
        }
        else {
            switch (affectedRows) {
                case 0:
                    res.render('tests/user_update', {
                        response: 'La consulta no devolvió resultados. No se realizaron cambios en la BD',
                        status: 'ADVERTENCIA',
                        currentYear: year
                    });
                    break;
                case 1:
                    res.render('tests/user_update', {
                        response: 'Se ha actualizado correctamente 1 registro!',
                        status: 'OK',
                        currentYear: year
                    });
                    break;
                default:
                    res.render('tests/user_update', {
                        response: 'La consulta devolvió más de un resultado. No se realizaron cambios en la BD',
                        status: 'ADVERTENCIA',
                        currentYear: year
                    });
                    break;
            };
        }
    });
});

router.get('/user-login', function(req, res) {
    User.login('hernandezd', 's3cret', function(err, data) {
        if(err) {
            res.render('tests/user_login', {
                response: 'No fue posible validar las credenciales de autenticación',
                status: 'ERROR',
                err: err,
                errMessage: err.message,
                errCode: err.code,
                currentYear: year
            });
        }
        else if(!data) {
            res.render('tests/user_login', {
                response: 'El usuario y/o la contraseña son incorrectos, por favor verifique',
                status: 'ADVERTENCIA',
                currentYear: year
            });
        }
        else {
            res.render('tests/user_login', {
                response: 'Autenticación exitosa! Ahora es posible iniciar una sesión',
                status: 'OK',
                currentYear: year
            });
        }
    });
});

router.get('/user-remove', function(req, res) {
    User.remove('hernandezd', function(err, data) {
        var affectedRows = JSON.parse(data).n;

        if(err) {
            res.render('tests/user_update', {
                response: 'No se pudo realizar la operación',
                status: 'ERROR',
                err: err,
                errMessage: err.message,
                errCode: err.code,
                currentYear: year
            });
        }
        else {
            switch (affectedRows) {
                case 0:
                    res.render('tests/user_update', {
                        response: 'La consulta no devolvió resultados. No se realizaron cambios en la BD',
                        status: 'ADVERTENCIA',
                        currentYear: year
                    });
                    break;
                case 1:
                    res.render('tests/user_update', {
                        response: 'El usuario ha sido dado de baja del sistema (su estatus es ahora "INACTIVO")',
                        status: 'OK',
                        currentYear: year
                    });
                    break;
                default:
                    res.render('tests/user_update', {
                        response: 'La consulta devolvió más de un resultado. No se realizaron cambios en la BD',
                        status: 'ADVERTENCIA',
                        currentYear: year
                    });
                    break;
            };
        }
    });
});

module.exports = router;