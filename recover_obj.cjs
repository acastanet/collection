const fs = require('fs');
const js = fs.readFileSync('/tmp/index.js', 'utf8');

const start = js.indexOf('En=[{id:"algo-0x01"');
const end = js.indexOf(',{id:"algo-0x07"');
let arrayStr = js.substring(start + 3, end) + ']'; // This is '[{id:"algo-0x01"...}]'

// We will use new Function to evaluate it.
// Some variables might be referenced inside? Let's hope not.
try {
  let arr = new Function('return ' + arrayStr)();
  fs.writeFileSync('recovered_artworks.json', JSON.stringify(arr, null, 2));
  console.log("Success! Saved " + arr.length + " artworks.");
} catch(e) {
  console.log("Error evaluating:", e);
}
