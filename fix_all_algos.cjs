const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Algo 2
code = code.replace(
  /<canvas id="c" width="400" height="400"><\/canvas>/g,
  '<canvas id="c"></canvas>'
);
code = code.replace(
  /body \{ margin: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; \}\n    canvas \{ box-shadow: 0 0 20px rgba\(0,0,0,0\.8\); border-radius: 4px; cursor: grab; \}/,
  `body { margin: 0; background-color: #000; overflow: hidden; touch-action: none; }
    canvas { display: block; width: 100vw; height: 100vh; cursor: grab; }`
);
code = code.replace(
  /const gl = canvas\.getContext\('webgl2'\);\n    \n    const prog = gl\.createProgram\(\);/g,
  `const gl = canvas.getContext('webgl2');\n    \n    function resize() {\n      canvas.width = window.innerWidth * window.devicePixelRatio;\n      canvas.height = window.innerHeight * window.devicePixelRatio;\n      gl.viewport(0, 0, canvas.width, canvas.height);\n    }\n    window.addEventListener('resize', resize);\n    resize();\n    \n    const prog = gl.createProgram();`
);

// Algo 3
code = code.replace(
  /<canvas id="c" width="500" height="500"><\/canvas>/g,
  '<canvas id="c"></canvas>'
);
code = code.replace(
  /body \{ margin: 0; background-color: #050505; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: monospace; \}\n    canvas \{ box-shadow: 0 20px 50px rgba\(0,0,0,0\.5\); cursor: pointer; \}/,
  `body { margin: 0; background-color: #050505; overflow: hidden; font-family: monospace; }
    canvas { display: block; width: 100vw; height: 100vh; cursor: pointer; }`
);
code = code.replace(
  /const ctx = canvas\.getContext\('2d'\);\n    \n    \/\/ Data structures/g,
  `const ctx = canvas.getContext('2d');\n    let width, height;\n    function resize() {\n      width = canvas.width = window.innerWidth * window.devicePixelRatio;\n      height = canvas.height = window.innerHeight * window.devicePixelRatio;\n    }\n    window.addEventListener('resize', resize);\n    resize();\n    \n    // Data structures`
);
// replace width and height in algo 3 logic
code = code.replace(
  /const width = 500;\n    const height = 500;/g,
  '' // Already declared and updated in resize
);

// Algo 9
code = code.replace(
  /canvas \{ width: 95vmin; height: 95vmin; box-shadow: 0 10px 40px rgba\(0,0,0,0\.15\); cursor: crosshair; touch-action: none; \}/g,
  `canvas { display: block; width: 100vw; height: 100vh; cursor: crosshair; touch-action: none; }`
);
code = code.replace(
  /body \{ margin: 0; background-color: #f0ebd8; overflow: hidden; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: 'JetBrains Mono', monospace; \}/g,
  `body { margin: 0; background-color: #f0ebd8; overflow: hidden; font-family: 'JetBrains Mono', monospace; }`
);

fs.writeFileSync('src/App.tsx', code);
