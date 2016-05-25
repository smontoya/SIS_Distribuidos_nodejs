/**
 * UsuariosController
 *
 * @description :: Server-side logic for managing usuarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	create: function (req, res) {
 		if(req.method == 'POST' && req.param('User', null) != null){
            User.create(req.param('User')).done(function(errmodel){
            if (err) {
            	res.send("Error:Sorry!Something went Wrong");
            }else {
            	res.send("Successfully Created!");
            }

            });
        }else{
 			res.render( "user/create");
 		}
 	}
};

