/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/ms";
exports.ids = ["vendor-chunks/ms"];
exports.modules = {

/***/ "(action-browser)/../node_modules/ms/index.js":
/*!***********************************!*\
  !*** ../node_modules/ms/index.js ***!
  \***********************************/
/***/ ((module) => {

eval("/**\r\n * Helpers.\r\n */\r\n\r\nvar s = 1000;\r\nvar m = s * 60;\r\nvar h = m * 60;\r\nvar d = h * 24;\r\nvar w = d * 7;\r\nvar y = d * 365.25;\r\n\r\n/**\r\n * Parse or format the given `val`.\r\n *\r\n * Options:\r\n *\r\n *  - `long` verbose formatting [false]\r\n *\r\n * @param {String|Number} val\r\n * @param {Object} [options]\r\n * @throws {Error} throw an error if val is not a non-empty string or a number\r\n * @return {String|Number}\r\n * @api public\r\n */\r\n\r\nmodule.exports = function(val, options) {\r\n  options = options || {};\r\n  var type = typeof val;\r\n  if (type === 'string' && val.length > 0) {\r\n    return parse(val);\r\n  } else if (type === 'number' && isFinite(val)) {\r\n    return options.long ? fmtLong(val) : fmtShort(val);\r\n  }\r\n  throw new Error(\r\n    'val is not a non-empty string or a valid number. val=' +\r\n      JSON.stringify(val)\r\n  );\r\n};\r\n\r\n/**\r\n * Parse the given `str` and return milliseconds.\r\n *\r\n * @param {String} str\r\n * @return {Number}\r\n * @api private\r\n */\r\n\r\nfunction parse(str) {\r\n  str = String(str);\r\n  if (str.length > 100) {\r\n    return;\r\n  }\r\n  var match = /^(-?(?:\\d+)?\\.?\\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(\r\n    str\r\n  );\r\n  if (!match) {\r\n    return;\r\n  }\r\n  var n = parseFloat(match[1]);\r\n  var type = (match[2] || 'ms').toLowerCase();\r\n  switch (type) {\r\n    case 'years':\r\n    case 'year':\r\n    case 'yrs':\r\n    case 'yr':\r\n    case 'y':\r\n      return n * y;\r\n    case 'weeks':\r\n    case 'week':\r\n    case 'w':\r\n      return n * w;\r\n    case 'days':\r\n    case 'day':\r\n    case 'd':\r\n      return n * d;\r\n    case 'hours':\r\n    case 'hour':\r\n    case 'hrs':\r\n    case 'hr':\r\n    case 'h':\r\n      return n * h;\r\n    case 'minutes':\r\n    case 'minute':\r\n    case 'mins':\r\n    case 'min':\r\n    case 'm':\r\n      return n * m;\r\n    case 'seconds':\r\n    case 'second':\r\n    case 'secs':\r\n    case 'sec':\r\n    case 's':\r\n      return n * s;\r\n    case 'milliseconds':\r\n    case 'millisecond':\r\n    case 'msecs':\r\n    case 'msec':\r\n    case 'ms':\r\n      return n;\r\n    default:\r\n      return undefined;\r\n  }\r\n}\r\n\r\n/**\r\n * Short format for `ms`.\r\n *\r\n * @param {Number} ms\r\n * @return {String}\r\n * @api private\r\n */\r\n\r\nfunction fmtShort(ms) {\r\n  var msAbs = Math.abs(ms);\r\n  if (msAbs >= d) {\r\n    return Math.round(ms / d) + 'd';\r\n  }\r\n  if (msAbs >= h) {\r\n    return Math.round(ms / h) + 'h';\r\n  }\r\n  if (msAbs >= m) {\r\n    return Math.round(ms / m) + 'm';\r\n  }\r\n  if (msAbs >= s) {\r\n    return Math.round(ms / s) + 's';\r\n  }\r\n  return ms + 'ms';\r\n}\r\n\r\n/**\r\n * Long format for `ms`.\r\n *\r\n * @param {Number} ms\r\n * @return {String}\r\n * @api private\r\n */\r\n\r\nfunction fmtLong(ms) {\r\n  var msAbs = Math.abs(ms);\r\n  if (msAbs >= d) {\r\n    return plural(ms, msAbs, d, 'day');\r\n  }\r\n  if (msAbs >= h) {\r\n    return plural(ms, msAbs, h, 'hour');\r\n  }\r\n  if (msAbs >= m) {\r\n    return plural(ms, msAbs, m, 'minute');\r\n  }\r\n  if (msAbs >= s) {\r\n    return plural(ms, msAbs, s, 'second');\r\n  }\r\n  return ms + ' ms';\r\n}\r\n\r\n/**\r\n * Pluralization helper.\r\n */\r\n\r\nfunction plural(ms, msAbs, n, name) {\r\n  var isPlural = msAbs >= n * 1.5;\r\n  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uLi9ub2RlX21vZHVsZXMvbXMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxlQUFlO0FBQzFCLFdBQVcsUUFBUTtBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JfaW52ZXN0b3Jfd2ViLy4uL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcz9iNDYyIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBIZWxwZXJzLlxyXG4gKi9cclxuXHJcbnZhciBzID0gMTAwMDtcclxudmFyIG0gPSBzICogNjA7XHJcbnZhciBoID0gbSAqIDYwO1xyXG52YXIgZCA9IGggKiAyNDtcclxudmFyIHcgPSBkICogNztcclxudmFyIHkgPSBkICogMzY1LjI1O1xyXG5cclxuLyoqXHJcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXHJcbiAqXHJcbiAqIE9wdGlvbnM6XHJcbiAqXHJcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXHJcbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xyXG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xyXG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc0Zpbml0ZSh2YWwpKSB7XHJcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcclxuICB9XHJcbiAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXHJcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcclxuICApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xyXG4gIHN0ciA9IFN0cmluZyhzdHIpO1xyXG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHZhciBtYXRjaCA9IC9eKC0/KD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx3ZWVrcz98d3x5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcclxuICAgIHN0clxyXG4gICk7XHJcbiAgaWYgKCFtYXRjaCkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xyXG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICBjYXNlICd5ZWFycyc6XHJcbiAgICBjYXNlICd5ZWFyJzpcclxuICAgIGNhc2UgJ3lycyc6XHJcbiAgICBjYXNlICd5cic6XHJcbiAgICBjYXNlICd5JzpcclxuICAgICAgcmV0dXJuIG4gKiB5O1xyXG4gICAgY2FzZSAnd2Vla3MnOlxyXG4gICAgY2FzZSAnd2Vlayc6XHJcbiAgICBjYXNlICd3JzpcclxuICAgICAgcmV0dXJuIG4gKiB3O1xyXG4gICAgY2FzZSAnZGF5cyc6XHJcbiAgICBjYXNlICdkYXknOlxyXG4gICAgY2FzZSAnZCc6XHJcbiAgICAgIHJldHVybiBuICogZDtcclxuICAgIGNhc2UgJ2hvdXJzJzpcclxuICAgIGNhc2UgJ2hvdXInOlxyXG4gICAgY2FzZSAnaHJzJzpcclxuICAgIGNhc2UgJ2hyJzpcclxuICAgIGNhc2UgJ2gnOlxyXG4gICAgICByZXR1cm4gbiAqIGg7XHJcbiAgICBjYXNlICdtaW51dGVzJzpcclxuICAgIGNhc2UgJ21pbnV0ZSc6XHJcbiAgICBjYXNlICdtaW5zJzpcclxuICAgIGNhc2UgJ21pbic6XHJcbiAgICBjYXNlICdtJzpcclxuICAgICAgcmV0dXJuIG4gKiBtO1xyXG4gICAgY2FzZSAnc2Vjb25kcyc6XHJcbiAgICBjYXNlICdzZWNvbmQnOlxyXG4gICAgY2FzZSAnc2Vjcyc6XHJcbiAgICBjYXNlICdzZWMnOlxyXG4gICAgY2FzZSAncyc6XHJcbiAgICAgIHJldHVybiBuICogcztcclxuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XHJcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XHJcbiAgICBjYXNlICdtc2Vjcyc6XHJcbiAgICBjYXNlICdtc2VjJzpcclxuICAgIGNhc2UgJ21zJzpcclxuICAgICAgcmV0dXJuIG47XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcclxuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XHJcbiAgaWYgKG1zQWJzID49IGQpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XHJcbiAgfVxyXG4gIGlmIChtc0FicyA+PSBoKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xyXG4gIH1cclxuICBpZiAobXNBYnMgPj0gbSkge1xyXG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcclxuICB9XHJcbiAgaWYgKG1zQWJzID49IHMpIHtcclxuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XHJcbiAgfVxyXG4gIHJldHVybiBtcyArICdtcyc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cclxuICpcclxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xyXG4gIHZhciBtc0FicyA9IE1hdGguYWJzKG1zKTtcclxuICBpZiAobXNBYnMgPj0gZCkge1xyXG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGQsICdkYXknKTtcclxuICB9XHJcbiAgaWYgKG1zQWJzID49IGgpIHtcclxuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBoLCAnaG91cicpO1xyXG4gIH1cclxuICBpZiAobXNBYnMgPj0gbSkge1xyXG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIG0sICdtaW51dGUnKTtcclxuICB9XHJcbiAgaWYgKG1zQWJzID49IHMpIHtcclxuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBzLCAnc2Vjb25kJyk7XHJcbiAgfVxyXG4gIHJldHVybiBtcyArICcgbXMnO1xyXG59XHJcblxyXG4vKipcclxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gcGx1cmFsKG1zLCBtc0FicywgbiwgbmFtZSkge1xyXG4gIHZhciBpc1BsdXJhbCA9IG1zQWJzID49IG4gKiAxLjU7XHJcbiAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBuKSArICcgJyArIG5hbWUgKyAoaXNQbHVyYWwgPyAncycgOiAnJyk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(action-browser)/../node_modules/ms/index.js\n");

/***/ })

};
;