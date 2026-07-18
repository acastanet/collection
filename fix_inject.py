import re

# Recover original file by removing the broken injection
with open("src/App.tsx", "r") as f:
    content = f.read()

# I need to find `metadata: { label: string; value: string }[  ,{` and fix it.
content = content.replace("metadata: { label: string; value: string }[  ,{\n    id: \"algo-0x0c\",", "metadata: { label: string; value: string }[];\n/* INJECT_MARKER */")

# Remove the rest of the injected code
import json

with open("mandelbulb.html", "r") as f:
    html_content = f.read()

new_algo = {
    "id": "algo-0x0c",
    "title": "ALGO 0x0C",
    "subTitle": "Fractale Mandelbulb",
    "description": "Une plongée dans le Mandelbulb, l'analogue tridimensionnel de l'ensemble de Mandelbrot. Construit par raymarching à travers un champ de distance, révélant une géométrie fractale infiniment complexe où l'espace se replie sur lui-même à chaque itération. Le système respire en interpolant continuellement la puissance de la fractale.",
    "equation": "\\begin{aligned} r &= |z| \\\\ \\theta &= \\arccos(z_z / r) \\\\ \\phi &= \\arctan(z_y, z_x) \\\\ z_{n+1} &= r^n \\begin{pmatrix} \\sin(n\\theta)\\cos(n\\phi) \\\\ \\sin(n\\theta)\\sin(n\\phi) \\\\ \\cos(n\\theta) \\end{pmatrix} + c \\end{aligned}",
    "type": "WEBGL 3D",
    "htmlContent": html_content,
    "metadata": [
        { "label": "Rendu", "value": "Raymarching" },
        { "label": "Espace", "value": "Coordonnées Sphériques" },
        { "label": "Complexité", "value": "Itérative Infinie" }
    ],
    "code": """// Raymarching distance estimator for Mandelbulb
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
}"""
}

# we must rebuild the file properly
import subprocess
subprocess.run("git checkout src/App.tsx", shell=True)
