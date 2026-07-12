const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Find the misplaced item and remove it
const startOfMisplaced = code.indexOf(',\n  {\n    id: "algo-0x0a",');
if (startOfMisplaced === -1) {
    console.log("Could not find startOfMisplaced");
    process.exit(1);
}
const endOfMisplaced = code.indexOf('];', startOfMisplaced) + 2;

const misplacedCode = code.substring(startOfMisplaced, endOfMisplaced);
code = code.substring(0, startOfMisplaced) + '];\n' + code.substring(endOfMisplaced);

const realArrayEnd = code.indexOf('];\n\nexport default function App() {');

if (realArrayEnd === -1) {
    console.log("Could not find array end");
} else {
    code = code.substring(0, realArrayEnd) + misplacedCode.replace('];', '') + '\n' + code.substring(realArrayEnd);
}

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed App.tsx!");
