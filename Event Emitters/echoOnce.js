var net = require('net');

var server = net.createServer(function(socket) {
	// function(socket): a listener of the 'connection' event. The 'connection' event is emitted when a new connection is made.
	// socket: Event: 'connection' and instance of class <net.Socket>. It implements a duplex Stream interface (EventEmitter). 

	socket.once('data', function(data){
		socket.write(data);
	});
	// Eventemitter.on(eventName, listener)
	// function(data): a listener of the 'data' event
	// 'data' Event: of class <net.Socket>; emitted when data is received.
});

server.listen(8888);

/*
start the server and connect to the echo server by:
$ telnet 127.0.0.1 8888
*/