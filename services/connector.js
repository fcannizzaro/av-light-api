/* jshint esversion:6 */

var Bulb = require("../model/bulb");
var dgram = require("dgram");

const POWER = {
	ON: {
		on: 1
	},
	OFF: {
		on: 0
	}
};

class Connector {

	constructor() {
		this.devices = [];
		this.polling();
	}

	// create a buffer from a json
	bufferize(value) {
		return new Buffer(JSON.stringify(value));
	}

	observeDevice(bulb) {

		for (var i = 0; i < this.devices.length; i++)
			if (this.devices[i].getSid() == bulb.getSid())
				return;

		this.devices.push(bulb);

	}

	polling() {

		setInterval(() => {

			for (var i = 0; i < this.devices.length; i++)
				this.update(this.devices[i]);

		}, 1000);

	}

	// method to connect to light bulb
	// sending a command and its arguments
	connect(bulb, command, content) {

		this.observeDevice(bulb);

		let body = {
			uid: '0',
			sid: bulb.getSid(),
			cmd: command,
			arg: content
		};

		let buffer = this.bufferize(body);
		let client = dgram.createSocket('udp4');
		let callback = () => client.close();

		client.on('message', data => {

			var json = JSON.parse(data);

			if (!json.result)
				return;

			json = json.result;

			// update status
			bulb.setStatus(json.switch == 1, json.r, json.g, json.b, json.lum);

		});

		client.send(buffer, 0, buffer.length, 14580, bulb.getAddress(), err => callback);

	}

	// turn on bulb
	on(bulb) {
		this.connect(bulb, "switch", POWER.ON);
	}

	// turn off bulb
	off(bulb) {
		this.connect(bulb, "switch", POWER.OFF);
	}

	// change color RGB
	color(bulb, r, g, b) {
		this.connect(bulb, "color", {
			r: r,
			g: g,
			b: b
		});
	}

	// change brightness (ONLY WHITE)
	brightness(bulb, lum) {

		if (lum > 255)
			lum = 255;

		if (lum < 0)
			lum = 0;

		this.connect(bulb, "white", {
			lum: lum,
			"color-temp": 0
		});

	}

	update(bulb) {
		this.connect(bulb, "status", {});
	}

}

module.exports = Connector;