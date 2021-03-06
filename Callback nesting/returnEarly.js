var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
	getTitles(res);
}).listen(8000, "127.0.0.1");


function getTitles(res){
	fs.readFile('./titles.json', function(err, data) {
		if (err)	
			return handleError(res, err);
	    getTemplate(JSON.parse(data.toString()), res);
	});	
}

function handleError(res, err){
	console.error(err);
	res.end('Server Error');
}
function getTemplate(titles, res){
	fs.readFile('./template.html', function(err, data) {
		if (err) 
        	return handleError(res, err);	      
    	formatHtml(data.toString(), titles, res);	 
	});	
}

function formatHtml(tmpl, titles, res){
	var html = tmpl.replace('%', titles.join('</li><li>'));
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);	
}