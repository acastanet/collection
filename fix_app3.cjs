const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// I'm going to look for `export default function App() {`
const appFuncIdx = code.indexOf('export default function App() {');

// The good part of the file is before ALGO 0x0A was first inserted. Let's find ALGO 0x09.
const algo9Idx = code.indexOf(',\n  {\n    id: "algo-0x09"');
const algo9End = code.indexOf('    ]\n  }', algo9Idx) + '    ]\n  }'.length;

const beforeApp = code.substring(0, algo9End) + '\n];\n\n';
const appFunc = code.substring(appFuncIdx);

// Now beforeApp is a clean valid artworks array ending with ALGO 0x09.
// And appFunc is the App component code.

const algo10 = {
  id: "algo-0x0a",
  title: "ALGO 0x0A",
  subTitle: "Vector Flow Field",
  description: "A high-density particle system tracing the gradients of a multi-octave 3D simplex noise field. Thousands of autonomous agents sample the continuous vector field to determine their headings. Their trails accumulate over time to reveal the invisible topological contours, producing organic, hair-like fluid structures.",
  type: "CANVAS 2D",
  code: `const angle = noise3D(p.x * scale, p.y * scale, time) * Math.PI * 4;\nconst vx = Math.cos(angle) * speed;\nconst vy = Math.sin(angle) * speed;\np.x += vx; p.y += vy;\nif(outOfBounds) p = randomPosition();`,
  htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vector Flow Field</title>
  <style>
    body { margin: 0; background-color: #030303; overflow: hidden; }
    canvas { display: block; width: 100vw; height: 100vh; touch-action: none; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js"><\/script>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let width, height;
    function resize() {
      width = canvas.width = window.innerWidth * window.devicePixelRatio;
      height = canvas.height = window.innerHeight * window.devicePixelRatio;
    }
    window.addEventListener('resize', resize);
    resize();

    const simplex = new SimplexNoise();
    const numParticles = window.innerWidth > 800 ? 6000 : 3000;
    const particles = [];
    
    for(let i=0; i<numParticles; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: 0, vy: 0,
            hue: Math.random() * 60 - 20
        });
    }

    ctx.fillStyle = '#030303';
    ctx.fillRect(0, 0, width, height);

    let zOff = 0;

    function animate() {
        ctx.fillStyle = 'rgba(3, 3, 3, 0.05)';
        ctx.fillRect(0, 0, width, height);
        
        const scale = 0.0015;
        const speed = 2.0;
        zOff += 0.002;

        for(let i=0; i<particles.length; i++) {
            let p = particles[i];
            
            let angle = simplex.noise3D(p.x * scale, p.y * scale, zOff) * Math.PI * 4;
            
            p.vx = Math.cos(angle) * speed;
            p.vy = Math.sin(angle) * speed;
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            
            p.x += p.vx;
            p.y += p.vy;
            
            ctx.lineTo(p.x, p.y);
            
            let hue = (angle / (Math.PI * 4)) * 120 + 200; // Blue/cyan/purple
            ctx.strokeStyle = \`hsla(\${hue}, 80%, 60%, 0.4)\`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Wrap edges
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        }
        
        requestAnimationFrame(animate);
    }
    animate();
  <\/script>
</body>
</html>`,
  metadata: [
    { label: "Algorithm", value: "Simplex Noise Flow" },
    { label: "Entities", value: "6,000 Autonomous Agents" },
    { label: "Topology", value: "Torus Wrap Space" }
  ]
};

const algo10String = ',\n  {\n    id: "algo-0x0a",\n    title: "ALGO 0x0A",\n    subTitle: "Vector Flow Field",\n    description: "A high-density particle system tracing the gradients of a multi-octave 3D simplex noise field. Thousands of autonomous agents sample the continuous vector field to determine their headings. Their trails accumulate over time to reveal the invisible topological contours, producing organic, hair-like fluid structures.",\n    type: "CANVAS 2D",\n    code: ' + JSON.stringify(algo10.code) + ',\n    htmlContent: ' + JSON.stringify(algo10.htmlContent) + ',\n    metadata: ' + JSON.stringify(algo10.metadata, null, 4).replace(/\n/g, '\n    ') + '\n  }';


const finalCode = beforeAlgo.replace('\n];\n\n', algo10String + '\n];\n\n') + appFunc;
fs.writeFileSync('src/App.tsx', finalCode);
console.log("App.tsx definitively fixed.");
