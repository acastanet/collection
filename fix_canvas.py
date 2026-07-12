import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Fix Algo 0x02
content = re.sub(
    r"function resize\(\) \{\s*canvas\.width = window\.innerWidth;\s*canvas\.height = window\.innerHeight;\s*gl\.viewport\(0, 0, canvas\.width, canvas\.height\);\s*\}\s*window\.addEventListener\('resize', resize\);\s*resize\(\);",
    r"canvas.width = 400; canvas.height = 400; gl.viewport(0, 0, 400, 400);",
    content
)
content = re.sub(
    r'body \{ margin: 0; background-color: #000; overflow: hidden; touch-action: none; \}\\n    canvas \{ display: block; width: 100vw; height: 100vh; cursor: grab; \}',
    r'body { margin: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; }\n    canvas { width: 400px; height: 400px; max-width: 100%; max-height: 100%; object-fit: contain; cursor: grab; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }',
    content
)

# Fix Algo 0x03
content = re.sub(
    r'let width = window\.innerWidth, height = window\.innerHeight;\\n    window\.addEventListener\("resize", \(\) => \{ width = window\.innerWidth; height = window\.innerHeight; camera\.aspect = width/height; camera\.updateProjectionMatrix\(\); renderer\.setSize\(width, height\); \}\);',
    r'const width = 400, height = 400;',
    content
)
content = re.sub(
    r'body \{ margin: 0; background-color: #000; overflow: hidden; \}\\n    canvas \{ display: block; width: 100vw; height: 100vh; background-color: #000; \}',
    r'body { margin: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; }\n    canvas { width: 400px !important; height: 400px !important; max-width: 100% !important; max-height: 100% !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; background-color: #000; }',
    content
)
content = re.sub(
    r'<div id="container" style="width: 100vw; height: 100vh; position: relative;"></div>',
    r'<div id="container" style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;"></div>',
    content
)

# Fix Algo 0x01
content = re.sub(
    r'createCanvas\(windowWidth, windowHeight\)',
    r'createCanvas(w=400,w)',
    content
)
content = re.sub(
    r"const ctx = canvas\.getContext\('2d'\);\\n    let width = window\.innerWidth, height = window\.innerHeight;\\n    canvas\.width = width; canvas\.height = height;\\n    let cx = width / 2, cy = height / 2;\\n    window\.addEventListener\('resize', \(\) => \{ width = window\.innerWidth; height = window\.innerHeight; canvas\.width = width; canvas\.height = height; cx = width/2; cy = height/2; \}\);",
    r"const ctx = canvas.getContext('2d');\n    const width = 400, height = 400;\n    canvas.width = 400; canvas.height = 400;\n    const cx = 200, cy = 200;",
    content
)
# For p5.js, the canvas is injected dynamically, so we style it globally:
content = re.sub(
    r'canvas \{ box-shadow: 0 0 20px rgba\(0,0,0,0\.8\); border-radius: 4px; \}',
    r'canvas { width: 400px !important; height: 400px !important; max-width: 100% !important; max-height: 100% !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }',
    content
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

