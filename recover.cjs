const fs = require('fs');
const js = fs.readFileSync('/tmp/index.js', 'utf8');

// The file is minified, we need to extract the artworks array.
// Look for something like "title:"ALGO 0x01""
const start = js.indexOf('title:"ALGO 0x01"');
console.log("Start index:", start);
