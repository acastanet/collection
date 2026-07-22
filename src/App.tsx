import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize, Minimize, X, Download, Gauge } from "lucide-react";
import { AudioSystem } from "./audio";
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

type Artwork = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  equation?: string;
  code: string;
  type: string;
  htmlContent: string;
  metadata: { label: string; value: string }[];
};

const artworks: Artwork[] = [
  {
    id: "algo-0x01",
    title: "ALGO 0x01",
    subTitle: "Désintégration Orbitale",
    description: "Une exploration de la convergence trigonométrique et de la désintégration orbitale exprimée à travers 280 caractères de logique.",
    equation: "\\begin{aligned} k &= 4 \\cos\\left(\\frac{x}{21}\\right) \\\\ e &= \\frac{y}{8} - 20 \\\\ q &= 3 \\sin(2k) + \\frac{0.3}{k} \\\\ &\\quad + k \\sin\\left(\\frac{y}{19}\\right) \\big(9 + 2 \\sin(14e - 3d + 2t)\\big) \\end{aligned}",
    type: "P5.JS",
    code: "a=(x,y,d=mag(k=4*cos(x/21),e=y/8-20))=>circle((q=3*sin(k*2)+.3/k+sin(y/19)*k*(9+2*sin(e*14-d*3+t*2)))+50*cos(c=d-t)+200,q*sin(c)+d*39-475,k*k>15?2:1)\nt=0,draw=$=>{t||createCanvas(w=400,w);background(9).noStroke().fill(w,116);for(t+=PI/240,i=1e4;i--;)a(i,i/235)}",
    htmlContent: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tsubuyaki Processing</title>\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js\"></script>\n  <style>\n    body {  margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #000; overflow: hidden;  display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }\n    \n   canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }</style>\n</head>\n<body>\n  <script>\n    a=(x,y,d=mag(k=4*cos(x/21),e=y/8-20))=>circle((q=3*sin(k*2)+.3/k+sin(y/19)*k*(9+2*sin(e*14-d*3+t*2)))+50*cos(c=d-t)+200,q*sin(c)+d*39-475,k*k>15?2:1)\n    t=0,draw=$=>{t||createCanvas(w=400,w);background(9).noStroke().fill(w,116);for(t+=PI/240,i=1e4;i--;)a(i,i/235)}\n  </script>\n</body>\n</html>",
    metadata: [
      {
        "label": "Coordinate X/Y",
        "value": "400.00 / 400.00"
      },
      {
        "label": "Function Mag",
        "value": "D(k, e)"
      },
      {
        "label": "Protocol",
        "value": "Open / #つぶやきProcessing"
      }
    ]
  },
  {
    id: "algo-0x02",
    title: "ALGO 0x02",
    subTitle: "Sphères de Bruit",
    description: "Représentations des sphères. Shader WebGL pur explorant l'accumulation de rayons intersectant des sphères de bruit isomorphes. L'affichage des seuls contours (smoothstep sur l'isosurface) permet de rendre la structure perméable et de voir les couches intérieures.",
    equation: "D = (\\mathbf{r}_d \\cdot \\mathbf{r}_o)^2 - (\\|\\mathbf{r}_o\\|^2 - R^2)",
    type: "WEBGL",
    code: "const gl = canvas.getContext('webgl2');\nconst prog = gl.createProgram();\n// Compile Vertex Shader (Full screen quad)\nconst vs = gl.createShader(gl.VERTEX_SHADER);\ngl.shaderSource(vs, '#version 300 es\\nin vec4 position; void main() { gl_Position = position; }');\ngl.compileShader(vs); gl.attachShader(prog, vs);\n\n// Compile Fragment Shader\nconst fs = gl.createShader(gl.FRAGMENT_SHADER);\ngl.shaderSource(fs, `#version 300 es\nprecision highp float;\nout vec4 O; uniform float t; uniform vec2 r; uniform vec3 m;\n\nvec3 hsv(float h, float s, float v) {\n    vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n    vec3 p = abs(fract(vec3(h) + k.xyz) * 6.0 - vec3(k.w));\n    return v * mix(vec3(k.x), clamp(p - vec3(k.x), 0.0, 1.0), s);\n}\n\nfloat hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }\n\nfloat noise(vec3 x) {\n    vec3 p = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);\n    return mix(mix(mix(hash(p+vec3(0,0,0)), hash(p+vec3(1,0,0)),f.x),\n                   mix(hash(p+vec3(0,1,0)), hash(p+vec3(1,1,0)),f.x),f.y),\n               mix(mix(hash(p+vec3(0,0,1)), hash(p+vec3(1,0,1)),f.x),\n                   mix(hash(p+vec3(0,1,1)), hash(p+vec3(1,1,1)),f.x),f.y),f.z);\n}\n\nmat3 rotX(float a) { float s=sin(a), c=cos(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }\nmat3 rotY(float a) { float s=sin(a), c=cos(a); return mat3(c,0,s, 0,1,0, -s,0,c); }\n\nvoid main() {\n    vec2 uv = (gl_FragCoord.xy * 2.0 - r) / r.y;\n    vec3 ro = vec3(0.0, 0.0, m.z);\n    vec3 rd = normalize(vec3(uv, -2.0));\n    \n    mat3 rx = rotX(m.y * 3.1415);\n    mat3 ry = rotY(m.x * 3.1415 + t*0.1);\n    mat3 rot = ry * rx;\n    ro *= rot; rd *= rot;\n    \n    vec3 col = vec3(0.0);\n    \n    for(int i=0; i<6; i++) {\n        float R = 0.8 + float(i)*0.45;\n        float b = dot(ro, rd);\n        float c = dot(ro, ro) - R*R;\n        float D = b*b - c;\n        if(D > 0.0) {\n            vec3 tVec = vec3(0.0, 0.0, t * 0.4);\n            \n            float d1 = -b - sqrt(D);\n            if(d1 > 0.0) {\n                vec3 p1 = ro + rd * d1;\n                float val = sin(noise(p1 * 1.5 + tVec) * 12.0);\n                float edge = smoothstep(0.15, 0.05, abs(val)); // Only render contours\n                if(edge > 0.0) {\n                    float diffuse = max(0.2, dot(normalize(p1), normalize(vec3(1.0, 1.0, 1.0))));\n                    col += hsv(R*0.15 + t*0.05, 0.8, edge * diffuse * 0.8) * edge;\n                }\n            }\n            \n            float d2 = -b + sqrt(D);\n            if(d2 > 0.0) {\n                vec3 p2 = ro + rd * d2;\n                float val = sin(noise(p2 * 1.5 + tVec) * 12.0);\n                float edge = smoothstep(0.15, 0.05, abs(val));\n                if(edge > 0.0) {\n                    float diffuse = max(0.2, dot(normalize(p2), normalize(vec3(1.0, 1.0, 1.0))));\n                    // Backface is rendered slightly darker\n                    col += hsv(R*0.15 + t*0.05, 0.8, edge * diffuse * 0.3) * edge;\n                }\n            }\n        }\n    }\n    \n    // Tonemapping & gamma\n    O = vec4(pow(col, vec3(1.0 / 1.2)), 1.0);\n}`);\ngl.compileShader(fs); gl.attachShader(prog, fs);\ngl.linkProgram(prog); gl.useProgram(prog);\n\n// Handle cursor tracking for mouse interaction...\nlet mx=0, my=0, mz=5.0, isDown=false;\ncanvas.onpointerdown=e=>{ isDown=true; canvas.setPointerCapture(e.pointerId); }\nwindow.onpointerup=e=>{ isDown=false; }\nwindow.onpointermove=e=>{ if(isDown){ mx-=e.movementX*0.005; my-=e.movementY*0.005; my=Math.max(-0.5,Math.min(0.5,my)); } }\ncanvas.onwheel=e=>{ mz+=e.deltaY*0.01; mz=Math.max(1.0,Math.min(10.0,mz)); e.preventDefault(); }\n\n// Setup full screen quad and render...",
    htmlContent: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>WebGL Noise Sphere Contours</title>\n  <style>\n    body {  margin: 0; background-color: #000; overflow: hidden; touch-action: none;  display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }\n    \n    canvas:active { cursor: grabbing; }\n   canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }</style>\n</head>\n<body>\n  <canvas id=\"c\"></canvas>\n  <script>\n    const canvas = document.getElementById('c');\n    const gl = canvas.getContext('webgl2');\n    canvas.width = 400; canvas.height = 400; gl.viewport(0, 0, 400, 400);\n    const prog = gl.createProgram();\n    \n    const vs = gl.createShader(gl.VERTEX_SHADER);\n    gl.shaderSource(vs, '#version 300 es\\nin vec4 position; void main() { gl_Position = position; }');\n    gl.compileShader(vs); gl.attachShader(prog, vs);\n    \n    const fs = gl.createShader(gl.FRAGMENT_SHADER);\n    gl.shaderSource(fs, `#version 300 es\n        precision highp float;\n        out vec4 O; uniform float t; uniform vec2 r; uniform vec3 m;\n        \n        vec3 hsv(float h, float s, float v) {\n            vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n            vec3 p = abs(fract(vec3(h) + k.xyz) * 6.0 - vec3(k.w));\n            return v * mix(vec3(k.x), clamp(p - vec3(k.x), 0.0, 1.0), s);\n        }\n        \n        float hash(vec3 p) { return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }\n        float noise(vec3 x) {\n            vec3 p = floor(x); vec3 f = fract(x); f = f*f*(3.0-2.0*f);\n            return mix(mix(mix(hash(p+vec3(0,0,0)), hash(p+vec3(1,0,0)),f.x),\n                           mix(hash(p+vec3(0,1,0)), hash(p+vec3(1,1,0)),f.x),f.y),\n                       mix(mix(hash(p+vec3(0,0,1)), hash(p+vec3(1,0,1)),f.x),\n                           mix(hash(p+vec3(0,1,1)), hash(p+vec3(1,1,1)),f.x),f.y),f.z);\n        }\n        \n        mat3 rotX(float a) { float s=sin(a), c=cos(a); return mat3(1,0,0, 0,c,-s, 0,s,c); }\n        mat3 rotY(float a) { float s=sin(a), c=cos(a); return mat3(c,0,s, 0,1,0, -s,0,c); }\n        \n        void main() {\n            vec2 uv = (gl_FragCoord.xy * 2.0 - r) / r.y;\n            vec3 ro = vec3(0., 0., m.z); vec3 rd = normalize(vec3(uv, -2.0));\n            \n            mat3 rx = rotX(m.y * 3.1415);\n            mat3 ry = rotY(m.x * 3.1415 + t*0.1);\n            mat3 rot = ry * rx;\n            ro *= rot; rd *= rot;\n            \n            vec3 col = vec3(0.0);\n            \n            for(int i=0; i<6; i++){\n                float R = 0.8 + float(i)*0.45;\n                float b = dot(ro, rd);\n                float c = dot(ro, ro) - R*R;\n                float D = b*b - c;\n                \n                if(D>0.){\n                    vec3 tVec = vec3(0.0, 0.0, t * 0.4);\n                    \n                    float d1 = -b - sqrt(D);\n                    if(d1 > 0.0) {\n                        vec3 p1 = ro + rd * d1;\n                        float val = sin(noise(p1 * 1.5 + tVec) * 12.0);\n                        float edge = smoothstep(0.15, 0.0, abs(val));\n                        if(edge > 0.0) {\n                            float diff = max(0.2, dot(normalize(p1), normalize(vec3(1,1,1))));\n                            col += hsv(R*0.15 + t*0.05, 0.8, edge * diff * 0.8) * edge;\n                        }\n                    }\n                    \n                    float d2 = -b + sqrt(D);\n                    if(d2 > 0.0) {\n                        vec3 p2 = ro + rd * d2;\n                        float val = sin(noise(p2 * 1.5 + tVec) * 12.0);\n                        float edge = smoothstep(0.15, 0.0, abs(val));\n                        if(edge > 0.0) {\n                            float diff = max(0.2, dot(normalize(p2), normalize(vec3(1,1,1))));\n                            col += hsv(R*0.15 + t*0.05, 0.8, edge * diff * 0.3) * edge;\n                        }\n                    }\n                }\n            }\n            \n            O = vec4(pow(col, vec3(1.0/1.2)), 1.0);\n        }\n    `);\n    gl.compileShader(fs); gl.attachShader(prog, fs);\n    gl.linkProgram(prog); gl.useProgram(prog);\n    \n    // Setup full screen quad\n    const data = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);\n    const buf = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, buf);\n    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);\n    \n    const pos = gl.getAttribLocation(prog, 'position');\n    gl.enableVertexAttribArray(pos);\n    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);\n    \n    const locTime = gl.getUniformLocation(prog, 't');\n    const locRes = gl.getUniformLocation(prog, 'r');\n    const locMouse = gl.getUniformLocation(prog, 'm');\n    \n    let mx=0, my=0, mz=5.0, isDown=false;\n    canvas.addEventListener('pointerdown', e => { isDown=true; canvas.setPointerCapture(e.pointerId); });\n    canvas.addEventListener('pointerup', e => { isDown=false; canvas.releasePointerCapture(e.pointerId); });\n    canvas.addEventListener('pointermove', e => {\n        if(isDown) {\n            mx -= e.movementX * 0.005;\n            my -= e.movementY * 0.005;\n            my = Math.max(-0.5, Math.min(0.5, my));\n        }\n    });\n    canvas.addEventListener('wheel', e => {\n        mz += e.deltaY * 0.01;\n        mz = Math.max(1.0, Math.min(10.0, mz));\n        e.preventDefault();\n    }, { passive: false });\n    \n    let start = performance.now();\n    function draw(now) {\n      const t = (now - start) * 0.001;\n      gl.uniform1f(locTime, t);\n      gl.uniform2f(locRes, canvas.width, canvas.height);\n      gl.uniform3f(locMouse, mx, my, mz);\n      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);\n      requestAnimationFrame(draw);\n    }\n    requestAnimationFrame(draw);\n  </script>\n</body>\n</html>",
    metadata: [
      {
        "label": "Resolution",
        "value": "400 x 400 px"
      },
      {
        "label": "Execution",
        "value": "Fragment Shader"
      },
      {
        "label": "Pattern",
        "value": "Noise Distance Field"
      }
    ]
  },
  {
    id: "algo-0x03",
    title: "ALGO 0x03",
    subTitle: "Nœud de Trèfle",
    description: "Le nœud de trèfle (Triquetra). L'exemple le plus simple d'un nœud non trivial, formé d'une courbe continue et fermée entrelacée. Modélisé comme un ruban tubulaire avec des arêtes marquées pour accentuer le volume.",
    equation: "\\begin{aligned} x(t) &= \\frac{r}{2} \\left(2 + \\cos\\left(\\frac{qt}{p}\\right)\\right) \\cos(t) \\\\ y(t) &= \\frac{r}{2} \\left(2 + \\cos\\left(\\frac{qt}{p}\\right)\\right) \\sin(t) \\\\ z(t) &= \\frac{r}{2} \\sin\\left(\\frac{qt}{p}\\right) \\end{aligned}",
    type: "THREE.JS",
    code: "const p = 2, q = 3, r = 3, tube = 0.8;\nconst particleCount = 80000;\nconst pos = new Float32Array(particleCount * 3);\nconst tangents = new Float32Array(particleCount * 3);\n\nfunction getParamPoint(t) {\n  let a = t * Math.PI * 2 * p;\n  let b = (q / p) * a;\n  return new THREE.Vector3(\n    r * (2 + Math.cos(b)) * 0.5 * Math.cos(a),\n    r * (2 + Math.cos(b)) * 0.5 * Math.sin(a),\n    r * Math.sin(b) * 0.5\n  );\n}\n\nfor(let i=0; i<particleCount; i++) {\n  const u = Math.random(), v = Math.random() * Math.PI * 2;\n  const p0 = getParamPoint(u);\n  const pM = getParamPoint(u - 0.001);\n  const pP = getParamPoint(u + 0.001);\n  \n  const T = new THREE.Vector3().subVectors(pP, pM).normalize();\n  const N = new THREE.Vector3().addVectors(pP, pM).sub(p0.clone().multiplyScalar(2)).normalize();\n  const B = new THREE.Vector3().crossVectors(T, N).normalize();\n  \n  const rad = tube * Math.sqrt(Math.random()); // Randomize radius for filled tube effect\n  const pt = p0.clone().add(N.multiplyScalar(Math.cos(v)*rad)).add(B.multiplyScalar(Math.sin(v)*rad));\n  \n  pos[i*3] = pt.x; pos[i*3+1] = pt.y; pos[i*3+2] = pt.z;\n  tangents[i*3] = T.x; tangents[i*3+1] = T.y; tangents[i*3+2] = T.z;\n}\n\nconst geometry = new THREE.BufferGeometry();\ngeometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));\ngeometry.setAttribute('tangent', new THREE.BufferAttribute(tangents, 3));\n// Apply Point Shader...",
    htmlContent: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Trefoil Knot</title>\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js\"></script>\n  <script src=\"https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js\"></script>\n  <style>\n    body {  margin: 0; background-color: #000; overflow: hidden;  display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }\n    \n   canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }</style>\n</head>\n<body>\n  <div id=\"container\" style=\"width: 400px; height: 400px; position: relative;\"></div>\n  <script>\n    let width = window.innerWidth, height = window.innerHeight;\n    window.addEventListener(\"resize\", () => { width = window.innerWidth; height = window.innerHeight; camera.aspect = width/height; camera.updateProjectionMatrix(); renderer.setSize(width, height); });\n    const scene = new THREE.Scene();\n    scene.background = new THREE.Color('#000000');\n    \n    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);\n    camera.position.z = 15;\n    \n    const renderer = new THREE.WebGLRenderer({ antialias: true });\n    renderer.setSize(width, height);\n    document.getElementById('container').appendChild(renderer.domElement);\n    \n    // Add OrbitControls using the dynamically loaded script\n    const controls = new THREE.OrbitControls(camera, renderer.domElement);\n    controls.enableDamping = true;\n    controls.dampingFactor = 0.05;\n    controls.enableZoom = true;\n    controls.autoRotate = true;\n    \n    class KnotCurve extends THREE.Curve {\n        constructor() { super(); }\n        getPoint(t, optionalTarget = new THREE.Vector3()) {\n            t *= Math.PI * 2;\n            \n            // Classical relaxed Trefoil Knot equation to avoid sharp central pinches\n            const x = Math.sin(t) + 2 * Math.sin(2 * t);\n            const y = Math.cos(t) - 2 * Math.cos(2 * t);\n            const z = -Math.sin(3 * t);\n            \n            // Scale and rotate slightly for better viewing angle\n            return optionalTarget.set(x, y, z).multiplyScalar(1.5);\n        }\n    }\n    \n    const path = new KnotCurve();\n    const tubeRadius = 0.6;\n    // 3 radial segments creates the 3-sided ribbon look\n    const geometry = new THREE.TubeGeometry(path, 1500, tubeRadius, 3, true);\n\n    const material = new THREE.MeshStandardMaterial({\n        color: 0xffffff,\n        roughness: 0.2,\n        metalness: 0.8,\n        flatShading: true,\n        side: THREE.DoubleSide\n    });\n    \n    // Custom shader to give the ribbon an iridescent sweeping color\n    material.onBeforeCompile = (shader) => {\n        shader.uniforms.time = { value: 0 };\n        shader.vertexShader = `\n            varying vec2 myVuv;\n            ` + shader.vertexShader;\n        shader.vertexShader = shader.vertexShader.replace(\n            `#include <uv_vertex>`,\n            `#include <uv_vertex>\n            myVuv = uv;\n            `\n        );\n        shader.fragmentShader = `\n            uniform float time;\n            varying vec2 myVuv;\n            ` + shader.fragmentShader;\n        shader.fragmentShader = shader.fragmentShader.replace(\n            `#include <color_fragment>`,\n            `#include <color_fragment>\n            \n            vec3 colorA = vec3(0.1, 0.9, 1.0); // Cyan\n            vec3 colorB = vec3(1.0, 0.0, 0.8); // Magenta\n            vec3 colorC = vec3(1.0, 0.8, 0.1); // Yellow\n            \n            // create flow along the ribbon (u) and across the ribbon (v)\n            float flow = sin(myVuv.x * 20.0 - time * 2.5) * 0.5 + 0.5;\n            float crossFlow = cos(myVuv.y * 3.0 + time) * 0.5 + 0.5;\n            \n            vec3 iridescence = mix(colorA, colorB, flow);\n            iridescence = mix(iridescence, colorC, crossFlow);\n            \n            diffuseColor.rgb *= iridescence;\n            `\n        );\n        material.userData.shader = shader;\n    };\n\n    const knot = new THREE.Mesh(geometry, material);\n    scene.add(knot);\n    \n    // Add some actual lights so the standard material shows up\n    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);\n    scene.add(ambientLight);\n    const dirLight = new THREE.DirectionalLight(0xffffff, 3.0);\n    dirLight.position.set(10, 10, 10);\n    scene.add(dirLight);\n    const pointLight = new THREE.PointLight(0x00ffff, 2.0, 50);\n    pointLight.position.set(-5, -5, 5);\n    scene.add(pointLight);\n    \n    const clock = new THREE.Clock();\n    function animate() {\n        requestAnimationFrame(animate);\n        controls.update(); \n        if (material.userData.shader) {\n            material.userData.shader.uniforms.time.value += clock.getDelta();\n        } else {\n            clock.getDelta();\n        }\n        knot.rotation.x += 0.001; // slower manual rotation\n        knot.rotation.y += 0.002;\n        renderer.render(scene, camera);\n    }\n    animate();\n  </script>\n</body>\n</html>",
    metadata: [
      {
        "label": "Topologie",
        "value": "Torus Knot"
      },
      {
        "label": "Parameters",
        "value": "(p: 2, q: 3)"
      },
      {
        "label": "Rendu",
        "value": "Shader / Point Cloud"
      }
    ]
  },
  {
    id: "algo-0x04",
    title: "ALGO 0x04",
    subTitle: "Nuage Fractal",
    description: "Tsubuyaki GLSL. Un nuage fractal rendu en quelques dizaines de caractères de shader, utilisant le raymarching et un système de bruit cumulatif.",
    equation: "F(p) = -p_y + \\sum_{k} \\frac{\\langle \\sin(s_k p), \\cos(s_k p) \\rangle}{s_k}",
    type: "WEBGL",
    code: "float i,e,R,s;vec3 q,p,d=vec3(FC.xy/r*.6-vec2(.4,-.6),.5);for(q.zy--;i++<67.;){o.rgb+=hsv(.6,e-q.z,min(e*s,1.)/64.);s=3.;p=q+=d*e*R*.5+1e-4;p=vec3(log(R=length(p))-t*.2,exp(-p.z/R)+.23,atan(p.y,p.x));for(e=--p.y;s<1e3;s+=s)e+=dot(sin(p.zxx*s),.4-cos(p.yzy*s))/s*.25;}",
    htmlContent: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Tsubuyaki GLSL</title>\n  <style>\n    body {  margin: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none;  display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }\n    \n   canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }</style>\n</head>\n<body>\n  <canvas id=\"c\"></canvas>\n  <script>\n    const canvas = document.getElementById('c');\n    const gl = canvas.getContext('webgl2');\n    canvas.width = 400; canvas.height = 400; gl.viewport(0, 0, 400, 400);\n    const prog = gl.createProgram();\n    const vs = gl.createShader(gl.VERTEX_SHADER);\n    gl.shaderSource(vs, '#version 300 es\\nin vec4 position; void main() { gl_Position = position; }');\n    gl.compileShader(vs); gl.attachShader(prog, vs);\n    const fs = gl.createShader(gl.FRAGMENT_SHADER);\n    gl.shaderSource(fs, `#version 300 es\nprecision highp float;\nout vec4 o; \nuniform float t; \nuniform vec2 r; \n#define FC gl_FragCoord\n\nvec3 hsv(float h, float s, float v) {\n    vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n    vec3 p = abs(fract(vec3(h) + k.xyz) * 6.0 - vec3(k.w));\n    return v * mix(vec3(k.x), clamp(p - vec3(k.x), 0.0, 1.0), s);\n}\n\nvoid main() {\n    o = vec4(0.0, 0.0, 0.0, 1.0);\n    float i=0.,e=0.,R=0.,s=0.;\n    vec3 q=vec3(0),p;\n    vec3 d=vec3(FC.xy/r*.6-vec2(.4,-.6),.5);\n    for(q.zy--;i++<67.;){\n        o.rgb+=hsv(.6,e-q.z,min(e*s,1.)/64.);\n        s=3.;\n        p=q+=d*e*R*.5+1e-4;\n        p=vec3(log(R=length(p))-t*.2,exp(-p.z/R)+.23,atan(p.y,p.x));\n        for(e=--p.y;s<1e3;s+=s)e+=dot(sin(p.zxx*s),.4-cos(p.yzy*s))/s*.25;\n    }\n}`);\n    gl.compileShader(fs);\n    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {\n        console.error(\"Fractal Cloud FS Error: \", gl.getShaderInfoLog(fs));\n    }\n    gl.attachShader(prog, fs);\n    gl.linkProgram(prog); gl.useProgram(prog);\n    \n    const locTime = gl.getUniformLocation(prog, 't');\n    const locRes = gl.getUniformLocation(prog, 'r');\n    \n    const geo = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, geo);\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);\n    const locPos = gl.getAttribLocation(prog, 'position');\n    gl.enableVertexAttribArray(locPos);\n    gl.vertexAttribPointer(locPos, 2, gl.FLOAT, false, 0, 0);\n    \n    let start = performance.now();\n    function draw(now) {\n      gl.uniform1f(locTime, (now - start) * 0.001);\n      gl.uniform2f(locRes, canvas.width, canvas.height);\n      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);\n      requestAnimationFrame(draw);\n    }\n    requestAnimationFrame(draw);\n  </script>\n</body>\n</html>",
    metadata: [
      {
        "label": "Execution",
        "value": "Fragment Shader"
      },
      {
        "label": "Pattern",
        "value": "Nuage Fractal"
      }
    ]
  },
  {
    id: "algo-0x05",
    title: "ALGO 0x05",
    subTitle: "Système de Contours Vectoriels",
    description: "Système de cross-hatching paramétrique. Applique un champ de vecteurs tangents (produit vectoriel du gradient par un plan spatial) pour tracer des polylignes fluides à la surface d'une iso-forme (gyroid). Le résultat est un véritable maillage filaire semi-transparent qui révèle ses propres contours.",
    equation: "f(x, y, z) = \\sin x \\cos y + \\sin y \\cos z + \\sin z \\cos x = 0",
    type: "THREE.JS",
    code: "const size = 18;\nconst points = [];\nconst numLines = 5000;\nconst segmentsPerLine = 60;\n\nfunction f(x, y, z) {\n  return Math.sin(x)*Math.cos(y) + Math.sin(y)*Math.cos(z) + Math.sin(z)*Math.cos(x);\n}\n\nfunction grad(x, y, z) {\n  let dfdx = Math.cos(x)*Math.cos(y) - Math.sin(z)*Math.sin(x);\n  let dfdy = -Math.sin(x)*Math.sin(y) + Math.cos(y)*Math.cos(z);\n  let dfdz = -Math.sin(y)*Math.sin(z) + Math.cos(z)*Math.cos(x);\n  return new THREE.Vector3(dfdx, dfdy, dfdz);\n}\n\nfor(let i=0; i<numLines; i++) {\n  let x = (Math.random()-0.5)*size;\n  let y = (Math.random()-0.5)*size;\n  let z = (Math.random()-0.5)*size;\n  \n  for(let step=0; step<5; step++) {\n    let val = f(x,y,z), g = grad(x,y,z), len2 = g.lengthSq();\n    if(len2 > 0) { x -= val*g.x/len2; y -= val*g.y/len2; z -= val*g.z/len2; }\n  }\n  \n  let r = Math.random();\n  let axis = new THREE.Vector3(1,0,0);\n  if(r > 0.33) axis.set(0,1,0);\n  if(r > 0.66) axis.set(0,0,1);\n\n  let curP = new THREE.Vector3(x, y, z);\n  for(let j=0; j<segmentsPerLine; j++) {\n    points.push(curP.x, curP.y, curP.z);\n    let g = grad(curP.x, curP.y, curP.z).normalize();\n    let dir = new THREE.Vector3().crossVectors(g, axis).normalize();\n    if(dir.lengthSq() < 0.001) { points.push(curP.x, curP.y, curP.z); break; }\n    curP.add(dir.multiplyScalar(0.12));\n    \n    let val = f(curP.x, curP.y, curP.z), g2 = grad(curP.x, curP.y, curP.z), len2 = g2.lengthSq();\n    if(len2 > 0) { curP.x -= val*g2.x/len2; curP.y -= val*g2.y/len2; curP.z -= val*g2.z/len2; }\n    points.push(curP.x, curP.y, curP.z);\n  }\n}\n\nconst geo = new THREE.BufferGeometry();\ngeo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));\nconst material = new THREE.LineBasicMaterial({ color: 0x66ccff, transparent: true, opacity: 0.5 });\nscene.add(new THREE.LineSegments(geo, material));",
    htmlContent: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Vector Contour System</title>\n  <script src=\"https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js\"></script>\n  <script src=\"https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js\"></script>\n  <style>\n    body {  margin: 0; background-color: #000; overflow: hidden;  display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }\n    \n   canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }</style>\n</head>\n<body>\n  <div id=\"container\" style=\"width: 400px; height: 400px; position: relative;\"></div>\n  <script>\n    let width = window.innerWidth, height = window.innerHeight;\n    window.addEventListener(\"resize\", () => { width = window.innerWidth; height = window.innerHeight; camera.aspect = width/height; camera.updateProjectionMatrix(); renderer.setSize(width, height); });\n    const scene = new THREE.Scene();\n    scene.background = new THREE.Color('#000000');\n    scene.fog = new THREE.FogExp2('#000000', 0.05);\n    \n    const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);\n    camera.position.set(12, 12, 12);\n    \n    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });\n    renderer.setSize(width, height);\n    renderer.setPixelRatio(window.devicePixelRatio);\n    document.getElementById('container').appendChild(renderer.domElement);\n    \n    const controls = new THREE.OrbitControls(camera, renderer.domElement);\n    controls.enableDamping = true;\n    controls.dampingFactor = 0.05;\n    controls.autoRotate = true;\n    controls.autoRotateSpeed = 0.4;\n\n    const size = 18;\n    const points = [];\n    const numLines = 5000;\n    const segmentsPerLine = 60;\n    \n    function f(x, y, z) {\n        return Math.sin(x)*Math.cos(y) + Math.sin(y)*Math.cos(z) + Math.sin(z)*Math.cos(x);\n    }\n    \n    function grad(x, y, z) {\n        let dfdx = Math.cos(x)*Math.cos(y) - Math.sin(z)*Math.sin(x);\n        let dfdy = -Math.sin(x)*Math.sin(y) + Math.cos(y)*Math.cos(z);\n        let dfdz = -Math.sin(y)*Math.sin(z) + Math.cos(z)*Math.cos(x);\n        return new THREE.Vector3(dfdx, dfdy, dfdz);\n    }\n\n    for(let i=0; i<numLines; i++) {\n        let x = (Math.random()-0.5)*size;\n        let y = (Math.random()-0.5)*size;\n        let z = (Math.random()-0.5)*size;\n        \n        for(let step=0; step<5; step++) {\n            let val = f(x,y,z);\n            let g = grad(x,y,z);\n            let len2 = g.lengthSq();\n            if(len2 > 0) {\n                x -= val * g.x / len2;\n                y -= val * g.y / len2;\n                z -= val * g.z / len2;\n            }\n        }\n        \n        if (Math.abs(x)>size/2 || Math.abs(y)>size/2 || Math.abs(z)>size/2) continue;\n\n        let r = Math.random();\n        let axis = new THREE.Vector3(1,0,0);\n        if(r > 0.33) axis.set(0,1,0);\n        if(r > 0.66) axis.set(0,0,1);\n\n        let curP = new THREE.Vector3(x, y, z);\n\n        for(let j=0; j<segmentsPerLine; j++) {\n            points.push(curP.x, curP.y, curP.z);\n            \n            let g = grad(curP.x, curP.y, curP.z).normalize();\n            let dir = new THREE.Vector3().crossVectors(g, axis).normalize();\n            \n            if(dir.lengthSq() < 0.001) {\n                points.push(curP.x, curP.y, curP.z);\n                break;\n            }\n            \n            curP.add(dir.multiplyScalar(0.12));\n            \n            let val = f(curP.x, curP.y, curP.z);\n            let g2 = grad(curP.x, curP.y, curP.z);\n            let len2 = g2.lengthSq();\n            if(len2 > 0) {\n                curP.x -= val * g2.x / len2;\n                curP.y -= val * g2.y / len2;\n                curP.z -= val * g2.z / len2;\n            }\n            \n            points.push(curP.x, curP.y, curP.z);\n        }\n    }\n\n    const geo = new THREE.BufferGeometry();\n    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));\n    \n    const material = new THREE.ShaderMaterial({\n        uniforms: { time: { value: 0 } },\n        vertexShader: `\n            uniform float time;\n            varying vec3 vPos;\n            void main() {\n                vPos = position;\n                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n                gl_Position = projectionMatrix * mvPosition;\n            }\n        `,\n        fragmentShader: `\n            varying vec3 vPos;\n            void main() {\n                vec3 col = vec3(0.3, 0.6, 1.0) + sin(vPos * 0.4) * 0.3;\n                float alpha = smoothstep(12.0, 4.0, length(vPos));\n                gl_FragColor = vec4(col, alpha * 0.7);\n            }\n        `,\n        transparent: true,\n        depthWrite: false,\n        blending: THREE.AdditiveBlending\n    });\n    \n    const lines = new THREE.LineSegments(geo, material);\n    scene.add(lines);\n\n    const clock = new THREE.Clock();\n    function animate() {\n        requestAnimationFrame(animate);\n        controls.update();\n        material.uniforms.time.value += clock.getDelta();\n        \n        lines.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.15;\n        lines.rotation.x = Math.cos(clock.getElapsedTime() * 0.1) * 0.15;\n        \n        renderer.render(scene, camera);\n    }\n    animate();\n  </script>\n</body>\n</html>",
    metadata: [
      {
        "label": "Equation",
        "value": "Gyroid Implicit Surface"
      },
      {
        "label": "Rendu",
        "value": "Vector Cross-Hatching"
      },
      {
        "label": "Primitives",
        "value": "THREE.LineSegments"
      }
    ]
  },
  {
    id: "algo-0x06",
    title: "ALGO 0x06",
    subTitle: "Hamiltonien de Hénon-Heiles",
    description: "Quelle forme prend le chaos avant de sembler aléatoire ? Prenez une particule évoluant dans le Hamiltonien de Hénon-Heiles. Son mouvement est régi par les équations de Hamilton. Sous l'énergie de selle, un minuscule paquet de conditions initiales proches s'étire en filaments, se replie à travers le potentiel, et commence à paraître presque aléatoire.",
    equation: "H = \\frac{1}{2}(p_x^2 + p_y^2 + x^2 + y^2) + \\lambda\\left(x^2 y - \\frac{y^3}{3}\\right)",
    type: "CANVAS 2D",
    code: "const lambda = 1.0;\nconst Es = 1.0 / (6.0 * lambda * lambda);\nconst energy = Es * 0.99;\nconst numParticles = 8000;\n// Hamiltonian mechanics using RK4 integration",
    htmlContent: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Hénon-Heiles Chaos</title>\n  <style>\n    body {  margin: 0; background-color: #000; overflow: hidden;  display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }\n    \n   canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }</style>\n</head>\n<body>\n  <canvas id=\"c\"></canvas>\n  <script>\n    const canvas = document.getElementById('c');\n    const ctx = canvas.getContext('2d', { alpha: false });\n    \n    let width, height;\n    function resize() {\n      width = canvas.width = window.innerWidth * window.devicePixelRatio;\n      height = canvas.height = window.innerHeight * window.devicePixelRatio;\n    }\n    window.addEventListener('resize', resize);\n    resize();\n\n    const lambda = 1.0; \n    const Es = 1.0 / (6.0 * lambda * lambda); \n\n    const numParticles = 6000;\n    const particles = [];\n    const energy = Es * 0.99; \n\n    const x0 = 0.0;\n    const y0 = 0.1;\n    const px0 = 0.2;\n    \n    const V0 = 0.5*(x0*x0 + y0*y0) + lambda*(x0*x0*y0 - y0*y0*y0/3);\n    const py0 = Math.sqrt(2 * (energy - V0) - px0*px0);\n\n    for(let i = 0; i < numParticles; i++) {\n        const theta = (i / numParticles) * Math.PI * 2;\n        const r = 0.001;\n        const dx = r * Math.cos(theta);\n        const dy = r * Math.sin(theta);\n        \n        const x = x0 + dx;\n        const y = y0 + dy;\n        const V = 0.5*(x*x + y*y) + lambda*(x*x*y - y*y*y/3);\n        const px = px0;\n        const pySq = 2 * (energy - V) - px*px;\n        let py = py0;\n        if (pySq > 0) py = Math.sqrt(pySq);\n        \n        const hue = (i / numParticles) * 360;\n        particles.push({ x, y, px, py, hue });\n    }\n\n    function derivative(state) {\n        return { \n            dx: state.px, \n            dy: state.py, \n            dpx: -state.x - 2 * lambda * state.x * state.y, \n            dpy: -state.y - lambda * (state.x*state.x - state.y*state.y) \n        };\n    }\n\n    function rk4(state, dt) {\n        const k1 = derivative(state);\n        const s2 = { x: state.x + 0.5*dt*k1.dx, y: state.y + 0.5*dt*k1.dy, px: state.px + 0.5*dt*k1.dpx, py: state.py + 0.5*dt*k1.dpy };\n        const k2 = derivative(s2);\n        const s3 = { x: state.x + 0.5*dt*k2.dx, y: state.y + 0.5*dt*k2.dy, px: state.px + 0.5*dt*k2.dpx, py: state.py + 0.5*dt*k2.dpy };\n        const k3 = derivative(s3);\n        const s4 = { x: state.x + dt*k3.dx, y: state.y + dt*k3.dy, px: state.px + dt*k3.dpx, py: state.py + dt*k3.dpy };\n        const k4 = derivative(s4);\n        \n        state.x += dt/6 * (k1.dx + 2*k2.dx + 2*k3.dx + k4.dx);\n        state.y += dt/6 * (k1.dy + 2*k2.dy + 2*k3.dy + k4.dy);\n        state.px += dt/6 * (k1.dpx + 2*k2.dpx + 2*k3.dpx + k4.dpx);\n        state.py += dt/6 * (k1.dpy + 2*k2.dpy + 2*k3.dpy + k4.dpy);\n    }\n\n    function animate() {\n        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';\n        ctx.fillRect(0, 0, width, height);\n        \n        const scale = Math.min(width, height) * 0.45;\n        const t = Date.now() * 0.0005;\n        const cosY = Math.cos(t), sinY = Math.sin(t);\n        const cosX = Math.cos(t*0.7), sinX = Math.sin(t*0.7);\n\n        // draw sphere boundary\n        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';\n        ctx.lineWidth = 1;\n        ctx.beginPath();\n        ctx.arc(width/2, height/2, scale * (2.0 / 2.5), 0, Math.PI*2);\n        ctx.stroke();\n        \n        for(let i=0; i<particles.length; i++) {\n            let p = particles[i];\n            for(let step=0; step<2; step++) {\n                rk4(p, 0.015);\n            }\n            \n            // Map to sphere (stereographic)\n            const X = p.x * 2.5;\n            const Y = p.y * 2.5;\n            const den = 1 + X*X + Y*Y;\n            let x3 = 2*X / den;\n            let y3 = 2*Y / den;\n            let z3 = (1 - X*X - Y*Y) / den;\n            \n            // Rotate\n            let x4 = x3 * cosY - z3 * sinY;\n            let z4 = x3 * sinY + z3 * cosY;\n            \n            let y4 = y3 * cosX - z4 * sinX;\n            let z5 = y3 * sinX + z4 * cosX;\n            \n            const persp = 2.0 / (2.5 + z5);\n            const sx = width/2 + x4 * persp * scale;\n            const sy = height/2 - y4 * persp * scale;\n            \n            const alpha = 0.1 + 0.9 * ((z5 + 1) / 2);\n            ctx.fillStyle = 'hsla(' + p.hue + ', 80%, 65%, ' + alpha + ')';\n            \n            const r = 1.5 * persp;\n            ctx.fillRect(sx, sy, r, r);\n        }\n        \n        requestAnimationFrame(animate);\n    }\n    animate();\n  </script>\n</body>\n</html>",
    metadata: [
      {
        "label": "Système Dynamique",
        "value": "Mécanique hamiltonienne"
      },
      {
        "label": "Niveau d'Énergie",
        "value": "E < Es (État lié)"
      },
      {
        "label": "Intégration",
        "value": "Runge-Kutta Ordre 4"
      }
    ]
  },
  {
    id: "algo-0x07",
    title: "ALGO 0x07",
    subTitle: "Attracteur de Lorenz",
    description: "Le système classique de Lorenz (σ=10, ρ=28, β=8/3) dessiné en 3D pour tracer l'emblématique trajectoire en papillon. Un bruit de boucle (curl noise) 3D sans divergence est appliqué pour faire onduler toute la forme, tandis que le mélange additif de lignes et de points crée un effet de floraison radieuse. L'ensemble de la scène tourne lentement autour de l'axe Y.",
    equation: "\\begin{aligned} \\frac{dx}{dt} &= \\sigma(y - x) \\\\ \\frac{dy}{dt} &= x(\\rho - z) - y \\\\ \\frac{dz}{dt} &= xy - \\beta z \\end{aligned}",
    type: "WEBGL 3D",
    code: `dx/dt = σ(y - x)
dy/dt = x(ρ - z) - y
dz/dt = xy - βz
+ curl_noise(x,y,z,t)`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lorenz Attractor</title>
  <style>
    body {  margin: 0; background-color: #050508; overflow: hidden; font-family: 'JetBrains Mono', monospace; color: #fff;  display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }
    
    #hud {
      position: absolute; top: 15px; left: 15px; z-index: 10; pointer-events: none;
      text-transform: uppercase; letter-spacing: 1px; font-size: 10px;
    }
    #controls {
      position: absolute; top: 15px; right: 15px;
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
   canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }</style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>
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
        <span style="font-size: 10px; font-weight: bold; opacity: 0.8; text-transform: uppercase;">Paramètres</span>
        <button id="toggleMenuBtn">Masquer</button>
    </div>
    <div class="control-group">
      <label><span>Amplitude de Boucle</span> <span id="vAmp">15</span></label>
      <input type="range" id="curlAmp" min="0" max="50" value="15">
    </div>
    <div class="control-group">
      <label><span>Échelle de Torsion</span> <span id="vTwist">30</span></label>
      <input type="range" id="twistScale" min="1" max="100" value="30">
    </div>
    <div class="control-group">
      <label><span>Intensité de Lueur</span> <span id="vGlow">40</span></label>
      <input type="range" id="glow" min="1" max="100" value="40">
    </div>
    <div class="control-group">
      <label><span>Rotation Auto</span> <span id="vRot">20</span></label>
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
  <\/script>
</body>
</html>`,
    metadata: [
      { label: "Système Dynamique", value: "Attracteur de Lorenz" },
      { label: "Perturbation", value: "Bruit de Boucle sans Divergence" },
      { label: "Rendu", value: "Points/Lignes Additifs" }
    ]
  },
    {
    id: "algo-0x08",
    title: "ALGO 0x08",
    subTitle: "Systèmes Dynamiques",
    description: "Une singularité douce attire l'espace des phases en ondes. Inspiré par les travaux de @S_Conradi. Un pli réciproque en mouvement tire les orbites voisines en plis nets, tandis qu'un terme sinusoïdal crée des bandes répétées ressemblant à des vagues. L'image est un enregistrement des endroits où la carte revient sans cesse.",
    equation: "\\begin{aligned} z_{n+1} &= z_n + \\frac{\\lambda(t) \\overline{(z_n - p(t))}}{|z_n - p(t)|^2 + \\sigma^2} \\\\ &\\quad + \\mu(t) \\sin(\\kappa(t) z_n) \\end{aligned}",
    type: "WEBGL 2D",
    code: `const z_np = z_n - p(t);
const q_n = z_n + λ(t) z_np_bar / (|z_np|^2 + σ^2) + μ(t)sin(κ(t)z_n);
z_{n+1} = [tanh(|q_n|) / (|q_n| + ε)] q_n;
χ_n = |λ(t)| / (|z_np|^2 + σ^2) + |μ(t)κ(t)cos(κ(t)z_n)|;`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Soft Singularity Waves</title>
  <style>
    body {  margin: 0; background-color: #050508; overflow: hidden; font-family: 'JetBrains Mono', monospace; color: #fff;  display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }
    
    #hud {
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 10;
      pointer-events: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-size: 10px;
    }
    #controls {
      position: absolute;
      bottom: 15px;
      right: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 10;
    }
    button {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 6px 12px;
      font-family: inherit;
      font-size: 9px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.2s;
    }
    button.active {
      background: rgba(255, 255, 255, 0.9);
      color: black;
      font-weight: bold;
    }
   canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }</style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <div id="hud">
    <div>Phase Space Density ρ(x,y,t) // V0x08</div>
    <div style="opacity: 0.5; font-size: 8px; margin-top: 2px;">
      qₙ = zₙ + λ(t) z̄ₙₚ / (|zₙₚ|² + σ²) + μ(t)sin(κ(t)zₙ)<br/>
      zₙ₊₁ = [tanh(|qₙ|) / (|qₙ| + ε)]qₙ
    </div>
  </div>
  <div id="controls">
    <button id="togglePole" class="active">Afficher Pôle Doux p(t)</button>
    <button id="toggleWaves" class="active">Champ d'Ondes (μ)</button>
  </div>
  <script>
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.OrthographicCamera(-1.2 * aspect, 1.2 * aspect, 1.2, -1.2, 0.1, 10);
    camera.position.z = 2;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false; // We handle clearing for trail effects
    document.body.appendChild(renderer.domElement);
    
    // Fade Quad for trails
    const fadeScene = new THREE.Scene();
    const fadeCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    fadeCamera.position.z = 1;
    const fadeMat = new THREE.MeshBasicMaterial({ 
      color: 0x050508, 
      transparent: true, 
      opacity: 0.05,
      depthWrite: false
    });
    const fadeQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fadeMat);
    fadeScene.add(fadeQuad);
    
    // Particles setup
    const numPoints = 150000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);
    const colors = new Float32Array(numPoints * 3);
    
    for(let i=0; i<numPoints; i++){
      positions[i*3] = (Math.random() - 0.5) * 2.2;
      positions[i*3+1] = (Math.random() - 0.5) * 2.2;
      positions[i*3+2] = 0;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const circleCanvas = document.createElement('canvas');
    circleCanvas.width = 16;
    circleCanvas.height = 16;
    const ctx = circleCanvas.getContext('2d');
    const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 16, 16);
    const texture = new THREE.CanvasTexture(circleCanvas);
    
    const material = new THREE.PointsMaterial({
      size: 0.012,
      map: texture,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.18,
      depthWrite: false
    });
    
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    
    // Soft pole mesh
    const poleGeo = new THREE.SphereGeometry(0.015, 16, 16);
    const poleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const poleMesh = new THREE.Mesh(poleGeo, poleMat);
    scene.add(poleMesh);
    
    // UI state
    let showPole = true;
    let enableWaves = true;
    
    document.getElementById('togglePole').addEventListener('click', (e) => {
      showPole = !showPole;
      e.target.className = showPole ? 'active' : '';
    });
    
    document.getElementById('toggleWaves').addEventListener('click', (e) => {
      enableWaves = !enableWaves;
      e.target.className = enableWaves ? 'active' : '';
    });
    
    // Animation loop
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const t = clock.getElapsedTime() * 0.4;
      
      let lambda = 0.5 * Math.sin(t * 1.3);
      let mu = enableWaves ? 0.35 * Math.cos(t * 1.1) : 0.0;
      let kappa = 1.8 + 0.4 * Math.sin(t * 0.7);
      let px = 0.7 * Math.sin(t * 0.85);
      let py = 0.7 * Math.cos(t * 1.15);
      let sigma_sq = 0.015;
      let eps = 0.001;
      
      poleMesh.position.set(px, py, 0);
      poleMesh.visible = showPole;
      
      const posAttr = geometry.attributes.position;
      const colAttr = geometry.attributes.color;
      const posArr = posAttr.array;
      const colArr = colAttr.array;
      
      for (let i = 0; i < numPoints; i++) {
        let x = posArr[i*3];
        let y = posArr[i*3+1];
        
        // Re-seed 2% of particles every frame to maintain continuous density
        if (Math.random() < 0.02) {
          x = (Math.random() - 0.5) * 2.2;
          y = (Math.random() - 0.5) * 2.2;
        }
        
        let znpx = x - px;
        let znpy = y - py;
        let denom = znpx*znpx + znpy*znpy + sigma_sq;
        
        let term2x = lambda * znpx / denom;
        let term2y = lambda * (-znpy) / denom;
        
        let kx = kappa * x;
        let ky = kappa * y;
        let coshk = Math.cosh(ky);
        let sinhk = Math.sinh(ky);
        
        let term3x = mu * Math.sin(kx) * coshk;
        let term3y = mu * Math.cos(kx) * sinhk;
        
        let qx = x + term2x + term3x;
        let qy = y + term2y + term3y;
        
        let qmag = Math.sqrt(qx*qx + qy*qy);
        let factor = Math.tanh(qmag) / (qmag + eps);
        
        let nx = factor * qx;
        let ny = factor * qy;
        
        posArr[i*3] = nx;
        posArr[i*3+1] = ny;
        
        // Folding signal (Coral & Pearl)
        let mag_cos = Math.sqrt(Math.pow(Math.cos(kx)*coshk, 2) + Math.pow(Math.sin(kx)*sinhk, 2));
        let chi = Math.abs(lambda) / denom + Math.abs(mu * kappa) * mag_cos;
        
        let c = Math.log(1.0 + chi * 0.4);
        
        let cr, cg, cb;
        if (c < 0.5) {
          let f = c / 0.5;
          cr = 0.02 + f * (0.92 - 0.02);
          cg = 0.03 + f * (0.88 - 0.03);
          cb = 0.08 + f * (0.78 - 0.08);
        } else {
          let f = Math.min((c - 0.5) / 1.5, 1.0);
          cr = 0.92 + f * (1.0 - 0.92);
          cg = 0.88 + f * (0.5 - 0.88);
          cb = 0.78 + f * (0.31 - 0.78);
        }
        
        colArr[i*3] = cr;
        colArr[i*3+1] = cg;
        colArr[i*3+2] = cb;
      }
      
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
      
      renderer.render(fadeScene, fadeCamera);
      renderer.render(scene, camera);
    }
    
    function onWindowResize() {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -1.2 * aspect;
      camera.right = 1.2 * aspect;
      camera.top = 1.2;
      camera.bottom = -1.2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize, false);
    
    renderer.clear();
    animate();
  </script>
</body>
</html>`,
    metadata: [
      { label: "Dynamiques", value: "Carte à Pli Réciproque" },
      { label: "Rendu", value: "Estompement Densité Orbite" },
      { label: "Espace Colorimétrique", value: "Crêtes Corail & Perle" }
    ]
  },
  {
    id: "algo-0x09",
    title: "ALGO 0x09",
    subTitle: "Réaction-Diffusion",
    description: "Paramètres de diffusion-réaction de Gray-Scott et échelle de motif, modulés par un champ spatial continu. Le mouvement brownien fractionnaire évoluant lentement dans le temps mappe la réaction vers un chemin de classification de Pearson stable (taches → vers → labyrinthe), produisant des tailles et des comportements variés de manière transparente sur un seul domaine. Terminé par un seuillage texturé et des ombres fines.",
    equation: "\\begin{aligned} \\frac{\\partial u}{\\partial t} &= D_u \\nabla^2 u - u v^2 + f(1 - u) \\\\ \\frac{\\partial v}{\\partial t} &= D_v \\nabla^2 v + u v^2 - (f + k)v \\end{aligned}",
    type: "WEBGL 2D",
    code: `const n = smoothstep(0.2, 0.8, fbm(uv * 3.0 + time_offset));
const feed = mix(0.014, 0.045, n);
const kill = mix(0.054, 0.062, n);
const stepDist = mix(2.5, 0.8, n);
vec2 lapl = laplacian(tDiffuse, uv, stepDist);
du = Da * lapl.r - uv_reaction + feed * (1.0 - u);
dv = Db * lapl.g + uv_reaction - (feed + kill) * v;`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Continuous Gray-Scott</title>
  <style>
    body {  margin: 0; background-color: #f0ebd8; overflow: hidden; font-family: 'JetBrains Mono', monospace;  display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }
    
    #hud { position: absolute; top: 15px; left: 15px; font-size: 10px; color: rgba(0,0,0,0.5); pointer-events: none; text-transform: uppercase; letter-spacing: 1px; line-height: 1.5; z-index: 10; }
   canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }</style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <div id="hud">
    <div style="color: rgba(0,0,0,0.9); font-weight: bold;">RD Continuous Field // V0x09</div>
    <div>Pearson Path: Spots → Worms → Maze</div>
    <div style="opacity:0.6;">Appuyez sur [ESPACE] ou Cliquez pour Régénérer</div>
  </div>
  <script>
    const size = 1024;
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(size, size, false);
    renderer.setPixelRatio(1);
    document.body.appendChild(renderer.domElement);
    
    const rtOptions = {
      type: THREE.HalfFloatType,
      format: THREE.RGBAFormat,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false
    };
    let rtA = new THREE.WebGLRenderTarget(size, size, rtOptions);
    let rtB = new THREE.WebGLRenderTarget(size, size, rtOptions);
    
    const simCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const simScene = new THREE.Scene();
    
    const simVertexShader = \`
      varying vec2 vUv;
      void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
    \`;
    
    const simFragmentShader = \`
      varying vec2 vUv;
      uniform sampler2D tDiffuse;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uSeedXY;
      uniform float uSeedTrigger;
      uniform float uInit;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      float noise(vec2 p) {
          vec2 i = floor(p); vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }
      float fbm(vec2 p) {
          float v = 0.0; float a = 0.5;
          for(int i=0; i<4; i++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
          return v;
      }

      void main() {
          vec2 uv = vUv;
          
          vec2 offset = vec2(sin(uTime * 0.04), cos(uTime * 0.03)) * 0.5;
          float n = fbm(uv * 3.0 + offset);
          n = smoothstep(0.2, 0.8, n);
          
          float feed = mix(0.014, 0.045, n);
          float kill = mix(0.054, 0.062, n);
          float stepDist = mix(2.5, 0.8, n);
          
          vec2 texel = vec2(1.0) / uResolution;
          vec2 center = texture2D(tDiffuse, uv).rg;
          
          vec2 up = texture2D(tDiffuse, uv + vec2(0.0, 1.0) * texel * stepDist).rg;
          vec2 down = texture2D(tDiffuse, uv + vec2(0.0, -1.0) * texel * stepDist).rg;
          vec2 left = texture2D(tDiffuse, uv + vec2(-1.0, 0.0) * texel * stepDist).rg;
          vec2 right = texture2D(tDiffuse, uv + vec2(1.0, 0.0) * texel * stepDist).rg;
          vec2 upleft = texture2D(tDiffuse, uv + vec2(-1.0, 1.0) * texel * stepDist).rg;
          vec2 upright = texture2D(tDiffuse, uv + vec2(1.0, 1.0) * texel * stepDist).rg;
          vec2 downleft = texture2D(tDiffuse, uv + vec2(-1.0, -1.0) * texel * stepDist).rg;
          vec2 downright = texture2D(tDiffuse, uv + vec2(1.0, -1.0) * texel * stepDist).rg;
          
          vec2 lapl = (up + down + left + right) * 0.2 + (upleft + upright + downleft + downright) * 0.05 - center;
          
          float u = center.r;
          float v = center.g;
          float reaction = u * v * v;
          
          float du = 1.0 * lapl.r - reaction + feed * (1.0 - u);
          float dv = 0.5 * lapl.g + reaction - (feed + kill) * v;
          
          u += du;
          v += dv;
          
          u = clamp(u, 0.0, 1.0);
          v = clamp(v, 0.0, 1.0);
          
          if (uSeedTrigger > 0.5 && distance(uv, uSeedXY) < 0.015) {
              v = 1.0;
          }
          
          if (uInit > 0.5) {
              u = 1.0; v = 0.0;
              if (distance(uv, vec2(0.5)) < 0.4 && hash(uv * 123.456 + uTime) < 0.05) {
                  v = 1.0;
              }
          }
          
          gl_FragColor = vec4(u, v, 0.0, 1.0);
      }
    \`;
    
    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uResolution: { value: new THREE.Vector2(size, size) },
        uTime: { value: 0 },
        uSeedXY: { value: new THREE.Vector2(-1, -1) },
        uSeedTrigger: { value: 0 },
        uInit: { value: 1 }
      },
      vertexShader: simVertexShader,
      fragmentShader: simFragmentShader,
      depthWrite: false, depthTest: false
    });
    
    simScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial));
    
    const displayScene = new THREE.Scene();
    const displayFragmentShader = \`
      varying vec2 vUv;
      uniform sampler2D tDiffuse;
      uniform vec2 uResolution;
      
      void main() {
          vec2 uv = vUv;
          float v = texture2D(tDiffuse, uv).g;
          
          vec2 shadowOffset = vec2(3.0, -4.0) / uResolution;
          float vShadow = texture2D(tDiffuse, uv - shadowOffset).g;
          
          vec3 paper = vec3(0.94, 0.92, 0.88);
          vec3 ink = vec3(0.08, 0.08, 0.09);
          vec3 shadowCol = vec3(0.72, 0.70, 0.65);
          
          float pattern = smoothstep(0.12, 0.28, v);
          float shadowMask = smoothstep(0.08, 0.25, vShadow);
          
          vec3 col = mix(paper, shadowCol, shadowMask * 0.5);
          col = mix(col, ink, pattern);
          
          float vig = length(uv - 0.5);
          col *= 1.0 - smoothstep(0.3, 0.8, vig) * 0.12;
          
          float grain = fract(sin(dot(uv, vec2(12.9898,78.233))) * 43758.5453);
          col -= grain * 0.03;
          
          gl_FragColor = vec4(col, 1.0);
      }
    \`;
    
    const displayMaterial = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        uResolution: { value: new THREE.Vector2(size, size) }
      },
      vertexShader: simVertexShader,
      fragmentShader: displayFragmentShader,
      depthWrite: false, depthTest: false
    });
    
    displayScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), displayMaterial));
    
    const canvas = renderer.domElement;
    let isDrawing = false;
    let pointerXY = { x: -1, y: -1 };
    
    function updatePointer(e) {
      const rect = canvas.getBoundingClientRect();
      pointerXY.x = (e.clientX - rect.left) / rect.width;
      pointerXY.y = 1.0 - (e.clientY - rect.top) / rect.height;
    }
    
    canvas.addEventListener('pointerdown', (e) => {
      isDrawing = true;
      updatePointer(e);
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      if (isDrawing) updatePointer(e);
    });
    canvas.addEventListener('pointerup', (e) => {
      isDrawing = false;
      canvas.releasePointerCapture(e.pointerId);
    });
    
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') simMaterial.uniforms.uInit.value = 1;
    });
    
    renderer.setRenderTarget(rtA); renderer.clear();
    renderer.setRenderTarget(rtB); renderer.clear();
    
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      simMaterial.uniforms.uTime.value += clock.getDelta();
      
      if (isDrawing) {
        simMaterial.uniforms.uSeedXY.value.set(pointerXY.x, pointerXY.y);
        simMaterial.uniforms.uSeedTrigger.value = 1;
      }
      
      for (let i = 0; i < 12; i++) {
        simMaterial.uniforms.tDiffuse.value = rtA.texture;
        renderer.setRenderTarget(rtB);
        renderer.render(simScene, simCamera);
        
        let temp = rtA; rtA = rtB; rtB = temp;
        
        simMaterial.uniforms.uInit.value = 0;
        if (i === 0) simMaterial.uniforms.uSeedTrigger.value = 0;
      }
      
      displayMaterial.uniforms.tDiffuse.value = rtA.texture;
      renderer.setRenderTarget(null);
      renderer.render(displayScene, simCamera);
    }
    
    animate();
  </script>
</body>
</html>`,
    metadata: [
      { label: "Modulation", value: "Mouvement Brownien Fractionnaire" },
      { label: "Chemin Stable", value: "Taches → Labyrinthe" },
      { label: "Rendu", value: "Papier & Encre" }
    ]
  },
  {
    id: "algo-0x0b",
    title: "ALGO 0x0B",
    subTitle: "Attracteur Étrange",
    description: "Inspiré des systèmes dynamiques partagés par Simone Conradi. Un Attracteur de Clifford rendu en temps réel via Canvas 2D. Les paramètres (a, b) évoluent lentement et continuellement, révélant la nature fractale et chaotique du système. La couleur de chaque point est dérivée de sa « vélocité » dans l'espace des phases.",
    equation: "\\begin{aligned} x_{n+1} &= \\sin(a y_n) + c \\cos(a x_n) \\\\ y_{n+1} &= \\sin(b x_n) + d \\cos(b y_n) \\end{aligned}",
    type: "CANVAS 2D",
    code: `const nx = Math.sin(a * y) + c * Math.cos(a * x);
const ny = Math.sin(b * x) + d * Math.cos(b * y);
x = nx; y = ny;`,
    htmlContent: `<!DOCTYPE html>
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
    
    let a = -1.4, b = 1.6, c = 1.0, d = 0.7;
    let x = 0, y = 0;
    
    function animate() {
      const t = Date.now() * 0.0001;
      a = Math.sin(t) * 2.0;
      b = Math.cos(t * 0.8) * 2.0;
      c = Math.sin(t * 1.2) * 2.0;
      d = Math.cos(t * 0.9) * 2.0;
      
      if(hudParams) {
        hudParams.innerText = 'a=' + a.toFixed(3) + ' b=' + b.toFixed(3) + '\n' + 'c=' + c.toFixed(3) + ' d=' + d.toFixed(3);
      }
      
      ctx.fillStyle = 'rgba(3, 3, 3, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.15;
      
      for(let i = 0; i < 10000; i++) {
        const nx = Math.sin(a * y) + c * Math.cos(a * x);
        const ny = Math.sin(b * x) + d * Math.cos(b * y);
        x = nx; y = ny;
        
        const px = cx + x * scale;
        const py = cy + y * scale;
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(px, py, 1, 1);
      }
      requestAnimationFrame(animate);
    }
    animate();
  </script>
</body>
</html>`,
    metadata: [
        { label: "Système", value: "Clifford" },
        { label: "Particules", value: "10,000 / frame" },
        { label: "Dynamique", value: "Espace des phases" }
    ]
  }
  ,{
    id: "algo-0x0c",
    title: "ALGO 0x0C",
    subTitle: "Fractale Mandelbulb",
    description: "Une plongée dans le Mandelbulb, l'analogue tridimensionnel de l'ensemble de Mandelbrot. Construit par raymarching à travers un champ de distance, révélant une géométrie fractale infiniment complexe où l'espace se replie sur lui-même à chaque itération. Le système respire en interpolant continuellement la puissance de la fractale.",
    equation: "\\begin{aligned} r &= |z| \\\\ \\theta &= \\arccos(z_z / r) \\\\ \\phi &= \\arctan(z_y, z_x) \\\\ z_{n+1} &= r^n \\begin{pmatrix} \\sin(n\\theta)\\cos(n\\phi) \\\\ \\sin(n\\theta)\\sin(n\\phi) \\\\ \\cos(n\\theta) \\end{pmatrix} + c \\end{aligned}",
    type: "WEBGL 3D",
    code: `// Raymarching distance estimator for Mandelbulb
float map(vec3 pos) {
    vec3 z = pos;
    float dr = 1.0;
    float r = 0.0;
    float Power = 8.0 + sin(time * 0.2) * 2.0;
    
    for (int i = 0; i < 15; i++) {
        r = length(z);
        if (r > 2.0) break;
        
        float theta = acos(z.z/r) * Power;
        float phi = atan(z.y, z.x) * Power;
        float zr = pow(r, Power);
        dr = pow(r, Power-1.0) * Power * dr + 1.0;
        
        z = zr * vec3(sin(theta)*cos(phi), sin(phi)*sin(theta), cos(theta));
        z += pos;
    }
    return 0.5 * log(r) * r / dr;
}`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mandelbulb Raymarching</title>
  <style>
    body {  margin: 0; background-color: #050505; overflow: hidden;  display: flex; justify-content: center; align-items: center; touch-action: none; }
    canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 30px rgba(0,0,0,0.9); border-radius: 4px; }
  </style>
</head>
<body>
  <canvas id="c"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true });
    canvas.width = 800; canvas.height = 800; gl.viewport(0, 0, 800, 800);
    const prog = gl.createProgram();
    
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, '#version 300 es\\nin vec4 position; void main() { gl_Position = position; }');
    gl.compileShader(vs); gl.attachShader(prog, vs);
    
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, \`#version 300 es
precision highp float;
out vec4 O; uniform float t; uniform vec2 r;

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float map(vec3 pos) {
    vec3 z = pos;
    float dr = 1.0;
    float r = 0.0;
    float Power = 8.0 + sin(t * 0.2) * 2.0;
    for (int i = 0; i < 15; i++) {
        r = length(z);
        if (r > 2.0) break;
        
        float theta = acos(z.z/r);
        float phi = atan(z.y, z.x);
        dr =  pow( r, Power-1.0)*Power*dr + 1.0;
        
        float zr = pow( r,Power);
        theta = theta*Power;
        phi = phi*Power;
        
        z = zr*vec3(sin(theta)*cos(phi), sin(phi)*sin(theta), cos(theta));
        z+=pos;
    }
    return 0.5*log(r)*r/dr;
}

vec3 calcNormal( in vec3 pos ) {
    vec2 e = vec2(1.0,-1.0)*0.5773*0.0005;
    return normalize( e.xyy*map( pos + e.xyy ) + 
                      e.yyx*map( pos + e.yyx ) + 
                      e.yxy*map( pos + e.yxy ) + 
                      e.xxx*map( pos + e.xxx ) );
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - r) / r.y;
    
    vec3 ro = vec3(0.0, 0.0, 2.5);
    ro.xz *= rot(t * 0.15);
    ro.yz *= rot(sin(t * 0.1) * 0.5);
    vec3 ta = vec3(0.0, 0.0, 0.0);
    
    vec3 cw = normalize(ta - ro);
    vec3 cu = normalize(cross(cw, vec3(0.0, 1.0, 0.0)));
    vec3 cv = normalize(cross(cu, cw));
    vec3 rd = normalize(uv.x*cu + uv.y*cv + 1.5*cw);
    
    float d = 0.0;
    float res = 0.0;
    vec3 p;
    for(int i = 0; i < 100; i++) {
        p = ro + rd * d;
        res = map(p);
        if(res < 0.001 || d > 10.0) break;
        d += res;
    }
    
    vec3 col = vec3(0.0);
    if(d < 10.0) {
        vec3 n = calcNormal(p);
        vec3 light = normalize(vec3(1.0, 1.0, 1.0));
        vec3 light2 = normalize(vec3(-1.0, -1.0, -1.0));
        
        float diff = max(0.0, dot(n, light));
        float diff2 = max(0.0, dot(n, light2));
        float amb = 0.5 + 0.5 * n.y;
        
        col = vec3(0.2, 0.3, 0.4) * amb;
        col += vec3(0.8, 0.7, 0.5) * diff;
        col += vec3(0.2, 0.4, 0.6) * diff2;
        
        col *= mix(vec3(1.0), vec3(0.5, 0.8, 1.0), length(p)*0.5);
        
        col = mix(col, vec3(0.0), 1.0 - exp(-0.1 * d * d));
    }
    
    col = pow(col, vec3(1.0/2.2));
    O = vec4(col, 1.0);
}
\` );
    gl.compileShader(fs); gl.attachShader(prog, fs);
    gl.linkProgram(prog); gl.useProgram(prog);
    
    const data = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    
    const locTime = gl.getUniformLocation(prog, 't');
    const locRes = gl.getUniformLocation(prog, 'r');
    
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
        { label: "Rendu", value: "Raymarching" },
        { label: "Espace", value: "Coordonnées Sphériques" },
        { label: "Complexité", value: "Itérative Infinie" }
    ]
  },
  {
    id: "algo-0x0d",
    title: "ALGO 0x0D",
    subTitle: "Flux Paramétrique",
    description: "Simulation d'un champ scalaire chaotique calculé directement sur le GPU via un shader WebGL. Le système résout des équations de flux pour générer des faisceaux lumineux organiques qui évoluent et se tordent en fonction d'un bruit fractal complexe et de fonctions trigonométriques.",
    equation: "\\begin{aligned} p_{new} &= p - \\nabla(\\text{fbm}(p \\cdot p_2 + t)) \\cdot p_5 \\\\ c_{total} &= \\sum_{i=0}^{32} e^{-d \\cdot p_7} \\cdot (1 - \\frac{i}{p_4}) \\end{aligned}",
    type: "P5.JS SHADER",
    code: `const P1_Value = 0.19; // 時間が進む速さを設定します。
