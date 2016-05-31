/**
 * Usuarios.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	email:{type:'Number'},
	nombres:{type:'String'},
	apellidos:{type:'String'},
	password:{type:'String'},
	seccion:{type:'String'},
	rut:{ type:'Number'},
	estado: {type:'Boolean'}
  }
};

