"use strict";
var Iconv = require('iconv').Iconv;
var iconv = new Iconv('EUC-KR', 'UTF-8//TRANSLIT//IGNORE');
var jsdom = require('jsdom');

exports.get = function (cb) {
  jsdom.env({
    html: 'http://www.kma.go.kr/weather/main.jsp',
    encoding: 'binary',
    scripts: [
      'http://code.jquery.com/jquery-1.5.min.js'
    ],
    done: function (err, window) {
      if (err) { return cb(err); }
      var $ = window.$;
      var str, buf, rtn = {};
      $("div.wrap_weather_info > p.info").each(function () {
        str = $(this).text();
        if (str) {
          var re = str.match(/[\+\-]?[\d]*/),
          temp = re && re[0];
          if (temp) { rtn.temperature = temp; }
        }

        str = $(this).attr('title');
        if (str) {
          buf = new Buffer(str.length);
          buf.write(str, 0, str.length, 'binary');
          rtn.sky = iconv.convert(buf).toString();
        }
      });

      $("div.wrap_weather_info > ul > li").each(function () {
        var str = $(this).text(), 
        buf, hum, wind, rain, re;
        if (str) {
          buf = new Buffer(str.length),
          buf.write(str, 0, str.length, 'binary');
          //console.info('str=', iconv.convert(buf).toString());
          re = iconv.convert(buf).toString().match(/습도[^\d\+\-]*([\+\-]?\d+)/);
          hum = re && re[1];
          if (hum) { rtn.humidity = hum; return; }
          re = iconv.convert(buf).toString().match(/바람[^\d\+\-]*([\+\-]?\d+)/);
          wind = re && re[1];
          if (wind) { rtn.wind = wind; return; }
          re = iconv.convert(buf).toString().match(/1시간 강수량[^\d\+\-]*([\+\-]?\d+)/);
          rain = re && re[1];
          if (rain) { rtn.rain = rain; return; }
        }
      });
      //console.info('rtn=', rtn);
      window.close();
      return cb(err, rtn);
    }
  });
};
/*
exports.get(function (err, rtn) {
  console.log('rtn=', rtn);
});
*/
