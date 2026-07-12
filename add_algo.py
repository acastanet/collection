import re
import json

with open("src/App.tsx", "r") as f:
    content = f.read()

algo_html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Attracteur Etrange</title>
  <style>
    body { margin: 0; background-color: #030303; display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }
    canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; }
  </style>
</head>
<body>
  <div id="hud" style="position:absolute; top:20px; left:20px; color:rgba(255,255,255,0.7); font-family:monospace; font-size:10px; pointer-events:none; z-index:10;">
    <div>Clifford Attractor // V0x0B</div>
    <div id="params" style="opacity: 0.5; font-size: 8px; margin-top: 4px;"></div>
  </div>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d', { alpha: false });
    const hudParams = document.getElementById('params');
    
    let width, height;
    function resize() {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.fillStyle = '#030303';
      ctx.fillRect(0, 0, width, height);
    }
    window.addEventListener('resize', resize);
    resize();

    let x = 0, y = 0;
    
    function animate() {
      ctx.fillStyle = 'rgba(3, 3, 3, 0.08)';
      ctx.fillRect(0, 0, width, height);
      
      const t = Date.now() * 0.00015;
      const a = -1.4 + Math.sin(t) * 0.3;
      const b = 1.6 + Math.cos(t * 0.8) * 0.2;
      const c = 1.0;
      const d = 0.7;
      
      hudParams.innerHTML = \`a = \${a.toFixed(3)}<br/>b = \${b.toFixed(3)}<br/>c = \${c.toFixed(3)}<br/>d = \${d.toFixed(3)}\`;
      
      const scale = Math.min(width, height) * 0.18;
      const cx = width / 2;
      const cy = height / 2;
      
      const iter = window.innerWidth > 800 ? 60000 : 30000;
      
      for(let i = 0; i < iter; i++) {
        const nx = Math.sin(a * y) + c * Math.cos(a * x);
        const ny = Math.sin(b * x) + d * Math.cos(b * y);
        
        // Color based on spatial velocity
        const dx = nx - x;
        const dy = ny - y;
        const v = Math.sqrt(dx*dx + dy*dy);
        const hue = (v * 120 + 200) % 360;
        
        ctx.fillStyle = \`hsla(\${hue}, 80%, 70%, 0.15)\`;
        ctx.fillRect(cx + nx * scale, cy + ny * scale, 1.2, 1.2);
        
        x = nx;
        y = ny;
      }
      
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>"""

new_algo = """  ,{
    id: "algo-0x0b",
    title: "ALGO 0x0B",
    subTitle: "Attracteur Étrange",
    description: "Inspiré des systèmes dynamiques partagés par Simone Conradi. Un Attracteur de Clifford rendu en temps réel via Canvas 2D. Les paramètres (a, b) évoluent lentement et continuellement, révélant la nature fractale et chaotique du système. La couleur de chaque point est dérivée de sa 'vélocité' dans l'espace des phases.",
    type: "CANVAS 2D",
    code: `const nx = Math.sin(a * y) + c * Math.cos(a * x);
const ny = Math.sin(b * x) + d * Math.cos(b * y);
x = nx; y = ny;`,
    htmlContent: `XXX_HTML_CONTENT_XXX`,
    metadata: [
        {
            "label": "Système Dynamique",
            "value": "Attracteur de Clifford"
        },
        {
            "label": "Modulation",
            "value": "Dérive des Paramètres (a, b)"
        },
        {
            "label": "Colorimétrie",
            "value": "Phase-Velocity Mapping"
        }
    ]
  }
"""

new_algo = new_algo.replace("XXX_HTML_CONTENT_XXX", algo_html.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$'))

target = r'        {\s*"label": "Topologie",\s*"value": "Espace Torique"\s*}\s*]\s*}'
match = re.search(target, content)
if match:
    replacement = match.group(0) + new_algo
    content = content[:match.start()] + replacement + content[match.end():]
    with open("src/App.tsx", "w") as f:
        f.write(content)
    print("Added ALGO 0x0B successfully.")
else:
    print("Could not find target string to insert ALGO 0x0B.")
