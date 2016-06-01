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
                res.send("Error:Sorry!Something went Wrong");
            }else {
                res.redirect('/usuarios/index');
            }

            });
        }else{
            res.view( "user/create");
        }
    },

    index: function (req, res) {
        Usuarios.find().exec(function(err, users) {
            res.view( 'user/index',{'users':users});
            return;

        });
    },
    view: function (req, res) {
        var id = req.param('id', null);
        console.log(id);
        Usuarios.findOne(id).exec(function(err,user){
            console.log(user);
            res.view( 'user/view',{'model':user, layout: 'layout'});
        });
    },
    update: function(req, res) {
        var id = req.param('id', null);
        if(req.method == 'POST' && req.param('User', null) != null){
            console.log("Editanto usuario", id);
            console.log("Info", req.param("User"));
            Usuarios.update(id, req.param('User')).exec(function(errmodel){
                if (errmodel) {
                    console.log(errmodel);
                    res.send("Error: Sorry! Something went Wrong");
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
        console.log("Se llama eliminar 0");     
        var id = req.param('id', null);
        if(req.method == 'POST'){
            Usuarios.findOne(id).exec(function(err, user){

                console.log("Se procede a su eliminación");
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

