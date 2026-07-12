const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
    '#controls {\n      position: absolute; bottom: 15px; right: 15px;',
    '#controls {\n      position: absolute; top: 15px; right: 15px;'
);
fs.writeFileSync('src/App.tsx', code);
console.log("Replaced `#controls` position.");
