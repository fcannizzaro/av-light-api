/* jshint esversion:6 */

var Bulb = require("../model/bulb");
var network = require("network-address");
var dgram = require("dgram");

class Finder {

	// create a buffer from a json
	bufferize(value) {
		return new Buffer(JSON.stringify(value));
	}

	// find light bulb on local network / check status
	connect(address, cb, sid) {

		let body = {
			uid: '0',
			sid: sid,
			cmd: "devfind"
		};

		if (sid)
			body.cmd = "status";

		let buffer = this.bufferize(body);
		let client = dgram.createSocket('udp4');
		let callback = () => client.close();

		client.on('message', data => {

			var json = JSON.parse(data);

			if (sid)
				cb(new Bulb("", sid, address));
			else
				cb(new Bulb(json.arg.devname, json.arg.sid, address));

		});

		client.send(buffer, 0, buffer.length, 14580, address, err => setTimeout(callback, 500));

	}

	addressBuilder() {
		var address = network();
		var index = address.lastIndexOf(".");
		return address.substr(0, index) + ".";
	}

	find(cb, sid) {

		var base = this.addressBuilder();

		for (var i = 0; i < 200; i++)
			this.connect(base + i, cb, sid);

	}

}

module.exports = Finder;