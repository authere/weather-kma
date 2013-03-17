weather-kma
===========

weather info parsing from kma. The weather info is updated every one hour.

example:
```
var weather = require('weather-kma');
weather.get(function (err, rtn) {
  console.log('rtn=', rtn); 
  // rtn= { temperature: '8', sky: '맑음', humidity: '60' }
});
```
