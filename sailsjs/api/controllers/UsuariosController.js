/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
    create: function (req, res) {
        if(req.method == 'POST' && req.param('User', null) != null){
            req.param('User')['estado'] = req.param('User')['estado'] == 'on'
            Usuarios.create(req.param('User')).exec(function(errmodel){
                if (errmodel) {
                    console.log(errmodel);
                    res.send("Error:Error al crear el usuario");
                }else {
                    res.redirect('/usuarios/index');
                }
            });
        }else{
            res.view( "user/create");
        }
    },
    index: function (req, res) {
        sails.sockets.broadcast("todos", "Listadp");
        Usuarios.find().exec(function(err, users) {
            res.view( 'user/index',{'users':users});
            return;
        });
    },
    view: function (req, res) {
        var id = req.param('id', null);
        Usuarios.findOne(id).exec(function(err,user){
            var msg = user.nombres + " " +user.apellidos
            sails.sockets.broadcast("usuarios", "Se ha visto el usuario " + msg);
            res.view( 'user/view',{'model':user, layout: 'layout'});
        });
    },
    update: function(req, res) {
        var id = req.param('id', null);
        if(req.method == 'POST' && req.param('User', null) != null){
            req.param('User')['estado'] = req.param('User')['estado'] == 'on'
            Usuarios.update(id, req.param('User')).exec(function(errmodel){
                if (errmodel) {
                    console.log(errmodel);
                    res.send("Error: No se pudo actualizar el usuario");
                }else {
                    res.redirect('/usuarios/index');
                }
            });
        }
        else{
            Usuarios.findOne(id).exec(function(err,user){
                res.view( 'user/update',{'model':user});
            });
        }
    },
    delete: function(req, res) {
        var id = req.param('id', null);
        if(req.method == 'POST'){
            Usuarios.findOne(id).exec(function(err, user){
                user.destroy();
                res.redirect("/usuarios/index");
            });
        }
        else{
            Usuarios.findOne(id).exec(function(err,user){
                res.view( 'user/delete',{'model':user});
            });
        }
    }
};