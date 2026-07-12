const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = code.indexOf('id: "algo-0x07"');
const nextIdx = code.indexOf('id: "algo-0x08"');

// Re-generate the whole ALGO 0x07 object
const newAlgo = `id: "algo-0x07",
    title: "ALGO 0x07",
    subTitle: "Lorenz Attractor",
    description: "The classical Lorenz system (σ=10, ρ=28, β=8/3) drawn in 3D to trace the iconic butterfly trajectory. A divergence-free 3D curl noise is applied to undulate the entire shape, while additive blending of lines and points creates a radiant bloom effect. The whole scene rotates slowly around the Y-axis.",
    type: "WEBGL 3D",
    code: \`dx/dt = σ(y - x)
dy/dt = x(ρ - z) - y
dz/dt = xy - βz
+ curl_noise(x,y,z,t)\`,
    htmlContent: \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lorenz Attractor</title>
  <style>
    body { margin: 0; background-color: #050508; overflow: hidden; font-family: 'JetBrains Mono', monospace; color: #fff; }
    canvas { display: block; width: 100vw; height: 100vh; touch-action: none; }
    #hud {
      position: absolute; top: 15px; left: 15px; z-index: 10; pointer-events: none;
      text-transform: uppercase; letter-spacing: 1px; font-size: 10px;
    }
    #controls {
      position: absolute; bottom: 15px; right: 15px;
      display: flex; flex-direction: column; gap: 8px; z-index: 10; width: 200px;
      background: rgba(0,0,0,0.4); padding: 10px; border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(4px);
    }
    .control-group { display: flex; flex-direction: column; gap: 4px; }
    .control-group label { font-size: 8px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.7); display: flex; justify-content: space-between; }
    input[type=range] { width: 100%; -webkit-appearance: none; background: rgba(255,255,255,0.1); height: 2px; border-radius: 2px; outline: none; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 12px; height: 12px; border-radius: 50%; background: #fff; cursor: pointer; }
    
    #toggleMenuBtn {
      background: rgba(255,255,255,0.1); border: none; color: white; cursor: pointer; 
      font-size: 9px; padding: 3px 6px; border-radius: 2px; text-transform: uppercase; font-family: inherit;
    }
    #toggleMenuBtn:hover { background: rgba(255,255,255,0.2); }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\\/script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\\/script>
</head>
<body>
  <div id="hud">
    <div>Lorenz Attractor // V0x07</div>
    <div style="opacity: 0.5; font-size: 8px; margin-top: 2px;">
      σ=10, ρ=28, β=8/3<br/>
      Additive Blending / Radial Glow
    </div>
  </div>
  <div id="controls">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 4px;">
        <span style="font-size: 10px; font-weight: bold; opacity: 0.8; text-transform: uppercase;">Parameters</span>
        <button id="toggleMenuBtn">Hide</button>
    </div>
    <div class="control-group">
      <label><span>Curl Amplitude</span> <span id="vAmp">15</span></label>
      <input type="range" id="curlAmp" min="0" max="50" value="15">
    </div>
    <div class="control-group">
      <label><span>Twist Scale</span> <span id="vTwist">30</span></label>
      <input type="range" id="twistScale" min="1" max="100" value="30">
    </div>
    <div class="control-group">
      <label><span>Glow Intensity</span> <span id="vGlow">40</span></label>
      <input type="range" id="glow" min="1" max="100" value="40">
    </div>
    <div class="control-group">
      <label><span>Auto-Rotation</span> <span id="vRot">20</span></label>
      <input type="range" id="rotSpeed" min="0" max="100" value="20">
    </div>
  </div>
  <script>
    try {
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050508, 0.005);
        
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, 0, 80);
        
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x050508, 1);
        document.body.appendChild(renderer.domElement);

        const orbit = new THREE.OrbitControls(camera, renderer.domElement);
        orbit.enableDamping = true;
        orbit.dampingFactor = 0.05;
        orbit.enablePan = false;

        const toggleBtn = document.getElementById('toggleMenuBtn');
        let menuHidden = false;
        toggleBtn.addEventListener('click', () => {
            menuHidden = !menuHidden;
            toggleBtn.innerText = menuHidden ? 'Show' : 'Hide';
            const children = document.getElementById('controls').children;
            for(let i=1; i<children.length; i++) {
                children[i].style.display = menuHidden ? 'none' : 'flex';
            }
        });

        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.2, 'rgba(255,200,100,0.8)');
        gradient.addColorStop(0.5, 'rgba(255,100,50,0.3)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        const texture = new THREE.CanvasTexture(canvas);

        const sigma = 10.0;
        const rho = 28.0;
        const beta = 8.0 / 3.0;
        const dt = 0.005;
        const numPoints = 12000;

        let x = 0.1, y = 0, z = 0;
        const basePts = [];
        for(let i=0; i<numPoints; i++) {
            const dx = sigma * (y - x);
            const dy = x * (rho - z) - y;
            const dz = x * y - beta * z;
            x += dx * dt;
            y += dy * dt;
            z += dz * dt;
            basePts.push(new THREE.Vector3(x, y, z - 28));
        }

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(numPoints * 3);
        const colors = new Float32Array(numPoints * 3);
        
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.15,
            depthWrite: false
        });
        
        const pointMat = new THREE.PointsMaterial({
            size: 2.5,
            map: texture,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.4,
            depthWrite: false,
            sizeAttenuation: true
        });
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const group = new THREE.Group();
        group.add(new THREE.Line(geometry, lineMat));
        group.add(new THREE.Points(geometry, pointMat));
        scene.add(group);
        
        const elAmp = document.getElementById('curlAmp');
        const elTwist = document.getElementById('twistScale');
        const elGlow = document.getElementById('glow');
        const elRot = document.getElementById('rotSpeed');

        const vAmp = document.getElementById('vAmp');
        const vTwist = document.getElementById('vTwist');
        const vGlow = document.getElementById('vGlow');
        const vRot = document.getElementById('vRot');

        const updateLabels = () => {
            vAmp.innerText = elAmp.value;
            vTwist.innerText = elTwist.value;
            vGlow.innerText = elGlow.value;
            vRot.innerText = elRot.value;
        };
        [elAmp, elTwist, elGlow, elRot].forEach(el => el.addEventListener('input', updateLabels));
        
        function hash(p) {
            let h = Math.sin(p.x*12.9898 + p.y*78.233 + p.z*37.719)*43758.5453;
            return h - Math.floor(h);
        }
        
        function noise(nx, ny, nz) {
            let p = new THREE.Vector3(Math.floor(nx), Math.floor(ny), Math.floor(nz));
            let f = new THREE.Vector3(nx-p.x, ny-p.y, nz-p.z);
            f.x = f.x*f.x*(3.0-2.0*f.x);
            f.y = f.y*f.y*(3.0-2.0*f.y);
            f.z = f.z*f.z*(3.0-2.0*f.z);
            return (
                (1.0-f.x)*(1.0-f.y)*(1.0-f.z)*hash(new THREE.Vector3(p.x, p.y, p.z)) +
                f.x*(1.0-f.y)*(1.0-f.z)*hash(new THREE.Vector3(p.x+1, p.y, p.z)) +
                (1.0-f.x)*f.y*(1.0-f.z)*hash(new THREE.Vector3(p.x, p.y+1, p.z)) +
                f.x*f.y*(1.0-f.z)*hash(new THREE.Vector3(p.x+1, p.y+1, p.z)) +
                (1.0-f.x)*(1.0-f.y)*f.z*hash(new THREE.Vector3(p.x, p.y, p.z+1)) +
                f.x*(1.0-f.y)*f.z*hash(new THREE.Vector3(p.x+1, p.y, p.z+1)) +
                (1.0-f.x)*f.y*f.z*hash(new THREE.Vector3(p.x, p.y+1, p.z+1)) +
                f.x*f.y*f.z*hash(new THREE.Vector3(p.x+1, p.y+1, p.z+1))
            )*2.0 - 1.0;
        }
        
        function snoiseVec3(nx, ny, nz) {
            return new THREE.Vector3(
                noise(nx, ny, nz),
                noise(nx+13.5, ny+23.1, nz+11.3),
                noise(nx+41.2, ny+17.8, nz+37.5)
            );
        }
        
        function curlNoise(cx, cy, cz, scale) {
            let e = 0.1;
            let p = new THREE.Vector3(cx,cy,cz).multiplyScalar(scale);
            
            let p_x0 = snoiseVec3(p.x-e, p.y, p.z);
            let p_x1 = snoiseVec3(p.x+e, p.y, p.z);
            let p_y0 = snoiseVec3(p.x, p.y-e, p.z);
            let p_y1 = snoiseVec3(p.x, p.y+e, p.z);
            let p_z0 = snoiseVec3(p.x, p.y, p.z-e);
            let p_z1 = snoiseVec3(p.x, p.y, p.z+e);
            
            let dx = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
            let dy = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
            let dz = p_x1.y - p_x0.y - p_y1.x + p_y0.x;
            
            return new THREE.Vector3(dx, dy, dz).divideScalar(2*e);
        }

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            let t = clock.getElapsedTime();
            
            let amp = parseFloat(elAmp.value);
            let scale = parseFloat(elTwist.value) * 0.001;
            let glw = parseFloat(elGlow.value) / 100.0;
            let rot = parseFloat(elRot.value) * 0.01;
            
            orbit.autoRotate = rot > 0;
            orbit.autoRotateSpeed = rot * 2.0;
            orbit.update();
            
            pointMat.opacity = glw * 0.8;
            lineMat.opacity = glw * 0.3;
            
            const posAttr = geometry.attributes.position;
            const colAttr = geometry.attributes.color;
            
            for(let i=0; i<numPoints; i++) {
                let bp = basePts[i];
                
                let cn = curlNoise(bp.x, bp.y, bp.z + t*2.0, scale);
                
                posAttr.array[i*3]   = bp.x + cn.x * amp;
                posAttr.array[i*3+1] = bp.y + cn.y * amp;
                posAttr.array[i*3+2] = bp.z + cn.z * amp;
                
                let dist = Math.sqrt(bp.x*bp.x + bp.y*bp.y + bp.z*bp.z) / 30.0;
                let cWave = Math.sin(dist * 3.0 - t * 2.0) * 0.5 + 0.5;
                
                colAttr.array[i*3]   = 0.2 + cWave * 0.8;
                colAttr.array[i*3+1] = 0.1 + (1.0 - cWave) * 0.5 + cWave * 0.2;
                colAttr.array[i*3+2] = 0.5 + (1.0 - cWave) * 0.5;
            }
            
            posAttr.needsUpdate = true;
            colAttr.needsUpdate = true;
            
            renderer.render(scene, camera);
        }
        
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        animate();
    } catch(err) {
        document.body.innerHTML = '<div style="color:red; padding:20px; font-family:monospace;">Error: ' + err.message + '</div>';
    }
  <\\/script>
</body>
</html>\`,
    metadata: [
      { label: "Dynamical System", value: "Lorenz Attractor" },
      { label: "Perturbation", value: "Divergence-Free Curl Noise" },
      { label: "Rendering", value: "Additive Bloom Points/Lines" }
    ]
  },\n  {`;
  
code = code.substring(0, startIdx) + newAlgo + code.substring(nextIdx + 11);
fs.writeFileSync('src/App.tsx', code);
console.log("Fixed successfully.");
