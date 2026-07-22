import json
import sys

code = """const P1_Value = 0.19; // 時間が進む速さを設定します。
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

const vShader = `precision mediump float;
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0);
}`;

const fShader = `precision mediump float;
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
}`;

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
"""

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ribbon Flow Shader</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
  <style>
    body {{ margin: 0; padding: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; }}
    canvas {{ width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 30px rgba(0,0,0,0.9); border-radius: 4px; }}
  </style>
</head>
<body>
  <script>
{code}
  </script>
</body>
</html>"""

# Now inject this into the react_code array
with open("src/App.tsx", "r") as f:
    app_code = f.read()

idx = app_code.rfind("  }\n];")
if idx == -1:
    print("Could not find end of artworks array")
    sys.exit(1)

new_app = app_code[:idx] + "  },\n  {\n"

esc_code = code.replace('`', '\\`').replace('${', '\\${')
esc_html = html_content.replace('`', '\\`').replace('${', '\\${')

new_app += f"""    id: "algo-0x0d",
    title: "ALGO 0x0D",
    subTitle: "Flux Paramétrique",
    description: "Simulation d'un champ scalaire chaotique calculé directement sur le GPU via un shader WebGL. Le système résout des équations de flux pour générer des faisceaux lumineux organiques qui évoluent et se tordent en fonction d'un bruit fractal complexe et de fonctions trigonométriques.",
    equation: "\\\\begin{{aligned}} p_{{new}} &= p - \\\\nabla(\\\\text{{fbm}}(p \\\\cdot p_2 + t)) \\\\cdot p_5 \\\\\\\\ c_{{total}} &= \\\\sum_{{i=0}}^{{32}} e^{{-d \\\\cdot p_7}} \\\\cdot (1 - \\\\frac{{i}}{{p_4}}) \\\\end{{aligned}}",
    type: "P5.JS SHADER",
    code: `{esc_code}`,
    htmlContent: `{esc_html}`,
    metadata: [
        {{ label: "Moteur", value: "P5.js WebGL" }},
        {{ label: "Bruit", value: "Fractal Brownian Motion" }},
        {{ label: "Rendu", value: "Raymarching 2D" }}
    ]
"""

new_app += app_code[idx:]

with open("src/App.tsx", "w") as f:
    f.write(new_app)

