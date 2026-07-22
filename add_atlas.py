import sys

with open("atlas60.js", "r") as f:
    js_code = f.read()

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Generative Shader Atlas 60</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>
  <style>
    body {{ margin: 0; padding: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; }}
    canvas {{ width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 30px rgba(0,0,0,0.9); border-radius: 4px; }}
  </style>
</head>
<body>
  <script>
{js_code}
  </script>
</body>
</html>"""

with open("/app/applet/src/App.tsx", "r") as f:
    app_code = f.read()

idx = app_code.rfind("  }\n];")
if idx == -1:
    print("Could not find end of artworks array")
    sys.exit(1)

new_app = app_code[:idx] + "  },\n  {\n"

esc_code = js_code.replace('`', '\\`').replace('${', '\\${')
esc_html = html_content.replace('`', '\\`').replace('${', '\\${')

new_app += f"""    id: "algo-0x0e",
    title: "ALGO 0x0E",
    subTitle: "Shader Atlas 60",
    description: "Une collection gigantesque de 60 systèmes de shaders génératifs WebGL en temps réel. Cette œuvre interactive inclut sa propre interface utilisateur pour manipuler les champs vectoriels, fractales et dynamiques fluides, et permet d'exporter les algorithmes de manière indépendante.",
    equation: "\\\\text{{Atlas}}(u, v) = \\\\sum_{{k=1}}^{{60}} \\\\mathcal{{S}}_k(u, v, t, \\\\vec{{p}})",
    type: "P5.JS SHADER ATLAS",
    code: `{esc_code}`,
    htmlContent: `{esc_html}`,
    metadata: [
        {{ label: "Moteur", value: "P5.js WebGL" }},
        {{ label: "Systèmes", value: "60 Shaders" }},
        {{ label: "Rendu", value: "Multi-domain" }}
    ]
"""

new_app += app_code[idx:]

with open("/app/applet/src/App.tsx", "w") as f:
    f.write(new_app)
