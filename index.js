var Connector = require("./services/connector");
var Finder = require("./services/finder");
var Storage = require("./services/storage");

var connector = new Connector();
var finder = new Finder();
var storage = new Storage();

module.exports = {
	connector: connector,
	finder: finder,
	storage: storage
};