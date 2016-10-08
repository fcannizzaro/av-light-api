/* jshint esversion:6 */

class Bulb {

	constructor(name, sid, address) {
		this.name = name;
		this.sid = sid;
		this.address = address;
	}

	// SETTERS

	setSid(address) {
		this.address = address;
	}

	setStatus(power, r, g, b, lum) {
		this.status = {
			power: power,
			r: r,
			g: g,
			b: b,
			lum: lum
		};
	}

	// GETTERS

	getName() {
		return this.name;
	}

	getAddress() {
		return this.address;
	}

	getSid() {
		return this.sid;
	}

	getStatus() {
		return this.status;
	}

}

module.exports = Bulb;