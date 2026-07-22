import sys
import json

def escape_tsx(s):
    s = s.replace('\\', '\\\\')
    s = s.replace('`', '\\`')
    s = s.replace('${', '\\${')
    return s

with open("shader_1_code.txt", "r") as f:
    code_1 = f.read()
with open("shader_1_html.txt", "r") as f:
    html_1 = f.read()

with open("shader_13_code.txt", "r") as f:
    code_13 = f.read()
with open("shader_13_html.txt", "r") as f:
    html_13 = f.read()

with open("/app/applet/src/App.tsx", "r") as f:
    app_code = f.read()

idx = app_code.rfind("  }\n];")
if idx == -1:
    print("Could not find end of artworks array")
    sys.exit(1)

new_app = app_code[:idx] + "  },\n"

new_app += f"""  {{
    id: "algo-0x0f",
    title: "ALGO 0x0F",
    subTitle: "Domain Warp (Atlas #1)",
    description: "Une distorsion de domaine classique utilisant du bruit fractal. La coordonnée d'échantillonnage est décalée par un champ de bruit, qui est lui-même décalé par un autre champ de bruit, créant des fluides organiques récursifs.",
    equation: "p' = p + \\\\nabla \\\\text{{fbm}}(p + \\\\text{{fbm}}(p))",
    type: "P5.JS SHADER",
    code: `{escape_tsx(code_1)}`,
    htmlContent: `{escape_tsx(html_1)}`,
    metadata: [
        {{ label: "Moteur", value: "P5.js WebGL" }},
        {{ label: "Technique", value: "Domain Warping" }},
        {{ label: "Bruit", value: "Fractal Brownian Motion" }}
    ]
  }},
  {{
    id: "algo-0x10",
    title: "ALGO 0x10",
    subTitle: "Procedural Nebula (Atlas #13)",
    description: "Simulation d'une nébuleuse stellaire par raymarching volumétrique simplifié. Le gaz est simulé par un bruit exponentiel fortement contrasté, avec un champ d'étoiles parsemé en arrière-plan.",
    equation: "c = \\\\text{{fbm}}(p + \\\\text{{fbm}}(p))^k + \\\\text{{stars}}(p)",
    type: "P5.JS SHADER",
    code: `{escape_tsx(code_13)}`,
    htmlContent: `{escape_tsx(html_13)}`,
    metadata: [
        {{ label: "Moteur", value: "P5.js WebGL" }},
        {{ label: "Rendu", value: "Volumetric FBM" }},
        {{ label: "Effet", value: "Cosmic Glow" }}
    ]
"""

new_app += app_code[idx:]

with open("/app/applet/src/App.tsx", "w") as f:
    f.write(new_app)

