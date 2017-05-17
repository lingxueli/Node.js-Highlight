// create the constructor for Watcher class
function Watcher(watchDir, processedDir) {
  this.watchDir = watchDir;
  this.processedDir = processedDir;
}

// the Watcher class inherits EventEmitter's behavior
var events = require('events'), util = require('util');
util.inherits(Watcher, events.EventEmitter);

var fs = require('fs')
  , watchDir = './watch'
  , processedDir  = './done';

// extends the Watcher class with two methods
Watcher.prototype.watch = function() { 
  var watcher = this;
  // fs.readdir(watchDir, callback): read the contents of watchDir; files: the array of files in the directory
  fs.readdir(this.watchDir, function(err, files) {
    if (err) throw err;
    for(index in files) {
      // fire 'process' event for each files in watchDir
      watcher.emit('process', files[index]); 
    }
  })
}

Watcher.prototype.start = function() { 
  var watcher = this;
  // fs.watchFile(watchDir, callback): watch for changes on watchDir; fire callback each time the directory is accessed 
  fs.watchFile(watchDir, function() {
    // each time the directory is accessed, call watch()
    watcher.watch();
  });
}

watcher = new Watcher(watchDir, processedDir);
watcher.on('process', function process(file) {
  var watchFile      = this.watchDir + '/' + file;
  var processedFile  = this.processedDir + '/' + file.toLowerCase();

  // reanme the file to lowercase letters and move it
  fs.rename(watchFile, processedFile, function(err) {
    if (err) throw err;
  });
});

watcher.start();



