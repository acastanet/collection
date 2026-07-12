const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /className="relative w-full h-full max-w-\[500px\] max-h-\[500px\] border border-white\/10 flex items-center justify-center overflow-hidden bg-black\/50 backdrop-blur-sm shadow-2xl transition-all duration-500"/,
  'className="relative w-full h-full border border-white/10 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl transition-all duration-500"'
);

fs.writeFileSync('src/App.tsx', code);
