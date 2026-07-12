const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Find the misplaced item and remove it
const startOfMisplaced = code.indexOf(',\n  {\n    id: "algo-0x0a",');
const endOfMisplaced = code.indexOf('];', startOfMisplaced) + 2;

const misplacedCode = code.substring(startOfMisplaced, endOfMisplaced);
code = code.substring(0, startOfMisplaced) + '];\n' + code.substring(endOfMisplaced);

// Now the misplaced code is like:
// ,
//   {
//     id: "algo-0x0a",
//     ...
//   }
// ];

// And the code now has `const currentArtwork = artworks[currentIndex];`

// Let's find where the artworks array really ends
const realArrayEnd = code.indexOf('\n];\n\nexport default function App() {');

if (realArrayEnd === -1) {
    const backupEnd = code.indexOf('];\n\nexport default function App');
    if (backupEnd !== -1) {
        code = code.substring(0, backupEnd) + misplacedCode.replace('];', '') + '\n' + code.substring(backupEnd);
    } else {
        console.log("Could not find array end");
    }
} else {
    code = code.substring(0, realArrayEnd) + misplacedCode.replace('];', '') + '\n' + code.substring(realArrayEnd);
}

fs.writeFileSync('src/App.tsx', code);
console.log("Fixed App.tsx!");
