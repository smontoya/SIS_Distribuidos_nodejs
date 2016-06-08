var host = window.location.host;
console.log(host);
var serverIP = '192.168.56.102';
var port = 8080;

//Variables locales
var room = 'Principal';	//Sala que está conectado el usuario

//Conexión al socket del servidor
try {
	socket = io.connect(host);
	
	//Callback de la función multicast
	socket.on('multicastCallback', function (data) {
		$('#chat').append('<p>' + data.text + '</p>');
		console.log("multi", data)	
	});

	//Callback de la función broadcast
	socket.on('broadcastCallback', function (data) {
		console.log("broadcast", data.text)	
		$.smallBox({
			title : "Mensajes",
			content : "<i class='fa fa-clock-o'></i> "+ data.text,
			color : data.color || "#659265",
			iconSmall : "fa fa-check fa-2x fadeInRight animated",
			timeout : 5000
		});
	});

	console.log('Conexión del user con el Socket')
}
catch (err) {
	alert('No está disponible el servidor Node.js');
	debugger
}

$(document).ready(function() {
    $(".delete_user").click(function(event){
      event.preventDefault();
      if (confirm("¿Seguro que desea eliminar este usuario?")) {
        var url = $(this).attr('href')
        $.post({
          url: url
        }).done(function() {
          $(this).closest('tr').hide(500).remove();
          socket.emit('broadcast', {text: "Un usuario ha sido eliminado ", color:"#FF2222"});
        });
      }
    })
  
	//Cuando el documento está disponible, se conectará
	//con el socket en la sala principal
	socket.emit('initRoom', {room: room});
	if (MENSAJE.text)
		socket.emit('broadcast', {text: MENSAJE.text});

	//En caso que se haga click al botón enviar,
	//se enviará a los usuarios que son participes
	//de la misma sala
	$('#btn-send').click(function() {
		var message = $('#text-send').val();
		$('#text-send').val('');
		socket.emit('multicast', {text: message, room: room});
	});
	$("#create_user").on("submit", function(){
		MENSAJE.text = USUARIO + " ha creado un nuevo usuario";
    	socket.emit('broadcast', {text: MENSAJE.text, color: "#296191"});
	})
	$("#update_user").on("submit", function(){
		MENSAJE.text = USUARIO + " ha actualizado un usuario";
    	socket.emit('broadcast', {text: MENSAJE.text, color: "#296191"});
	})
    $('.logout_btn').click(function (data) {
    	MENSAJE.text = USUARIO + " ha cerrado session";
    	socket.emit('broadcast', {text: MENSAJE.text, color: "#296191"});
    });
});