const P2_Value = 0.05; // 流れを作るノイズの大きさを設定します。
const P3_Value = 0.10; // 流れの方向が回転する強さを設定します。
const P4_Value = 30.0; // 流れをたどる回数を設定します。
const P5_Value = 0.05; // 1回ごとに流れを進む距離を設定します。
const P6_Value = 40.0; // しま模様の細かさを設定します。
let P7_Value = 50.0; // 線の鋭さを保存する変数を用意します。
const P7_Min = 6.0; // 線の鋭さの最小値を設定します。
const P7_Max = 90.0; // 線の鋭さの最大値を90に設定します。
const P7_Speed = 0.2; // サイン波が変化する速さを設定します。
const P8_Value = 15.0; // 全体の明るさを設定します。
let shaderProgram; // 作成したシェーダーを保存する変数を用意します。

const vShader = \`precision mediump float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0);
}\`;

const fShader = \`precision mediump float;
#define PI 3.14159265359
#define TAU 6.28318530718
varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_p1;
uniform float u_p2;
uniform float u_p3;
uniform float u_p4;
uniform float u_p5;
uniform float u_p6;
uniform float u_p7;
uniform float u_p8;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise21(vec2 p) {
  vec2 integerPart = floor(p);
  vec2 decimalPart = fract(p);
  decimalPart = decimalPart * decimalPart * (3.0 - 2.0 * decimalPart);
  float topLeft = hash21(integerPart);
  float topRight = hash21(integerPart + vec2(1.0, 0.0));
  float bottomLeft = hash21(integerPart + vec2(0.0, 1.0));
  float bottomRight = hash21(integerPart + vec2(1.0, 1.0));
  float topValue = mix(topLeft, topRight, decimalPart.x);
  float bottomValue = mix(bottomLeft, bottomRight, decimalPart.x);
  return mix(topValue, bottomValue, decimalPart.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.6;
  mat2 rotation = mat2(0.1, -0.0, 0.0, 0.1);
  for (int i = 0; i < 5; i++) {
    value += noise21(p) * amplitude;
    p = rotation * p * 2.01 + vec2(13.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

vec3 palette(float value) {
  vec3 baseColor = vec3(0.5);
  vec3 amplitude = vec3(0.5);
  vec3 frequency = vec3(1.0);
  vec3 phase = vec3(0.0, 0.18, 0.38);
  return baseColor + amplitude * cos(TAU * (frequency * value + phase));
}

vec2 centeredCoordinate(vec2 uv) {
  float aspectRatio = u_resolution.x / u_resolution.y;
  return (uv - 0.5) * vec2(aspectRatio, 1.0);
}

vec2 flowDirection(vec2 p, float timeValue) {
  float noiseValue = fbm(p * u_p2 + vec2(timeValue * 0.4, -timeValue * 0.25));
  float angle = noiseValue * PI * u_p3;
  angle += sin(p.x * 2.7 + timeValue) * 1.2;
  angle += cos(p.y * 3.1 - timeValue * 0.8) * 1.1;
  return vec2(cos(angle), sin(angle));
}

vec3 ribbonScene(vec2 uv) {
  vec2 p = centeredCoordinate(uv);
  float timeValue = u_time * u_p1;
  vec2 tracedPosition = p;
  float lineTotal = 0.0;
  float glowTotal = 0.0;
  for (int i = 0; i < 32; i++) {
    float index = float(i);
    if (index < u_p4) {
      vec2 direction = flowDirection(tracedPosition, timeValue + index * 0.035);
      tracedPosition -= direction * u_p5;
      float stripePosition = tracedPosition.x * u_p6 + fbm(tracedPosition * 2.4) * 7.0;
      stripePosition += sin(tracedPosition.y * 8.0 - timeValue * 1.4) * 1.5;
      float stripeDistance = abs(sin(stripePosition));
      float fade = 1.0 - index / max(u_p4, 1.0);
      lineTotal += exp(-stripeDistance * u_p7) * fade;
      glowTotal += exp(-stripeDistance * 7.0) * fade;
    }
  }
  lineTotal /= max(u_p4 * 0.25, 1.0);
  glowTotal /= max(u_p4 * 0.6, 1.0);
  vec3 color = palette(fbm(tracedPosition * 2.0) + timeValue * 0.04);
  color *= lineTotal * u_p8 + glowTotal * 0.8;
  return color + vec3(0.0, 0.0, 0.0);
}

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  vec3 finalColor = ribbonScene(uv);
  finalColor = pow(max(finalColor, vec3(0.0)), vec3(0.95));
  gl_FragColor = vec4(finalColor, 1.0);
}\`;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  shaderProgram = createShader(vShader, fShader);
  noStroke();
}

function draw() {
  const elapsedSeconds = millis() / 1000.0;
  const sineValue = sin(elapsedSeconds * P7_Speed);
  P7_Value = map(sineValue, -1, 1, P7_Min, P7_Max);
  shader(shaderProgram);
  shaderProgram.setUniform("u_resolution", [width, height]);
  shaderProgram.setUniform("u_time", elapsedSeconds);
  shaderProgram.setUniform("u_p1", P1_Value);
  shaderProgram.setUniform("u_p2", P2_Value);
  shaderProgram.setUniform("u_p3", P3_Value);
  shaderProgram.setUniform("u_p4", P4_Value);
  shaderProgram.setUniform("u_p5", P5_Value);
  shaderProgram.setUniform("u_p6", P6_Value);
  shaderProgram.setUniform("u_p7", P7_Value);
  shaderProgram.setUniform("u_p8", P8_Value);
  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ribbon Flow Shader</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
  <style>
    body { margin: 0; padding: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; }
    canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 30px rgba(0,0,0,0.9); border-radius: 4px; }
  </style>
</head>
<body>
  <script>
const P1_Value = 0.19; // 時間が進む速さを設定します。
const P2_Value = 0.05; // 流れを作るノイズの大きさを設定します。
const P3_Value = 0.10; // 流れの方向が回転する強さを設定します。
const P4_Value = 30.0; // 流れをたどる回数を設定します。
const P5_Value = 0.05; // 1回ごとに流れを進む距離を設定します。
const P6_Value = 40.0; // しま模様の細かさを設定します。
let P7_Value = 50.0; // 線の鋭さを保存する変数を用意します。
const P7_Min = 6.0; // 線の鋭さの最小値を設定します。
const P7_Max = 90.0; // 線の鋭さの最大値を90に設定します。
const P7_Speed = 0.2; // サイン波が変化する速さを設定します。
const P8_Value = 15.0; // 全体の明るさを設定します。
let shaderProgram; // 作成したシェーダーを保存する変数を用意します。

const vShader = \`precision mediump float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0);
}\`;

const fShader = \`precision mediump float;
#define PI 3.14159265359
#define TAU 6.28318530718
varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_p1;
uniform float u_p2;
uniform float u_p3;
uniform float u_p4;
uniform float u_p5;
uniform float u_p6;
uniform float u_p7;
uniform float u_p8;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise21(vec2 p) {
  vec2 integerPart = floor(p);
  vec2 decimalPart = fract(p);
  decimalPart = decimalPart * decimalPart * (3.0 - 2.0 * decimalPart);
  float topLeft = hash21(integerPart);
  float topRight = hash21(integerPart + vec2(1.0, 0.0));
  float bottomLeft = hash21(integerPart + vec2(0.0, 1.0));
  float bottomRight = hash21(integerPart + vec2(1.0, 1.0));
  float topValue = mix(topLeft, topRight, decimalPart.x);
  float bottomValue = mix(bottomLeft, bottomRight, decimalPart.x);
  return mix(topValue, bottomValue, decimalPart.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.6;
  mat2 rotation = mat2(0.1, -0.0, 0.0, 0.1);
  for (int i = 0; i < 5; i++) {
    value += noise21(p) * amplitude;
    p = rotation * p * 2.01 + vec2(13.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

vec3 palette(float value) {
  vec3 baseColor = vec3(0.5);
  vec3 amplitude = vec3(0.5);
  vec3 frequency = vec3(1.0);
  vec3 phase = vec3(0.0, 0.18, 0.38);
  return baseColor + amplitude * cos(TAU * (frequency * value + phase));
}

vec2 centeredCoordinate(vec2 uv) {
  float aspectRatio = u_resolution.x / u_resolution.y;
  return (uv - 0.5) * vec2(aspectRatio, 1.0);
}

vec2 flowDirection(vec2 p, float timeValue) {
  float noiseValue = fbm(p * u_p2 + vec2(timeValue * 0.4, -timeValue * 0.25));
  float angle = noiseValue * PI * u_p3;
  angle += sin(p.x * 2.7 + timeValue) * 1.2;
  angle += cos(p.y * 3.1 - timeValue * 0.8) * 1.1;
  return vec2(cos(angle), sin(angle));
}

vec3 ribbonScene(vec2 uv) {
  vec2 p = centeredCoordinate(uv);
  float timeValue = u_time * u_p1;
  vec2 tracedPosition = p;
  float lineTotal = 0.0;
  float glowTotal = 0.0;
  for (int i = 0; i < 32; i++) {
    float index = float(i);
    if (index < u_p4) {
      vec2 direction = flowDirection(tracedPosition, timeValue + index * 0.035);
      tracedPosition -= direction * u_p5;
      float stripePosition = tracedPosition.x * u_p6 + fbm(tracedPosition * 2.4) * 7.0;
      stripePosition += sin(tracedPosition.y * 8.0 - timeValue * 1.4) * 1.5;
      float stripeDistance = abs(sin(stripePosition));
      float fade = 1.0 - index / max(u_p4, 1.0);
      lineTotal += exp(-stripeDistance * u_p7) * fade;
      glowTotal += exp(-stripeDistance * 7.0) * fade;
    }
  }
  lineTotal /= max(u_p4 * 0.25, 1.0);
  glowTotal /= max(u_p4 * 0.6, 1.0);
  vec3 color = palette(fbm(tracedPosition * 2.0) + timeValue * 0.04);
  color *= lineTotal * u_p8 + glowTotal * 0.8;
  return color + vec3(0.0, 0.0, 0.0);
}

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  vec3 finalColor = ribbonScene(uv);
  finalColor = pow(max(finalColor, vec3(0.0)), vec3(0.95));
  gl_FragColor = vec4(finalColor, 1.0);
}\`;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  shaderProgram = createShader(vShader, fShader);
  noStroke();
}

function draw() {
  const elapsedSeconds = millis() / 1000.0;
  const sineValue = sin(elapsedSeconds * P7_Speed);
  P7_Value = map(sineValue, -1, 1, P7_Min, P7_Max);
  shader(shaderProgram);
  shaderProgram.setUniform("u_resolution", [width, height]);
  shaderProgram.setUniform("u_time", elapsedSeconds);
  shaderProgram.setUniform("u_p1", P1_Value);
  shaderProgram.setUniform("u_p2", P2_Value);
  shaderProgram.setUniform("u_p3", P3_Value);
  shaderProgram.setUniform("u_p4", P4_Value);
  shaderProgram.setUniform("u_p5", P5_Value);
  shaderProgram.setUniform("u_p6", P6_Value);
  shaderProgram.setUniform("u_p7", P7_Value);
  shaderProgram.setUniform("u_p8", P8_Value);
  rect(-width / 2, -height / 2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

  </script>
</body>
</html>`,
    metadata: [
        { label: "Moteur", value: "P5.js WebGL" },
        { label: "Bruit", value: "Fractal Brownian Motion" },
        { label: "Rendu", value: "Raymarching 2D" }
    ]
  },
  {
    id: "algo-0x0f",
    title: "ALGO 0x0F",
    subTitle: "Domain Warp (Atlas #1)",
    description: "Une distorsion de domaine classique utilisant du bruit fractal. La coordonnée d'échantillonnage est décalée par un champ de bruit, qui est lui-même décalé par un autre champ de bruit, créant des fluides organiques récursifs.",
    equation: "p' = p + \\nabla \\text{fbm}(p + \\text{fbm}(p))",
    type: "P5.JS SHADER",
    code: `// GENERATIVE SHADER - Standalone Export (Mode: 1 - Domain Warp)

const P1_Value = 0.18; // Time Speed
const P2_Value = 2.2; // Base Noise Scale
const P3_Value = 3; // Warp Noise Scale
const P4_Value = 4; // First Warp Strength
const P5_Value = 5; // Second Warp Strength
const P6_Value = 12; // Band Frequency
const P7_Value = 4; // Radial Frequency
const P8_Value = 0.9; // Brightness

let shaderProgram;

const vShader = \`precision mediump float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0);
}\`;

const fShader = \`precision mediump float;
#define PI 3.14159265359
#define TAU 6.28318530718
varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_p1; uniform float u_p2; uniform float u_p3; uniform float u_p4;
uniform float u_p5; uniform float u_p6; uniform float u_p7; uniform float u_p8;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
  float firstValue = hash21(p);
  float secondValue = hash21(p + vec2(37.17, 91.53));
  return vec2(firstValue, secondValue);
}

float noise21(vec2 p) {
  vec2 integerPart = floor(p);
  vec2 decimalPart = fract(p);
  decimalPart = decimalPart * decimalPart * (3.0 - 2.0 * decimalPart);
  float topLeft = hash21(integerPart);
  float topRight = hash21(integerPart + vec2(1.0, 0.0));
  float bottomLeft = hash21(integerPart + vec2(0.0, 1.0));
  float bottomRight = hash21(integerPart + vec2(1.0, 1.0));
  float topValue = mix(topLeft, topRight, decimalPart.x);
  float bottomValue = mix(bottomLeft, bottomRight, decimalPart.x);
  return mix(topValue, bottomValue, decimalPart.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    value += noise21(p) * amplitude;
    p = rotation * p * 2.03 + vec2(13.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

vec2 rotate2D(vec2 p, float angle) {
  float cosineValue = cos(angle);
  float sineValue = sin(angle);
  return mat2(cosineValue, -sineValue, sineValue, cosineValue) * p;
}

vec3 palette(float value) {
  vec3 baseColor = vec3(0.5);
  vec3 amplitude = vec3(0.5);
  vec3 frequency = vec3(1.0);
  vec3 phase = vec3(0.0, 0.18, 0.38);
  return baseColor + amplitude * cos(TAU * (frequency * value + phase));
}

vec2 centeredCoordinate(vec2 uv) {
  float aspectRatio = u_resolution.x / u_resolution.y;
  return (uv - 0.5) * vec2(aspectRatio, 1.0);
}

vec3 domainWarpScene(vec2 uv) {
  vec2 p = centeredCoordinate(uv); 
  float timeValue = u_time * u_p1; 
  vec2 firstWarp = vec2(0.0); 
  firstWarp.x = fbm(p * u_p2 + vec2(timeValue, -timeValue * 0.7)); 
  firstWarp.y = fbm(p * u_p2 + vec2(5.2, 1.3) + vec2(-timeValue * 0.5, timeValue)); 
  vec2 secondWarp = vec2(0.0); 
  secondWarp.x = fbm(p * u_p3 + firstWarp * u_p4 + vec2(1.7, 9.2)); 
  secondWarp.y = fbm(p * u_p3 + firstWarp * u_p4 + vec2(8.3, 2.8)); 
  float field = fbm(p * u_p3 + secondWarp * u_p5); 
  float bands = 0.5 + 0.5 * sin(field * u_p6 - timeValue * 8.0 + length(p) * u_p7); 
  vec3 color = palette(field * 1.6 + bands * 0.2 + timeValue * 0.1); 
  color *= 0.35 + bands * u_p8; 
  return color; 
}

void main() { 
  vec2 uv = vTexCoord; 
  vec3 finalColor = domainWarpScene(uv);
  finalColor = pow(max(finalColor, vec3(0.0)), vec3(0.85));
  gl_FragColor = vec4(finalColor, 1.0); 
}\`;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  shaderProgram = createShader(vShader, fShader);
  noStroke();
}

function draw() {
  shader(shaderProgram);
  
  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_time', millis() / 1000.0);
  
  shaderProgram.setUniform('u_p1', P1_Value);
  shaderProgram.setUniform('u_p2', P2_Value);
  shaderProgram.setUniform('u_p3', P3_Value);
  shaderProgram.setUniform('u_p4', P4_Value);
  shaderProgram.setUniform('u_p5', P5_Value);
  shaderProgram.setUniform('u_p6', P6_Value);
  shaderProgram.setUniform('u_p7', P7_Value);
  shaderProgram.setUniform('u_p8', P8_Value);
  
  rect(-width/2, -height/2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Domain Warp</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
  <style>
    body { margin: 0; padding: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; }
    canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 30px rgba(0,0,0,0.9); border-radius: 4px; }
  </style>
</head>
<body>
  <script>
// GENERATIVE SHADER - Standalone Export (Mode: 1 - Domain Warp)

const P1_Value = 0.18; // Time Speed
const P2_Value = 2.2; // Base Noise Scale
const P3_Value = 3; // Warp Noise Scale
const P4_Value = 4; // First Warp Strength
const P5_Value = 5; // Second Warp Strength
const P6_Value = 12; // Band Frequency
const P7_Value = 4; // Radial Frequency
const P8_Value = 0.9; // Brightness

let shaderProgram;

const vShader = \`precision mediump float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0);
}\`;

const fShader = \`precision mediump float;
#define PI 3.14159265359
#define TAU 6.28318530718
varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_p1; uniform float u_p2; uniform float u_p3; uniform float u_p4;
uniform float u_p5; uniform float u_p6; uniform float u_p7; uniform float u_p8;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
  float firstValue = hash21(p);
  float secondValue = hash21(p + vec2(37.17, 91.53));
  return vec2(firstValue, secondValue);
}

float noise21(vec2 p) {
  vec2 integerPart = floor(p);
  vec2 decimalPart = fract(p);
  decimalPart = decimalPart * decimalPart * (3.0 - 2.0 * decimalPart);
  float topLeft = hash21(integerPart);
  float topRight = hash21(integerPart + vec2(1.0, 0.0));
  float bottomLeft = hash21(integerPart + vec2(0.0, 1.0));
  float bottomRight = hash21(integerPart + vec2(1.0, 1.0));
  float topValue = mix(topLeft, topRight, decimalPart.x);
  float bottomValue = mix(bottomLeft, bottomRight, decimalPart.x);
  return mix(topValue, bottomValue, decimalPart.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    value += noise21(p) * amplitude;
    p = rotation * p * 2.03 + vec2(13.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

vec2 rotate2D(vec2 p, float angle) {
  float cosineValue = cos(angle);
  float sineValue = sin(angle);
  return mat2(cosineValue, -sineValue, sineValue, cosineValue) * p;
}

vec3 palette(float value) {
  vec3 baseColor = vec3(0.5);
  vec3 amplitude = vec3(0.5);
  vec3 frequency = vec3(1.0);
  vec3 phase = vec3(0.0, 0.18, 0.38);
  return baseColor + amplitude * cos(TAU * (frequency * value + phase));
}

vec2 centeredCoordinate(vec2 uv) {
  float aspectRatio = u_resolution.x / u_resolution.y;
  return (uv - 0.5) * vec2(aspectRatio, 1.0);
}

vec3 domainWarpScene(vec2 uv) {
  vec2 p = centeredCoordinate(uv); 
  float timeValue = u_time * u_p1; 
  vec2 firstWarp = vec2(0.0); 
  firstWarp.x = fbm(p * u_p2 + vec2(timeValue, -timeValue * 0.7)); 
  firstWarp.y = fbm(p * u_p2 + vec2(5.2, 1.3) + vec2(-timeValue * 0.5, timeValue)); 
  vec2 secondWarp = vec2(0.0); 
  secondWarp.x = fbm(p * u_p3 + firstWarp * u_p4 + vec2(1.7, 9.2)); 
  secondWarp.y = fbm(p * u_p3 + firstWarp * u_p4 + vec2(8.3, 2.8)); 
  float field = fbm(p * u_p3 + secondWarp * u_p5); 
  float bands = 0.5 + 0.5 * sin(field * u_p6 - timeValue * 8.0 + length(p) * u_p7); 
  vec3 color = palette(field * 1.6 + bands * 0.2 + timeValue * 0.1); 
  color *= 0.35 + bands * u_p8; 
  return color; 
}

void main() { 
  vec2 uv = vTexCoord; 
  vec3 finalColor = domainWarpScene(uv);
  finalColor = pow(max(finalColor, vec3(0.0)), vec3(0.85));
  gl_FragColor = vec4(finalColor, 1.0); 
}\`;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  shaderProgram = createShader(vShader, fShader);
  noStroke();
}

function draw() {
  shader(shaderProgram);
  
  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_time', millis() / 1000.0);
  
  shaderProgram.setUniform('u_p1', P1_Value);
  shaderProgram.setUniform('u_p2', P2_Value);
  shaderProgram.setUniform('u_p3', P3_Value);
  shaderProgram.setUniform('u_p4', P4_Value);
  shaderProgram.setUniform('u_p5', P5_Value);
  shaderProgram.setUniform('u_p6', P6_Value);
  shaderProgram.setUniform('u_p7', P7_Value);
  shaderProgram.setUniform('u_p8', P8_Value);
  
  rect(-width/2, -height/2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

  </script>
</body>
</html>`,
    metadata: [
        { label: "Moteur", value: "P5.js WebGL" },
        { label: "Technique", value: "Domain Warping" },
        { label: "Bruit", value: "Fractal Brownian Motion" },
        { label: "Source", value: "Shader Atlas 60" }
    ]
  },
  {
    id: "algo-0x10",
    title: "ALGO 0x10",
    subTitle: "Procedural Nebula (Atlas #13)",
    description: "Simulation d'une nébuleuse stellaire par raymarching volumétrique simplifié. Le gaz est simulé par un bruit exponentiel fortement contrasté, avec un champ d'étoiles parsemé en arrière-plan.",
    equation: "c = \\text{fbm}(p + \\text{fbm}(p))^k + \\text{stars}(p)",
    type: "P5.JS SHADER",
    code: `// GENERATIVE SHADER - Standalone Export (Mode: 13 - Procedural Nebula)

const P1_Value = 0.15; // Time Speed
const P2_Value = 2; // Cloud Scale
const P3_Value = 3.5; // Warp Strength
const P4_Value = 2; // Cloud Contrast
const P5_Value = 70; // Star Density
const P6_Value = 0.975; // Star Threshold
const P7_Value = 0.15; // Color Shift
const P8_Value = 1.4; // Brightness

let shaderProgram;

const vShader = \`precision mediump float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0);
}\`;

const fShader = \`precision mediump float;
#define PI 3.14159265359
#define TAU 6.28318530718
varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_p1; uniform float u_p2; uniform float u_p3; uniform float u_p4;
uniform float u_p5; uniform float u_p6; uniform float u_p7; uniform float u_p8;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
  float firstValue = hash21(p);
  float secondValue = hash21(p + vec2(37.17, 91.53));
  return vec2(firstValue, secondValue);
}

float noise21(vec2 p) {
  vec2 integerPart = floor(p);
  vec2 decimalPart = fract(p);
  decimalPart = decimalPart * decimalPart * (3.0 - 2.0 * decimalPart);
  float topLeft = hash21(integerPart);
  float topRight = hash21(integerPart + vec2(1.0, 0.0));
  float bottomLeft = hash21(integerPart + vec2(0.0, 1.0));
  float bottomRight = hash21(integerPart + vec2(1.0, 1.0));
  float topValue = mix(topLeft, topRight, decimalPart.x);
  float bottomValue = mix(bottomLeft, bottomRight, decimalPart.x);
  return mix(topValue, bottomValue, decimalPart.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    value += noise21(p) * amplitude;
    p = rotation * p * 2.03 + vec2(13.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

vec2 rotate2D(vec2 p, float angle) {
  float cosineValue = cos(angle);
  float sineValue = sin(angle);
  return mat2(cosineValue, -sineValue, sineValue, cosineValue) * p;
}

vec3 palette(float value) {
  vec3 baseColor = vec3(0.5);
  vec3 amplitude = vec3(0.5);
  vec3 frequency = vec3(1.0);
  vec3 phase = vec3(0.0, 0.18, 0.38);
  return baseColor + amplitude * cos(TAU * (frequency * value + phase));
}

vec2 centeredCoordinate(vec2 uv) {
  float aspectRatio = u_resolution.x / u_resolution.y;
  return (uv - 0.5) * vec2(aspectRatio, 1.0);
}

vec3 nebulaScene(vec2 uv) { 
  vec2 p = centeredCoordinate(uv); 
  float timeValue = u_time * u_p1; 
  vec2 firstWarp = vec2(fbm(p * u_p2 + vec2(timeValue, 0.0)), fbm(p * u_p2 + vec2(4.2, timeValue))); 
  float cloud = fbm(p * u_p2 + firstWarp * u_p3); 
  cloud = pow(max(cloud, 0.0), max(u_p4, 0.1)); 
  vec2 starPosition = p * u_p5; 
  vec2 starCell = floor(starPosition); 
  vec2 starLocal = fract(starPosition) - 0.5; 
  float starSeed = hash21(starCell); 
  float star = step(u_p6, starSeed) * exp(-length(starLocal) * 70.0); 
  vec3 cloudColor = palette(cloud * 1.5 + u_p7 + timeValue * 0.03); 
  cloudColor *= cloud * u_p8 * 1.5; 
  return cloudColor + vec3(star) * u_p8 * 2.0; 
}

void main() { 
  vec2 uv = vTexCoord; 
  vec3 finalColor = nebulaScene(uv);
  finalColor = pow(max(finalColor, vec3(0.0)), vec3(0.85));
  gl_FragColor = vec4(finalColor, 1.0); 
}\`;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  shaderProgram = createShader(vShader, fShader);
  noStroke();
}

function draw() {
  shader(shaderProgram);
  
  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_time', millis() / 1000.0);
  
  shaderProgram.setUniform('u_p1', P1_Value);
  shaderProgram.setUniform('u_p2', P2_Value);
  shaderProgram.setUniform('u_p3', P3_Value);
  shaderProgram.setUniform('u_p4', P4_Value);
  shaderProgram.setUniform('u_p5', P5_Value);
  shaderProgram.setUniform('u_p6', P6_Value);
  shaderProgram.setUniform('u_p7', P7_Value);
  shaderProgram.setUniform('u_p8', P8_Value);
  
  rect(-width/2, -height/2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
`,
    htmlContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Procedural Nebula</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
  <style>
    body { margin: 0; padding: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; }
    canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 30px rgba(0,0,0,0.9); border-radius: 4px; }
  </style>
