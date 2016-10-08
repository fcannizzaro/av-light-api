# av-light-api
Avantek Light Bulb API

# Structure
![structure](https://raw.githubusercontent.com/fcannizzaro/av-light-api/master/structure.png)

# Install
`npm install av-light-api`

# Module
```javascript
var avantek = require("av-light-api");
var connector = avantek.connector;
var finder = avantek.finder;
var storage = avantek.storage;
```

# Connector

### on(nulb) / off(bulb)
turn on/off device

### color(bulb, r, g, b)
change color using rgb color space

### brightness(bulb, lum)
change white brightness

### update(bulb)
update device status (rgb color, lum, power)

# Finder

### find(cb, sid)
```javascript
finder.find( bulb => {
  // do somethind with light bulb
}, "101512566e1fcea2ce6");
```

# Storage

### addDevice(bulb)
save new bulb to config file

### deleteDevice(bulb)
delete bulb from config file

### getDevices()
get list of saved devices

# License
MIT