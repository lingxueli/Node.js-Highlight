var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
	if(req.url == '/'){
		fs.readFile('./titles.json', function(err, data) {
			// data: data from titles.json
			if (err) {
				// if loading titles.json fails, terminate the response of http server
		    	console.error(err);
		        res.end('Server Error');
		    }else{
		    	// titles: an obeject converted from titles.json data
		    	// JSON.parse(): string -> object
		    	var titles = JSON.parse(data.toString());

		    	fs.readFile('./template.html', function(err, data) {
		    		// data: data from template.html
		    		if (err) {
		    			// if loading template.html fails, terminate the response of http server
		            	console.error(err);
		            	res.end('Server Error');		      
		        	}else{
		        		// tmpl: a string converted from template.html data
            			var tmpl = data.toString();
            			/* 
            			titles:
            			[ 'Kazakhstan is a huge country... What\'s going on there?',
						  'This weather is making me craaazy',
						  'My neighbor sort of howls at night' ]

            			titles.join('</li><li>'):
            				Kazakhstan is a huge country... What's going on there?</li><li>This weather is making me craaazy</li><li>My neighbor sort of howls at night
						*/
            			var html = tmpl.replace('%', titles.join('</li><li>'));

            			res.writeHead(200, {'Content-Type': 'text/html'});
			            res.end(html);		  
		        	}
		    	});
		    }
		});
	}
}).listen(8000, "127.0.0.1");