const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /  useEffect\(\(\) => \{\n    if \(iframeRef\.current\) \{\n      const doc = iframeRef\.current\.contentDocument \|\| iframeRef\.current\.contentWindow\?\.document;\n      if \(doc\) \{\n        doc\.open\(\);\n        doc\.write\(currentArtwork\.htmlContent\);\n        doc\.close\(\);\n      \}\n    \}\n  \}, \[currentArtwork, currentIndex\]\);/,
  ''
);

code = code.replace(
  /              ref=\{iframeRef\}\n              className="w-full h-full border-none z-10 relative"\n              title=\{currentArtwork\.title\}\n              sandbox="allow-scripts allow-same-origin"\n/,
  '              className="w-full h-full border-none z-10 relative"\n              title={currentArtwork.title}\n              sandbox="allow-scripts allow-same-origin"\n              srcDoc={currentArtwork.htmlContent}\n'
);

fs.writeFileSync('src/App.tsx', code);
