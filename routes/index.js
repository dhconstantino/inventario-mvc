var express = require('express');
var userDao = require('../models/user');
var router  = express.Router();
var appRoutes   = ['/', '/usuarios', '/empleados', '/activos', '/asignaciones', '/reportes'];

router.route('/acceso')
    .get(function(req, res) {
        (req.session.activeSession===1)?res.redirect('/'):res.render('login');
    })
    .post(
        function(req, res, next) {
            var usr = req.body.inpUsuario;
            var pwd = req.body.inpClave;
            var ssn;

            userDao.login(usr, pwd, function(err, data) {
                if(err) {
                    console.log("err=" + err);
                    res.send('OCURRIÓ UN ERROR > ' + err);
                }
                else {
                    console.log("data=" + data);
                    res.send('LISTO! DATA > ' + data);
                }
            });
        }
    );

router.get(appRoutes, function(req, res, next) {next();});

router.get('/', function(req, res) {
    res.render('index',
        {
            username:           req.session.username,
            profile:            req.session.profile,
            currentYear:        new Date().getFullYear(),
            numAreas:           2,
            numCategories:      6,
            numEmployees:       80,
            totalItems:         172,
            unavailableItems:   52,
            unusableItems:      3,
            assignedItems:      120,
            inRepairItems:      47,
            lostItems:          2
        }
    );
});

module.exports = router;