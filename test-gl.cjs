const gl = require('gl')(400, 400);

const vs = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vs, '#version 300 es\nin vec4 position; void main() { gl_Position = position; }');
gl.compileShader(vs);

const fs = gl.createShader(gl.FRAGMENT_SHADER);
const src = `#version 300 es
precision highp float;
out vec4 O; uniform float t; uniform vec2 r; 

vec3 hsv(float h, float s, float v) {
    vec4 k = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + k.xyz) * 6.0 - vec3(k.w));
    return v * mix(vec3(k.x), clamp(p - vec3(k.x), 0.0, 1.0), s);
}

void main() {
    float i=0.,e=0.,R=0.,s=0.;
    vec3 q=vec3(0.0),p=vec3(0.0);
    vec3 d=vec3(gl_FragCoord.xy/r*.6-vec2(.4,-.6),.5);
    vec4 o=vec4(0.0,0.0,0.0,1.0);
    
    q.z -= 1.0;
    q.y -= 1.0;
    
    for(int j=0; j<67; j++){
        o.rgb+=hsv(.6,e-q.z,min(e*s,1.)/64.);
        s=3.;
        q+=d*e*R*.5+1e-4;
        p=q;
        R=length(p);
        p=vec3(log(R)-t*.2,exp(-p.z/R)+.23,atan(p.y,p.x));
        p.y -= 1.0;
        e=p.y;
        for(int k=0; k<9; k++){
            if(s>=1e3) break;
            e+=dot(sin(p.zxx*s),.4-cos(p.yzy*s))/s*.25;
            s+=s;
        }
    }
    O = o;
}`;
gl.shaderSource(fs, src);
gl.compileShader(fs);

if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(fs));
} else {
    console.log("Compiled successfully!");
}
