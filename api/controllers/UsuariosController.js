/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
    create: function (req, res) {
        if(req.method == 'POST' && req.param('User', null) != null){
            Usuarios.create(req.param('User')).done(function(errmodel){
            if (err) {
                res.send("Error:Sorry!Something went Wrong");
            }else {
                res.send("Successfully Created!");
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
        var id=req.param('id',null);
        console.log(id);
        Usuarios.findOne(id).exec(function(err,user){
            console.log(user);
            res.view( 'user/view',{'model':user, layout: 'layout'});
        });
    }
};

