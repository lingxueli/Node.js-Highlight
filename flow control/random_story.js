var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');
var configFilename = './rss_feeds.txt';

// make sure the file containing RSS info exists
function checkForRSSFile(){
	fs.exist(configFilename, function(exist){
		if(!exist)
			return next(new Error('Missing RSS file: ' + configFilename));
		next(null, configFilename);
	});
}

// Parse the feed URLs
function readRSSFile (configFilename) {
	fs.readRSSFile(configFilename, function(err, feedList){
		if(err) return next(err);

		// convert feed URLs to a string and into an array of URLs
		feedList = feedList.toString().replace(/^\s+|\s+$/g,'').split("\n");

		var random = Math.floor(Math.random()*feedList.length);
		next(null, feedList[random]);
	})
}

// send HTTP request to the URL
function downloadRSSFeed(feedUrl){
	request({uri:feedUrl}, function(err, res, body) {
		if (err) return next(err);
		if (res.statusCode != 200)
			return next(new Error('Abnormal response status code'));

		next(null, body);
	});
}

// parse RSS data into an array of items
function parseRSSFeed(rss){
	var handler = new htmlparser.RssHandler();
	var parser = new htmlparser.Parser(handler);
	parser.parseComplete(rss);

	if(!handler.dom.items.length)
		return next(new Error('No RSS itmes found'));

	var item = handler.dom.items.shift();
	console.log(item.title);
	console.log(item.link);
}

var tasks = [checkForRSSFile, readRSSFile, downloadRSSFeed, parseRSSFeed];
function next(err, result) {
	if (err) throw err;

	// next task comes from the array of tasks
	// Array.prototype.shift(): removes the first element from an array and returns that element
	var currentTask = tasks.shift();
	if (currentTask){
		// execute current task
		currentTask(result);
	}
}

// start serial execution of tasks
next();