</head>
<body>
  <script>
// GENERATIVE SHADER - Standalone Export (Mode: 13 - Procedural Nebula)

const P1_Value = 0.15; // Time Speed
const P2_Value = 2; // Cloud Scale
const P3_Value = 3.5; // Warp Strength
const P4_Value = 2; // Cloud Contrast
const P5_Value = 70; // Star Density
const P6_Value = 0.975; // Star Threshold
const P7_Value = 0.15; // Color Shift
const P8_Value = 1.4; // Brightness

let shaderProgram;

const vShader = \`precision mediump float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0);
}\`;

const fShader = \`precision mediump float;
#define PI 3.14159265359
#define TAU 6.28318530718
varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_p1; uniform float u_p2; uniform float u_p3; uniform float u_p4;
uniform float u_p5; uniform float u_p6; uniform float u_p7; uniform float u_p8;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec2 hash22(vec2 p) {
  float firstValue = hash21(p);
  float secondValue = hash21(p + vec2(37.17, 91.53));
  return vec2(firstValue, secondValue);
}

float noise21(vec2 p) {
  vec2 integerPart = floor(p);
  vec2 decimalPart = fract(p);
  decimalPart = decimalPart * decimalPart * (3.0 - 2.0 * decimalPart);
  float topLeft = hash21(integerPart);
  float topRight = hash21(integerPart + vec2(1.0, 0.0));
  float bottomLeft = hash21(integerPart + vec2(0.0, 1.0));
  float bottomRight = hash21(integerPart + vec2(1.0, 1.0));
  float topValue = mix(topLeft, topRight, decimalPart.x);
  float bottomValue = mix(bottomLeft, bottomRight, decimalPart.x);
  return mix(topValue, bottomValue, decimalPart.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    value += noise21(p) * amplitude;
    p = rotation * p * 2.03 + vec2(13.7, 9.2);
    amplitude *= 0.5;
  }
  return value;
}

vec2 rotate2D(vec2 p, float angle) {
  float cosineValue = cos(angle);
  float sineValue = sin(angle);
  return mat2(cosineValue, -sineValue, sineValue, cosineValue) * p;
}

vec3 palette(float value) {
  vec3 baseColor = vec3(0.5);
  vec3 amplitude = vec3(0.5);
  vec3 frequency = vec3(1.0);
  vec3 phase = vec3(0.0, 0.18, 0.38);
  return baseColor + amplitude * cos(TAU * (frequency * value + phase));
}

vec2 centeredCoordinate(vec2 uv) {
  float aspectRatio = u_resolution.x / u_resolution.y;
  return (uv - 0.5) * vec2(aspectRatio, 1.0);
}

vec3 nebulaScene(vec2 uv) { 
  vec2 p = centeredCoordinate(uv); 
  float timeValue = u_time * u_p1; 
  vec2 firstWarp = vec2(fbm(p * u_p2 + vec2(timeValue, 0.0)), fbm(p * u_p2 + vec2(4.2, timeValue))); 
  float cloud = fbm(p * u_p2 + firstWarp * u_p3); 
  cloud = pow(max(cloud, 0.0), max(u_p4, 0.1)); 
  vec2 starPosition = p * u_p5; 
  vec2 starCell = floor(starPosition); 
  vec2 starLocal = fract(starPosition) - 0.5; 
  float starSeed = hash21(starCell); 
  float star = step(u_p6, starSeed) * exp(-length(starLocal) * 70.0); 
  vec3 cloudColor = palette(cloud * 1.5 + u_p7 + timeValue * 0.03); 
  cloudColor *= cloud * u_p8 * 1.5; 
  return cloudColor + vec3(star) * u_p8 * 2.0; 
}

void main() { 
  vec2 uv = vTexCoord; 
  vec3 finalColor = nebulaScene(uv);
  finalColor = pow(max(finalColor, vec3(0.0)), vec3(0.85));
  gl_FragColor = vec4(finalColor, 1.0); 
}\`;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  shaderProgram = createShader(vShader, fShader);
  noStroke();
}

function draw() {
  shader(shaderProgram);
  
  shaderProgram.setUniform('u_resolution', [width, height]);
  shaderProgram.setUniform('u_time', millis() / 1000.0);
  
  shaderProgram.setUniform('u_p1', P1_Value);
  shaderProgram.setUniform('u_p2', P2_Value);
  shaderProgram.setUniform('u_p3', P3_Value);
  shaderProgram.setUniform('u_p4', P4_Value);
  shaderProgram.setUniform('u_p5', P5_Value);
  shaderProgram.setUniform('u_p6', P6_Value);
  shaderProgram.setUniform('u_p7', P7_Value);
  shaderProgram.setUniform('u_p8', P8_Value);
  
  rect(-width/2, -height/2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

  </script>
</body>
</html>`,
    metadata: [
        { label: "Moteur", value: "P5.js WebGL" },
        { label: "Rendu", value: "Volumetric FBM" },
        { label: "Effet", value: "Cosmic Glow" },
        { label: "Source", value: "Shader Atlas 60" }
    ]
  }
];

