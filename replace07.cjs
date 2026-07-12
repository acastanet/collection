const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const startIdx = code.indexOf('id: "algo-0x07"');
const nextIdx = code.indexOf('id: "algo-0x08"');

if (startIdx !== -1 && nextIdx !== -1) {
    let segment = code.substring(startIdx, nextIdx);
    
    segment = segment.replace(
        '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>',
        `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>`
    );
    
    segment = segment.replace(
        '<div id="controls">',
        `<div id="controls">
    <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size: 10px; font-weight: bold; opacity: 0.8; text-transform: uppercase;">Parameters</span>
        <button id="toggleMenuBtn" style="background:none; border:none; color:white; cursor:pointer; opacity:0.7; font-size:10px; text-transform:uppercase; font-family:inherit;">Hide</button>
    </div>`
    );
    
    segment = segment.replace(
        'const canvas = document.createElement(\'canvas\');',
        `const orbit = new THREE.OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.05;

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

    const canvas = document.createElement('canvas');`
    );
    
    segment = segment.replace(
        'camera.position.lerp(new THREE.Vector3(0, 0, camZ), 0.05);',
        `// Update orbit controls and camera distance
        let dir = camera.position.clone().normalize();
        let targetPos = dir.multiplyScalar(camZ);
        camera.position.lerp(targetPos, 0.05);
        orbit.update();`
    );

    code = code.substring(0, startIdx) + segment + code.substring(nextIdx);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Updated ALGO 0x07 successfully.");
} else {
    console.log("Failed to find boundaries.");
}
