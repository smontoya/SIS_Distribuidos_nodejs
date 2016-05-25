/**
 * Ingresos.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	monto:{type:'Number'},
  	formaPago:{type:'String'},
  	//idcajero:{type:'Number'}, //esto es de DB relacionales casi no se usan ID para relaciones
  	fecha:{type:'Number'}
  }
};

