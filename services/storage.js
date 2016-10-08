/* jshint esversion:6 */

var Database = require('node-json-db');
var os = require("os");

class Storage {

	constructor() {
		let file = os.homedir() + "/.avlight";
		this.db = new Database(file, true, false);
		this.db.push("devices", this.getDevices() || []);
	}

	addDevice(bulb) {
		this.db.push("devices/" + bulb.sid, bulb, false);
	}

	deleteDevice(bulb) {
		this.db.delete("devices/" + bulb.sid);
	}

	getDevices() {
		return this.db.getData("devices");
	}

}

module.exports = Storage;