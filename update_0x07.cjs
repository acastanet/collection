const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = code.indexOf('id: "algo-0x07"');
const nextIdx = code.indexOf('id: "algo-0x08"');
console.log(startIdx, nextIdx);
