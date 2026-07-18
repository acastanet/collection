import subprocess

with open("src/App.tsx", "r") as f:
    full_content = f.read()

top_15 = "\n".join(full_content.split("\n")[:15]) + "\n"

with open("artworks_good.txt", "r") as f:
    artworks_good = f.read()

algo_0xb_tail = """
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
        hudParams.innerText = `a=${a.toFixed(3)} b=${b.toFixed(3)}\\nc=${c.toFixed(3)} d=${d.toFixed(3)}`;
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
  }"""

algo_0xc = """  ,{
    id: "algo-0x0c",
    title: "ALGO 0x0C",
    subTitle: "Fractale Mandelbulb",
    description: "Une plongée dans le Mandelbulb, l'analogue tridimensionnel de l'ensemble de Mandelbrot. Construit par raymarching à travers un champ de distance, révélant une géométrie fractale infiniment complexe où l'espace se replie sur lui-même à chaque itération. Le système respire en interpolant continuellement la puissance de la fractale.",
    equation: "\\\\begin{aligned} r &= |z| \\\\\\\\ \\\\theta &= \\\\arccos(z_z / r) \\\\\\\\ \\\\phi &= \\\\arctan(z_y, z_x) \\\\\\\\ z_{n+1} &= r^n \\\\begin{pmatrix} \\\\sin(n\\\\theta)\\\\cos(n\\\\phi) \\\\\\\\ \\\\sin(n\\\\theta)\\\\sin(n\\\\phi) \\\\\\\\ \\\\cos(n\\\\theta) \\\\end{pmatrix} + c \\\\end{aligned}",
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
    gl.shaderSource(vs, '#version 300 es\\\\nin vec4 position; void main() { gl_Position = position; }');
    gl.compileShader(vs); gl.attachShader(prog, vs);
    
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, \\`#version 300 es
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
\\` );
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
  }
];
"""

with open("react_code.tsx", "r") as f:
    react_code = f.read()

new_file = top_15 + artworks_good + algo_0xb_tail + "\n" + algo_0xc + "\n" + react_code

with open("src/App.tsx", "w") as f:
    f.write(new_file)

