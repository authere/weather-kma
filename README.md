weather-kma
===========

Weather info parsing from kma web site. 
kma provides the following weather info updated every one hour.

  * temperature in celcius
  * rain : since last one hour
  * wind in m/s
  * humidity in percentage
  * sky : weather in string.

example:
```
var weather = require('weather-kma');
weather.get(function (err, rtn) {
  console.log('rtn=', rtn); 
  // rtn= { temperature: '8', sky: '맑음', wind: '1', humidity: '60' }
});
```
