var net = require('net');

var server = net.createServer(function(socket) {
	// function(socket): a listener of the 'connection' event. The 'connection' event is emitted when a new connection is made.
	// socket: the 'connection' Event or <net.Socket>. It implements a duplex Stream interface (EventEmitter). 

	socket.on('data', function(data){
		socket.write(data);
	});
	// Eventemitter.on(eventName, listener)
	// function(data): a listener of the 'data' event
});

server.listen(8888);