import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Artwork = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  code: string;
  type: string;
  htmlContent: string;
  metadata: { label: string; value: string }[];
};

const artworks: Artwork[] = [
  {
    id: "algo-0x01",
    title: "ALGO 0x01",
    subTitle: "Orbital Decay",
    description: "An exploration of trigonometric convergence and orbital decay expressed through 280 characters of logic.",
    type: "P5.JS",
    code: `a=(x,y,d=mag(k=4*cos(x/21),e=y/8-20))=>circle((q=3*sin(k*2)+.3/k+sin(y/19)*k*(9+2*sin(e*14-d*3+t*2)))+50*cos(c=d-t)+200,q*sin(c)+d*39-475,k*k>15?2:1)\nt=0,draw=$=>{t||createCanvas(w=400,w);background(9).noStroke().fill(w,116);for(t+=PI/240,i=1e4;i--;)a(i,i/235)}`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tsubuyaki Processing</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
  <style>
    body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #000; overflow: hidden; }
    canvas { box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }
  </style>
</head>
<body>
  <script>
    a=(x,y,d=mag(k=4*cos(x/21),e=y/8-20))=>circle((q=3*sin(k*2)+.3/k+sin(y/19)*k*(9+2*sin(e*14-d*3+t*2)))+50*cos(c=d-t)+200,q*sin(c)+d*39-475,k*k>15?2:1)
    t=0,draw=$=>{t||createCanvas(w=400,w);background(9).noStroke().fill(w,116);for(t+=PI/240,i=1e4;i--;)a(i,i/235)}
  </script>
</body>
</html>`,
    metadata: [
      { label: "Coordinate X/Y", value: "400.00 / 400.00" },
      { label: "Function Mag", value: "D(k, e)" },
      { label: "Protocol", value: "Open / #つぶやきProcessing" }
    ]
  },
  {
    id: "algo-0x02",
    title: "ALGO 0x02",
    subTitle: "Noise Spheres",
    description: "Représentations des sphères. Shader WebGL pur explorant l'accumulation de rayons intersectant des sphères de bruit isomorphes. L'affichage des seuls contours (smoothstep sur l'isosurface) permet de rendre la structure perméable et de voir les couches intérieures.",
    type: "WEBGL",
    code: `const gl = canvas.getContext('webgl2');
const prog = gl.createProgram();
// Compile Vertex Shader (Full screen quad)
const vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, '#version 300 es\\nin vec4 position; void main() { gl_Position = position; }');
gl.compileShader(vs); gl.attachShader(prog, vs);

// Compile Fragment Shader
const fs = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fs, \`#version 300 es
precision highp float;
out vec4 O; uniform float t; uniform vec2 r; uniform vec3 m;

vec3 hsv(float h, float s, float v) {
    vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + k.xyz) * 6.0 - vec3(k.w));
    return v * mix(vec3(k.x), clamp(p - vec3(k.x), 0.0, 1.0), s);
}

float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }

float noise(vec3 x) {
    vec3 p = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);
    return mix(mix(mix(hash(p+vec3(0,0,0)), hash(p+vec3(1,0,0)),f.x),
                   mix(hash(p+vec3(0,1,0)), hash(p+vec3(1,1,0)),f.x),f.y),
               mix(mix(hash(p+vec3(0,0,1)), hash(p+vec3(1,0,1)),f.x),
                   mix(hash(p+vec3(0,1,1)), hash(p+vec3(1,1,1)),f.x),f.y),f.z);
}

mat3 rotX(float a) { float s=sin(a), c=cos(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }
mat3 rotY(float a) { float s=sin(a), c=cos(a); return mat3(c,0,s, 0,1,0, -s,0,c); }

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - r) / r.y;
    vec3 ro = vec3(0.0, 0.0, m.z);
    vec3 rd = normalize(vec3(uv, -2.0));
    
    mat3 rx = rotX(m.y * 3.1415);
    mat3 ry = rotY(m.x * 3.1415 + t*0.1);
    mat3 rot = ry * rx;
    ro *= rot; rd *= rot;
    
    vec3 col = vec3(0.0);
    
    for(int i=0; i<6; i++) {
        float R = 0.8 + float(i)*0.45;
        float b = dot(ro, rd);
        float c = dot(ro, ro) - R*R;
        float D = b*b - c;
        if(D > 0.0) {
            vec3 tVec = vec3(0.0, 0.0, t * 0.4);
            
            float d1 = -b - sqrt(D);
            if(d1 > 0.0) {
                vec3 p1 = ro + rd * d1;
                float val = sin(noise(p1 * 1.5 + tVec) * 12.0);
                float edge = smoothstep(0.15, 0.05, abs(val)); // Only render contours
                if(edge > 0.0) {
                    float diffuse = max(0.2, dot(normalize(p1), normalize(vec3(1.0, 1.0, 1.0))));
                    col += hsv(R*0.15 + t*0.05, 0.8, edge * diffuse * 0.8) * edge;
                }
            }
            
            float d2 = -b + sqrt(D);
            if(d2 > 0.0) {
                vec3 p2 = ro + rd * d2;
                float val = sin(noise(p2 * 1.5 + tVec) * 12.0);
                float edge = smoothstep(0.15, 0.05, abs(val));
                if(edge > 0.0) {
                    float diffuse = max(0.2, dot(normalize(p2), normalize(vec3(1.0, 1.0, 1.0))));
                    // Backface is rendered slightly darker
                    col += hsv(R*0.15 + t*0.05, 0.8, edge * diffuse * 0.3) * edge;
                }
            }
        }
    }
    
    // Tonemapping & gamma
    O = vec4(pow(col, vec3(1.0 / 1.2)), 1.0);
}\`);
gl.compileShader(fs); gl.attachShader(prog, fs);
gl.linkProgram(prog); gl.useProgram(prog);

// Handle cursor tracking for mouse interaction...
let mx=0, my=0, mz=5.0, isDown=false;
canvas.onpointerdown=e=>{ isDown=true; canvas.setPointerCapture(e.pointerId); }
window.onpointerup=e=>{ isDown=false; }
window.onpointermove=e=>{ if(isDown){ mx-=e.movementX*0.005; my-=e.movementY*0.005; my=Math.max(-0.5,Math.min(0.5,my)); } }
canvas.onwheel=e=>{ mz+=e.deltaY*0.01; mz=Math.max(1.0,Math.min(10.0,mz)); e.preventDefault(); }

// Setup full screen quad and render...`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>WebGL Noise Sphere Contours</title>
  <style>
    body { margin: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; }
    canvas { box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; cursor: grab; }
    canvas:active { cursor: grabbing; }
  </style>
</head>
<body>
  <canvas id="c" width="400" height="400"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const gl = canvas.getContext('webgl2');
    
    const prog = gl.createProgram();
    
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, '#version 300 es\\nin vec4 position; void main() { gl_Position = position; }');
    gl.compileShader(vs); gl.attachShader(prog, vs);
    
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, \`#version 300 es
        precision highp float;
        out vec4 O; uniform float t; uniform vec2 r; uniform vec3 m;
        
        vec3 hsv(float h, float s, float v) {
            vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(vec3(h) + k.xyz) * 6.0 - vec3(k.w));
            return v * mix(vec3(k.x), clamp(p - vec3(k.x), 0.0, 1.0), s);
        }
        
        float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
        float noise(vec3 x) {
            vec3 p = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);
            return mix(mix(mix(hash(p+vec3(0,0,0)), hash(p+vec3(1,0,0)),f.x),
                           mix(hash(p+vec3(0,1,0)), hash(p+vec3(1,1,0)),f.x),f.y),
                       mix(mix(hash(p+vec3(0,0,1)), hash(p+vec3(1,0,1)),f.x),
                           mix(hash(p+vec3(0,1,1)), hash(p+vec3(1,1,1)),f.x),f.y),f.z);
        }
        
        mat3 rotX(float a) { float s=sin(a), c=cos(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }
        mat3 rotY(float a) { float s=sin(a), c=cos(a); return mat3(c,0,s, 0,1,0, -s,0,c); }
        
        void main() {
            vec2 uv = (gl_FragCoord.xy * 2.0 - r) / r.y;
            vec3 ro = vec3(0., 0., m.z); vec3 rd = normalize(vec3(uv, -2.0));
            
            mat3 rx = rotX(m.y * 3.1415);
            mat3 ry = rotY(m.x * 3.1415 + t*0.1);
            mat3 rot = ry * rx;
            ro *= rot; rd *= rot;
            
            vec3 col = vec3(0.0);
            
            for(int i=0; i<6; i++){
                float R = 0.8 + float(i)*0.45;
                float b = dot(ro, rd);
                float c = dot(ro, ro) - R*R;
                float D = b*b - c;
                
                if(D>0.){
                    vec3 tVec = vec3(0.0, 0.0, t * 0.4);
                    
                    float d1 = -b - sqrt(D);
                    if(d1 > 0.0) {
                        vec3 p1 = ro + rd * d1;
                        float val = sin(noise(p1 * 1.5 + tVec) * 12.0);
                        float edge = smoothstep(0.15, 0.0, abs(val));
                        if(edge > 0.0) {
                            float diff = max(0.2, dot(normalize(p1), normalize(vec3(1,1,1))));
                            col += hsv(R*0.15 + t*0.05, 0.8, edge * diff * 0.8) * edge;
                        }
                    }
                    
                    float d2 = -b + sqrt(D);
                    if(d2 > 0.0) {
                        vec3 p2 = ro + rd * d2;
                        float val = sin(noise(p2 * 1.5 + tVec) * 12.0);
                        float edge = smoothstep(0.15, 0.0, abs(val));
                        if(edge > 0.0) {
                            float diff = max(0.2, dot(normalize(p2), normalize(vec3(1,1,1))));
                            col += hsv(R*0.15 + t*0.05, 0.8, edge * diff * 0.3) * edge;
                        }
                    }
                }
            }
            
            O = vec4(pow(col, vec3(1.0/1.2)), 1.0);
        }
    \`);
    gl.compileShader(fs); gl.attachShader(prog, fs);
    gl.linkProgram(prog); gl.useProgram(prog);
    
    // Setup full screen quad
    const data = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    
    const locTime = gl.getUniformLocation(prog, 't');
    const locRes = gl.getUniformLocation(prog, 'r');
    const locMouse = gl.getUniformLocation(prog, 'm');
    
    let mx=0, my=0, mz=5.0, isDown=false;
    canvas.addEventListener('pointerdown', e => { isDown=true; canvas.setPointerCapture(e.pointerId); });
    canvas.addEventListener('pointerup', e => { isDown=false; canvas.releasePointerCapture(e.pointerId); });
    canvas.addEventListener('pointermove', e => {
        if(isDown) {
            mx -= e.movementX * 0.005;
            my -= e.movementY * 0.005;
            my = Math.max(-0.5, Math.min(0.5, my));
        }
    });
    canvas.addEventListener('wheel', e => {
        mz += e.deltaY * 0.01;
        mz = Math.max(1.0, Math.min(10.0, mz));
        e.preventDefault();
    }, { passive: false });
    
    let start = performance.now();
    function draw(now) {
      const t = (now - start) * 0.001;
      gl.uniform1f(locTime, t);
      gl.uniform2f(locRes, canvas.width, canvas.height);
      gl.uniform3f(locMouse, mx, my, mz);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`,
    metadata: [
      { label: "Resolution", value: "400 x 400 px" },
      { label: "Execution", value: "Fragment Shader" },
      { label: "Pattern", value: "Noise Distance Field" }
    ]
  },
  {
    id: "algo-0x03",
    title: "ALGO 0x03",
    subTitle: "Trefoil Knot",
    description: "Le nœud de trèfle (Triquetra). L'exemple le plus simple d'un nœud non trivial, formé d'une courbe continue et fermée entrelacée. Modélisé comme un ruban tubulaire avec des arêtes marquées pour accentuer le volume.",
    type: "THREE.JS",
    code: `const p = 2, q = 3, r = 3, tube = 0.8;
const particleCount = 80000;
const pos = new Float32Array(particleCount * 3);
const tangents = new Float32Array(particleCount * 3);

function getParamPoint(t) {
  let a = t * Math.PI * 2 * p;
  let b = (q / p) * a;
  return new THREE.Vector3(
    r * (2 + Math.cos(b)) * 0.5 * Math.cos(a),
    r * (2 + Math.cos(b)) * 0.5 * Math.sin(a),
    r * Math.sin(b) * 0.5
  );
}

for(let i=0; i<particleCount; i++) {
  const u = Math.random(), v = Math.random() * Math.PI * 2;
  const p0 = getParamPoint(u);
  const pM = getParamPoint(u - 0.001);
  const pP = getParamPoint(u + 0.001);
  
  const T = new THREE.Vector3().subVectors(pP, pM).normalize();
  const N = new THREE.Vector3().addVectors(pP, pM).sub(p0.clone().multiplyScalar(2)).normalize();
  const B = new THREE.Vector3().crossVectors(T, N).normalize();
  
  const rad = tube * Math.sqrt(Math.random()); // Randomize radius for filled tube effect
  const pt = p0.clone().add(N.multiplyScalar(Math.cos(v)*rad)).add(B.multiplyScalar(Math.sin(v)*rad));
  
  pos[i*3] = pt.x; pos[i*3+1] = pt.y; pos[i*3+2] = pt.z;
  tangents[i*3] = T.x; tangents[i*3+1] = T.y; tangents[i*3+2] = T.z;
}

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
geometry.setAttribute('tangent', new THREE.BufferAttribute(tangents, 3));
// Apply Point Shader...`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Trefoil Knot</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
  <style>
    body { margin: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    canvas { box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; background-color: #000; }
  </style>
</head>
<body>
  <div id="container" style="width: 400px; height: 400px; position: relative;"></div>
  <script>
    const width = 400, height = 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    
    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
    camera.position.z = 15;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    document.getElementById('container').appendChild(renderer.domElement);
    
    // Add OrbitControls using the dynamically loaded script
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    
    class KnotCurve extends THREE.Curve {
        constructor() { super(); }
        getPoint(t, optionalTarget = new THREE.Vector3()) {
            t *= Math.PI * 2;
            
            // Classical relaxed Trefoil Knot equation to avoid sharp central pinches
            const x = Math.sin(t) + 2 * Math.sin(2 * t);
            const y = Math.cos(t) - 2 * Math.cos(2 * t);
            const z = -Math.sin(3 * t);
            
            // Scale and rotate slightly for better viewing angle
            return optionalTarget.set(x, y, z).multiplyScalar(1.5);
        }
    }
    
    const path = new KnotCurve();
    const tubeRadius = 0.6;
    // 3 radial segments creates the 3-sided ribbon look
    const geometry = new THREE.TubeGeometry(path, 1500, tubeRadius, 3, true);

    const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2,
        metalness: 0.8,
        flatShading: true,
        side: THREE.DoubleSide
    });
    
    // Custom shader to give the ribbon an iridescent sweeping color
    material.onBeforeCompile = (shader) => {
        shader.uniforms.time = { value: 0 };
        shader.vertexShader = \`
            varying vec2 myVuv;
            \` + shader.vertexShader;
        shader.vertexShader = shader.vertexShader.replace(
            \`#include <uv_vertex>\`,
            \`#include <uv_vertex>
            myVuv = uv;
            \`
        );
        shader.fragmentShader = \`
            uniform float time;
            varying vec2 myVuv;
            \` + shader.fragmentShader;
        shader.fragmentShader = shader.fragmentShader.replace(
            \`#include <color_fragment>\`,
            \`#include <color_fragment>
            
            vec3 colorA = vec3(0.1, 0.9, 1.0); // Cyan
            vec3 colorB = vec3(1.0, 0.0, 0.8); // Magenta
            vec3 colorC = vec3(1.0, 0.8, 0.1); // Yellow
            
            // create flow along the ribbon (u) and across the ribbon (v)
            float flow = sin(myVuv.x * 20.0 - time * 2.5) * 0.5 + 0.5;
            float crossFlow = cos(myVuv.y * 3.0 + time) * 0.5 + 0.5;
            
            vec3 iridescence = mix(colorA, colorB, flow);
            iridescence = mix(iridescence, colorC, crossFlow);
            
            diffuseColor.rgb *= iridescence;
            \`
        );
        material.userData.shader = shader;
    };

    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);
    
    // Add some actual lights so the standard material shows up
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 3.0);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);
    const pointLight = new THREE.PointLight(0x00ffff, 2.0, 50);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);
    
    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); 
        if (material.userData.shader) {
            material.userData.shader.uniforms.time.value += clock.getDelta();
        } else {
            clock.getDelta();
        }
        knot.rotation.x += 0.001; // slower manual rotation
        knot.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`,
    metadata: [
      { label: "Topology", value: "Torus Knot" },
      { label: "Parameters", value: "(p: 2, q: 3)" },
      { label: "Rendering", value: "Shader / Point Cloud" }
    ]
  },
  {
    id: "algo-0x04",
    title: "ALGO 0x04",
    subTitle: "Fractal Cloud",
    description: "Tsubuyaki GLSL. Un nuage fractal rendu en quelques dizaines de caractères de shader, utilisant le raymarching et un système de bruit cumulatif.",
    type: "WEBGL",
    code: `float i,e,R,s;vec3 q,p,d=vec3(FC.xy/r*.6-vec2(.4,-.6),.5);for(q.zy--;i++<67.;){o.rgb+=hsv(.6,e-q.z,min(e*s,1.)/64.);s=3.;p=q+=d*e*R*.5+1e-4;p=vec3(log(R=length(p))-t*.2,exp(-p.z/R)+.23,atan(p.y,p.x));for(e=--p.y;s<1e3;s+=s)e+=dot(sin(p.zxx*s),.4-cos(p.yzy*s))/s*.25;}`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tsubuyaki GLSL</title>
  <style>
    body { margin: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; }
    canvas { box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }
  </style>
</head>
<body>
  <canvas id="c" width="400" height="400"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const gl = canvas.getContext('webgl2');
    
    const prog = gl.createProgram();
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, '#version 300 es\\nin vec4 position; void main() { gl_Position = position; }');
    gl.compileShader(vs); gl.attachShader(prog, vs);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, \`#version 300 es
precision highp float;
out vec4 o; 
uniform float t; 
uniform vec2 r; 
#define FC gl_FragCoord

vec3 hsv(float h, float s, float v) {
    vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + k.xyz) * 6.0 - vec3(k.w));
    return v * mix(vec3(k.x), clamp(p - vec3(k.x), 0.0, 1.0), s);
}

void main() {
    o = vec4(0.0, 0.0, 0.0, 1.0);
    float i=0.,e=0.,R=0.,s=0.;
    vec3 q=vec3(0),p;
    vec3 d=vec3(FC.xy/r*.6-vec2(.4,-.6),.5);
    for(q.zy--;i++<67.;){
        o.rgb+=hsv(.6,e-q.z,min(e*s,1.)/64.);
        s=3.;
        p=q+=d*e*R*.5+1e-4;
        p=vec3(log(R=length(p))-t*.2,exp(-p.z/R)+.23,atan(p.y,p.x));
        for(e=--p.y;s<1e3;s+=s)e+=dot(sin(p.zxx*s),.4-cos(p.yzy*s))/s*.25;
    }
}\`);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error("Fractal Cloud FS Error: ", gl.getShaderInfoLog(fs));
    }
    gl.attachShader(prog, fs);
    gl.linkProgram(prog); gl.useProgram(prog);
    
    const locTime = gl.getUniformLocation(prog, 't');
    const locRes = gl.getUniformLocation(prog, 'r');
    
    const geo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, geo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const locPos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(locPos);
    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);
    
    let start = performance.now();
    function draw(now) {
      gl.uniform1f(locTime, (now - start) * 0.001);
      gl.uniform2f(locRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  </script>
</body>
</html>`,
    metadata: [
      { label: "Execution", value: "Fragment Shader" },
      { label: "Pattern", value: "Fractal Cloud" }
    ]
  },
  {
    id: "algo-0x05",
    title: "ALGO 0x05",
    subTitle: "Vector Contour System",
    description: "Système de cross-hatching paramétrique. Applique un champ de vecteurs tangents (produit vectoriel du gradient par un plan spatial) pour tracer des polylignes fluides à la surface d'une iso-forme (gyroid). Le résultat est un véritable maillage filaire semi-transparent qui révèle ses propres contours.",
    type: "THREE.JS",
    code: `const size = 18;
const points = [];
const numLines = 5000;
const segmentsPerLine = 60;

function f(x, y, z) {
  return Math.sin(x)*Math.cos(y) + Math.sin(y)*Math.cos(z) + Math.sin(z)*Math.cos(x);
}

function grad(x, y, z) {
  let dfdx = Math.cos(x)*Math.cos(y) - Math.sin(z)*Math.sin(x);
  let dfdy = -Math.sin(x)*Math.sin(y) + Math.cos(y)*Math.cos(z);
  let dfdz = -Math.sin(y)*Math.sin(z) + Math.cos(z)*Math.cos(x);
  return new THREE.Vector3(dfdx, dfdy, dfdz);
}

for(let i=0; i<numLines; i++) {
  let x = (Math.random()-0.5)*size;
  let y = (Math.random()-0.5)*size;
  let z = (Math.random()-0.5)*size;
  
  for(let step=0; step<5; step++) {
    let val = f(x,y,z), g = grad(x,y,z), len2 = g.lengthSq();
    if(len2 > 0) { x -= val*g.x/len2; y -= val*g.y/len2; z -= val*g.z/len2; }
  }
  
  let r = Math.random();
  let axis = new THREE.Vector3(1,0,0);
  if(r > 0.33) axis.set(0,1,0);
  if(r > 0.66) axis.set(0,0,1);

  let curP = new THREE.Vector3(x, y, z);
  for(let j=0; j<segmentsPerLine; j++) {
    points.push(curP.x, curP.y, curP.z);
    let g = grad(curP.x, curP.y, curP.z).normalize();
    let dir = new THREE.Vector3().crossVectors(g, axis).normalize();
    if(dir.lengthSq() < 0.001) { points.push(curP.x, curP.y, curP.z); break; }
    curP.add(dir.multiplyScalar(0.12));
    
    let val = f(curP.x, curP.y, curP.z), g2 = grad(curP.x, curP.y, curP.z), len2 = g2.lengthSq();
    if(len2 > 0) { curP.x -= val*g2.x/len2; curP.y -= val*g2.y/len2; curP.z -= val*g2.z/len2; }
    points.push(curP.x, curP.y, curP.z);
  }
}

const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
const material = new THREE.LineBasicMaterial({ color: 0x66ccff, transparent: true, opacity: 0.5 });
scene.add(new THREE.LineSegments(geo, material));`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vector Contour System</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
  <style>
    body { margin: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
    canvas { box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; background-color: #000; }
  </style>
</head>
<body>
  <div id="container" style="width: 400px; height: 400px; position: relative;"></div>
  <script>
    const width = 400, height = 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.FogExp2('#000000', 0.05);
    
    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
    camera.position.set(12, 12, 12);
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('container').appendChild(renderer.domElement);
    
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;

    const size = 18;
    const points = [];
    const numLines = 5000;
    const segmentsPerLine = 60;
    
    function f(x, y, z) {
        return Math.sin(x)*Math.cos(y) + Math.sin(y)*Math.cos(z) + Math.sin(z)*Math.cos(x);
    }
    
    function grad(x, y, z) {
        let dfdx = Math.cos(x)*Math.cos(y) - Math.sin(z)*Math.sin(x);
        let dfdy = -Math.sin(x)*Math.sin(y) + Math.cos(y)*Math.cos(z);
        let dfdz = -Math.sin(y)*Math.sin(z) + Math.cos(z)*Math.cos(x);
        return new THREE.Vector3(dfdx, dfdy, dfdz);
    }

    for(let i=0; i<numLines; i++) {
        let x = (Math.random()-0.5)*size;
        let y = (Math.random()-0.5)*size;
        let z = (Math.random()-0.5)*size;
        
        for(let step=0; step<5; step++) {
            let val = f(x,y,z);
            let g = grad(x,y,z);
            let len2 = g.lengthSq();
            if(len2 > 0) {
                x -= val * g.x / len2;
                y -= val * g.y / len2;
                z -= val * g.z / len2;
            }
        }
        
        if (Math.abs(x)>size/2 || Math.abs(y)>size/2 || Math.abs(z)>size/2) continue;

        let r = Math.random();
        let axis = new THREE.Vector3(1,0,0);
        if(r > 0.33) axis.set(0,1,0);
        if(r > 0.66) axis.set(0,0,1);

        let curP = new THREE.Vector3(x, y, z);

        for(let j=0; j<segmentsPerLine; j++) {
            points.push(curP.x, curP.y, curP.z);
            
            let g = grad(curP.x, curP.y, curP.z).normalize();
            let dir = new THREE.Vector3().crossVectors(g, axis).normalize();
            
            if(dir.lengthSq() < 0.001) {
                points.push(curP.x, curP.y, curP.z);
                break;
            }
            
            curP.add(dir.multiplyScalar(0.12));
            
            let val = f(curP.x, curP.y, curP.z);
            let g2 = grad(curP.x, curP.y, curP.z);
            let len2 = g2.lengthSq();
            if(len2 > 0) {
                curP.x -= val * g2.x / len2;
                curP.y -= val * g2.y / len2;
                curP.z -= val * g2.z / len2;
            }
            
            points.push(curP.x, curP.y, curP.z);
        }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    
    const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 } },
        vertexShader: \`
            uniform float time;
            varying vec3 vPos;
            void main() {
                vPos = position;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mvPosition;
            }
        \`,
        fragmentShader: \`
            varying vec3 vPos;
            void main() {
                vec3 col = vec3(0.3, 0.6, 1.0) + sin(vPos * 0.4) * 0.3;
                float alpha = smoothstep(12.0, 4.0, length(vPos));
                gl_FragColor = vec4(col, alpha * 0.7);
            }
        \`,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    
    const lines = new THREE.LineSegments(geo, material);
    scene.add(lines);

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        material.uniforms.time.value += clock.getDelta();
        
        lines.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.15;
        lines.rotation.x = Math.cos(clock.getElapsedTime() * 0.1) * 0.15;
        
        renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`,
    metadata: [
      { label: "Equation", value: "Gyroid Implicit Surface" },
      { label: "Rendering", value: "Vector Cross-Hatching" },
      { label: "Primitives", value: "THREE.LineSegments" }
    ]
  }
];

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentArtwork = artworks[currentIndex];

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = currentArtwork.htmlContent;
    }
  }, [currentArtwork]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  return (
    <div className="w-full h-screen bg-[#090909] text-white font-sans flex flex-col overflow-hidden relative">
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none transition-all duration-1000" 
        style={{ backgroundImage: "radial-gradient(#fff 0.5px, transparent 0.5px)", backgroundSize: "40px 40px" }}
      ></div>
      
      {/* Top Navigation Bar */}
      <nav className="flex justify-between items-center p-6 md:p-8 border-b border-white/10 relative z-10 w-full shrink-0">
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
              <code className="font-mono text-[9px] sm:text-[10px] leading-relaxed break-all block whitespace-pre-wrap">
{currentArtwork.code}
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