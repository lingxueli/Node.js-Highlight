var events = require('events'), net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};


channel.on('join', function(id, client){
	this.clients[id] = client;
	this.subscriptions[id] = function(senderId, message) {

	};
});

channel.on('leave', function(id){

});

channel.on('shutdown', function(){

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

  	client.on('data', function(data) {
  	
  	});



});