const getProcessedHtmlContent = (html: string, isLowSpec: boolean) => {
  if (!isLowSpec) return html;
  return html
    .replace(/window\.devicePixelRatio/g, '1')
    .replace(/10000/g, '3000')
    .replace(/for *\(let i = 0; i < 6000;/g, 'for(let i = 0; i < 1500;')
    .replace(/canvas\.width = 800; canvas\.height = 800;/g, 'canvas.width = 400; canvas.height = 400;')
    .replace(/gl\.viewport\(0, 0, 800, 800\);/g, 'gl.viewport(0, 0, 400, 400);')
    .replace(/< 15/g, '< 8')
    .replace(/< 100/g, '< 40')
    .replace(/for \(int i = 0; i < 32; i\+\+\) \{/g, 'for (int i = 0; i < 16; i++) {')
    .replace(/const P4_Value = 30.0;/g, 'const P4_Value = 15.0;');
};

export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLowSpec, setIsLowSpec] = useState(false);

  const captureScreenshot = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        const canvas = iframeRef.current.contentDocument.querySelector('canvas');
        if (canvas) {
          const dataUrl = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `${currentArtwork.title.replace(/\s+/g, '_').toLowerCase()}_capture.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }
    } catch (e) {
      console.error("Impossible de capturer la capture d'écran", e);
    }
  };

  const audioSystemRef = useRef<AudioSystem | null>(null);

  const currentArtwork = artworks[currentIndex];

  useEffect(() => {
    // Initialize audio system if needed
    if (!audioSystemRef.current) {
      audioSystemRef.current = new AudioSystem();
    }
    
    // Play or stop based on state
    if (isAudioEnabled) {
      audioSystemRef.current.playPattern(currentIndex);
    } else {
      audioSystemRef.current.stop();
    }
  }, [currentIndex, isAudioEnabled]);
  
  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioSystemRef.current) {
        audioSystemRef.current.stop();
      }
    };
  }, []);



  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };
  
  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
  };

  return (
    <div className="w-full h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-white/20 overflow-hidden">
      {/* Top Nav Ribbon */}
      <nav className="p-5 md:p-6 border-b border-white/10 flex justify-between items-center relative z-20 bg-[#090909]">
        <div className="text-xs tracking-[0.4em] font-bold uppercase italic shadow-black drop-shadow-md">
          Computational / Artifact
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase font-medium items-center">
          <button 
            onClick={toggleAudio} 
            className={`flex items-center gap-2 transition-colors ${isAudioEnabled ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
            title={isAudioEnabled ? "Mute Generative Audio" : "Play Generative Audio"}
          >
            {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {isAudioEnabled ? 'SYS_AUDIO_ON' : 'SYS_AUDIO_OFF'}
          </button>
          <div className="text-white/20">|</div>
          <div className="text-white/40">
            {currentIndex + 1} / {artworks.length}
          </div>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="hover:text-white/60 transition-colors flex items-center gap-1" title={isFullscreen ? "Quitter le Plein Écran" : "Plein Écran"}>
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            {isFullscreen ? "RÉDUIRE" : "PLEIN ÉCRAN"}
          </button>
          <div className="text-white/20">|</div>
          <button onClick={goToPrev} className="hover:text-white/60 transition-colors flex items-center gap-1">
            <ChevronLeft size={14} /> PRÉC
          </button>
          <button onClick={goToNext} className="hover:text-white/60 transition-colors flex items-center gap-1">
            SUIV <ChevronRight size={14} />
          </button>
          </div>
          <button onClick={() => setIsAboutOpen(true)} className="w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors lowercase font-serif italic text-base leading-none" style={{paddingBottom: '2px'}} title="À propos">
            a
          </button>
        </div>
      </nav>

      <main className="flex-1 min-h-0 flex flex-col md:flex-row relative z-10 w-full overflow-y-auto md:overflow-hidden">
        {/* Left Side: Generative Visualization Area */}
        <div className={isFullscreen ? "fixed inset-0 z-[100] w-full h-full flex items-center justify-center bg-[#050505]/95 p-4 md:p-12 backdrop-blur-md" : "w-full md:w-3/5 h-[60vh] md:h-auto md:self-stretch relative flex items-center justify-center p-4 md:p-8 shrink-0"}>
          <div className={`relative w-full border border-white/10 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl transition-all duration-500 ${isFullscreen ? "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] aspect-square md:aspect-video" : "max-w-[calc(60vh-2rem)] md:max-w-[calc(100vh-10rem)] aspect-square"}`}>
            {/* The canvas will render inside this iframe */}
            <iframe
              className="w-full h-full border-none z-10 relative"
              title={currentArtwork.title}
              ref={iframeRef}
              srcDoc={getProcessedHtmlContent(currentArtwork.htmlContent.replace(/getContext\('(webgl2?)'\)/g, "getContext('$1', { preserveDrawingBuffer: true })"), isLowSpec)}
            />
            {/* Close fullscreen button */}
            {isFullscreen && (
              <button 
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-50 bg-black/60 backdrop-blur border border-white/20 p-3 rounded-full hover:bg-white/20 transition-colors"
                title="Quitter le Plein Écran"
              >
                <Minimize size={20} />
              </button>
            )}


            {/* Minimal overlays for artistic effect */}
            <button
              onClick={captureScreenshot}
              className="absolute top-4 left-4 z-50 bg-black/60 backdrop-blur border border-white/20 p-2 md:p-3 rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white"
              title="Télécharger une capture"
            >
              <Download size={20} />
            </button>
            <button
              onClick={() => setIsLowSpec(!isLowSpec)}
              className={`absolute top-4 left-[3.5rem] md:left-[4.5rem] z-50 bg-black/60 backdrop-blur border border-white/20 p-2 md:p-3 rounded-full hover:bg-white/20 transition-colors ${isLowSpec ? 'text-green-400 border-green-400/50' : 'text-white/70 hover:text-white'}`}
              title={isLowSpec ? "Désactiver le Mode Performance" : "Activer le Mode Performance"}
            >
              <Gauge size={20} />
            </button>
            <div className="absolute right-4 bottom-4 flex flex-col gap-1 items-end z-20 pointer-events-none mix-blend-difference">
               <span className="text-[9px] uppercase tracking-widest text-white/50 italic font-mono">{currentArtwork.type}</span>
               <span className="text-[9px] uppercase tracking-widest text-white/50 font-mono">EN COURS</span>
            </div>
            
            {/* Mobile Navigation (Floating) */}
            <div className="md:hidden absolute bottom-4 left-4 flex gap-4 z-20">
              <button onClick={() => setIsFullscreen(!isFullscreen)} className="bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-transform" title="Plein Écran">
                <Maximize size={16} />
              </button>
              <button onClick={goToPrev} className="bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-transform"><ChevronLeft size={16} /></button>
              <button onClick={goToNext} className="bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-transform"><ChevronRight size={16} /></button>
            </div>
            
            {/* Mobile Audio Toggle */}
            <div className="md:hidden absolute top-4 right-4 z-20">
              <button 
                onClick={toggleAudio} 
                className={`bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-all ${isAudioEnabled ? 'text-white' : 'text-white/50'}`}
              >
                {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: The Code & Editorial Metadata */}
        <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-white/10 p-8 md:p-12 flex flex-col justify-between bg-[#090909]/80 backdrop-blur-sm z-10 transition-all duration-300 md:overflow-y-auto custom-scrollbar">
          <div key={currentArtwork.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-2">
              ALGO<br/><span className="italic font-serif">{currentArtwork.title.split(' ')[1]}</span>
            </h1>
            <h2 className="text-lg md:text-xl font-medium tracking-wider mb-6 text-white/80">
              {currentArtwork.subTitle}
            </h2>
            <p className="text-xs text-white/50 leading-relaxed max-w-[320px] mb-12">
              {currentArtwork.description}
            </p>

            {/* The Code Block (Brutalist style) */}
            {currentArtwork.equation && (
              <div className="bg-black/50 text-white p-4 sm:p-6 mb-4 relative shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10 overflow-hidden flex items-center justify-center min-h-[100px]">
                <div className="absolute top-0 right-0 bg-black text-[9px] px-2 py-1 font-bold border-b border-l border-white/20 uppercase tracking-widest z-10">FORMULE</div>
                <div className="math-container w-full max-w-full flex justify-center">
                  <BlockMath math={currentArtwork.equation} />
                </div>
              </div>
            )}
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

      {/* About Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm" onClick={() => setIsAboutOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[#090909] border border-white/10 shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setIsAboutOpen(false)} 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">
              À propos des algos d'Alexandre.
            </h2>
            <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-8 border-b border-white/10 pb-6">
              Systèmes Dynamiques & Esthétique Computationnelle
            </div>
            
            <div className="space-y-6 text-sm text-white/80 leading-relaxed font-light">
              <p>
                Ce recueil rassemble une série d'explorations mathématiques et algorithmiques où le code devient la matière première de la création visuelle. Chaque pièce est un <em>système dynamique</em> autonome, défini par des règles mathématiques strictes (équations différentielles, fractales, champs de vecteurs, modèles de réaction-diffusion) qui génèrent des comportements complexes et souvent chaotiques.
              </p>
              <p>
                L'approche repose sur l'<strong>Esthétique Computationnelle</strong> : la recherche de la beauté organique non pas par le dessin manuel, mais par l'orchestration de millions de calculs par seconde. C'est l'expression visuelle de phénomènes invisibles, révélant la structure des attracteurs étranges, l'émergence de motifs naturels (Turing) ou la topologie complexe d'espaces repliés.
              </p>
              <p>
                En temps réel, les cartes graphiques (WebGL) et le processeur (Canvas 2D, Three.js) simulent des mondes contraints par des lois physiques simulées, où la fluidité du mouvement n'est que le résultat d'une intégration numérique (comme Runge-Kutta). 
              </p>
              <p>
                Il s'agit d'une invitation à contempler la précision du chaos.
              </p>
            </div>
            
            <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/40">
              <span>Code / Math / Art</span>
              <span>2024 - 2026</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
