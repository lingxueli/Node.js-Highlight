var events = require('events'), net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};


channel.on('join', function(id, client){
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message) {
		// example 1: senderID = '', message = 'Chat has shut down';
		// example 2: senderID = the source user id, message = message from the source user
		if (id != senderID){
			this.clients[id].write(message);
			// example 1: this client will receive a message: 'Chat has shut down'.
			// example 2: this source will receive an echo message  
		}
		
	};

	// register subscriptions[id] as the listener of 'boradcast' event
	this.on('boradcast', this.subscriptions[id]);
});

channel.on('leave', function(id){

});

channel.on('shutdown', function(){
	// fire 'boradcast' event, and pass supplied arguments
	channel.emit('broadcast', '', "Chat has shut down.\n");

	// removes all listeners of the 'broadcast' event
	// all functions used for sending message to users are removed from the listener list
	channel.removeAllListeners('broadcast');
});


var server = net.createServer(function(client){
	// function(client): connectionListener, a listener for a connection event.
	// client: a connection event, also a <net.Socket> instance
	var id = client.remoteAddress + ':' + client.remotePort;	

	// 'connect' Event: Emitted when a socket connection is successfully established.
	client.on('connect', function() {
		// fire 'join' Event and pass the supplied arguments
		// id: user addr, client: the Socket instance
		channel.emit('join', id, client); 
	});
	// when data is received 
  	client.on('data', function(data) {
  		data = data.toString();

  		// if the user types shutdown\r, fire shutdown event
  		if (data == "shutdown\r\n"){
  			channel.emit('shutdown');
  		}

  		// if the server is shutdown, this function would not be effective
 		// otherwise, fire 'broadcast' event
  		channel.emit('broadcast', id, data); 
  	});



});
