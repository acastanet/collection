const fs = require('fs');
const js = fs.readFileSync('/tmp/index.js', 'utf8');
const start = js.indexOf('En=[{id:"algo-0x01"');
const end = js.indexOf('id:"algo-0x07"');
console.log(js.substring(start + 3, end + 30));
