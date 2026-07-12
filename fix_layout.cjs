const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<div className="w-full md:w-3\/5 h-\[60vh\] md:h-auto md:self-stretch relative flex items-center justify-center p-4 md:p-12 shrink-0">/g,
  '<div className="w-full md:w-3/5 h-[60vh] md:h-auto md:self-stretch relative flex items-center justify-center p-4 md:p-8 shrink-0">'
);

code = code.replace(
  /<div className="relative w-full max-w-\[min\(100%,500px\)\] aspect-square border border-white\/10 flex items-center justify-center overflow-hidden bg-black\/50 backdrop-blur-sm shadow-2xl transition-all duration-500">/g,
  '<div className="relative w-full max-w-[calc(60vh-2rem)] md:max-w-[calc(100vh-10rem)] aspect-square border border-white/10 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl transition-all duration-500">'
);

fs.writeFileSync('src/App.tsx', code);
