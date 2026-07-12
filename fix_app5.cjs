const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The App code should be:
const pureAppCode = `export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentArtwork = artworks[currentIndex];

  useEffect(() => {
    if (iframeRef.current) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(currentArtwork.htmlContent);
        doc.close();
      }
    }
  }, [currentArtwork, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-white/20 overflow-hidden">
      {/* Top Nav Ribbon */}
      <nav className="p-5 md:p-6 border-b border-white/10 flex justify-between items-center relative z-20 bg-[#090909]">
        <div className="text-xs tracking-[0.4em] font-bold uppercase italic shadow-black drop-shadow-md">
          Computational / Artifact
        </div>
        <div className="hidden md:flex gap-12 text-[10px] tracking-[0.2em] uppercase font-medium items-center">
          <div className="text-white/40">
            {currentIndex + 1} / {artworks.length}
          </div>
          <button onClick={goToPrev} className="hover:text-white/60 transition-colors flex items-center gap-1">
            <ChevronLeft size={14} /> PREV
          </button>
          <button onClick={goToNext} className="hover:text-white/60 transition-colors flex items-center gap-1">
            NEXT <ChevronRight size={14} />
          </button>
        </div>
      </nav>

      <main className="flex-1 flex flex-col md:flex-row relative z-10 w-full overflow-y-auto md:overflow-hidden">
        {/* Left Side: Generative Visualization Area */}
        <div className="w-full md:w-3/5 h-[50vh] md:h-full relative flex items-center justify-center p-4 md:p-12 shrink-0 md:shrink">
          <div className="relative w-full h-full max-w-[500px] max-h-[500px] border border-white/10 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl transition-all duration-500">
            {/* The canvas will render inside this iframe */}
            <iframe
              ref={iframeRef}
              className="w-full h-full border-none z-10 relative"
              title={currentArtwork.title}
              sandbox="allow-scripts allow-same-origin"
            />
            {/* Minimal overlays for artistic effect */}
            <div className="absolute right-4 bottom-4 flex flex-col gap-1 items-end z-20 pointer-events-none mix-blend-difference">
               <span className="text-[9px] uppercase tracking-widest text-white/50 italic font-mono">{currentArtwork.type}</span>
               <span className="text-[9px] uppercase tracking-widest text-white/50 font-mono">SYS_RUNNING</span>
            </div>
            
            {/* Mobile Navigation (Floating) */}
            <div className="md:hidden absolute bottom-4 left-4 flex gap-4 z-20">
              <button onClick={goToPrev} className="bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-transform"><ChevronLeft size={16} /></button>
              <button onClick={goToNext} className="bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-transform"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>

        {/* Right Side: The Code & Editorial Metadata */}
        <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-white/10 p-8 md:p-12 flex flex-col justify-between bg-[#090909]/80 backdrop-blur-sm z-10 transition-all duration-300">
          <div key={currentArtwork.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-2">
              ALGO<br/><span className="italic font-serif">{currentArtwork.title.split(' ')[1]}</span>
            </h1>
            <h2 className="text-lg md:text-xl font-medium tracking-wider mb-6 text-white/80 uppercase">
              {currentArtwork.subTitle}
            </h2>
            <p className="text-xs text-white/50 leading-relaxed max-w-[320px] mb-12 uppercase tracking-wider">
              {currentArtwork.description}
            </p>

            {/* The Code Block (Brutalist style) */}
            <div className="bg-white text-black p-5 sm:p-6 relative shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <div className="absolute -top-3 -right-3 bg-white text-[10px] px-2 py-1 font-bold border border-black/10 uppercase tracking-widest">{currentArtwork.type} SOURCE</div>
              <code className="font-mono text-[9px] sm:text-[10px] leading-relaxed break-all block whitespace-pre-wrap">{currentArtwork.code}
              </code>
            </div>
          </div>

          {/* Bottom Metadata Section */}
          <div className="flex flex-col gap-8 mt-12 md:mt-0 animate-in fade-in duration-700 delay-200">
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              {currentArtwork.metadata.slice(0, 2).map((meta, i) => (
                <div key={i}>
                  <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{meta.label}</div>
                  <div className="text-sm font-mono text-white/80 truncate pr-2">{meta.value}</div>
                </div>
              ))}
            </div>
            
            {currentArtwork.metadata.length > 2 && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold italic shrink-0">
                  {currentArtwork.type.substring(0, 3)}
                </div>
                <div className="text-[10px] uppercase tracking-widest leading-relaxed">
                  <span className="text-white/80">{currentArtwork.metadata[2].label}</span><br/>
                  <span className="text-white/40 block mt-0.5">{currentArtwork.metadata[2].value}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Ribbon */}
      <footer className="p-5 md:p-6 border-t border-white/10 flex justify-between items-center text-[9px] uppercase tracking-[0.3em] font-medium relative z-10 w-full shrink-0 bg-[#090909]">
        <div className="flex gap-4 md:gap-8 text-white/50">
          <span>{currentArtwork.title}</span>
          <span className="hidden sm:inline">Index {currentIndex + 1}</span>
        </div>
        <div className="italic text-white/40">Crafted in the Void</div>
      </footer>
    </div>
  );
}
`;

// Find where ALGO 0x09 ends
const algo9Idx = code.indexOf(',\n  {\n    id: "algo-0x09"');
const algo9End = code.indexOf('    ]\n  }', algo9Idx) + '    ]\n  }'.length;

const beforeApp = code.substring(0, algo9End);

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

const finalCode = beforeApp + algo10String + '\n];\n\n' + pureAppCode;
fs.writeFileSync('src/App.tsx', finalCode);
console.log("App.tsx definitively fixed with pureAppCode.");
