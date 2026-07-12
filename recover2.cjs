const fs = require('fs');
const js = fs.readFileSync('/tmp/index.js', 'utf8');
const start = js.indexOf('title:"ALGO 0x01"');
console.log(js.substring(start - 100, start + 500));
