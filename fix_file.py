import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# We want to replace everything from "metadata: { label: string; value: string }[  ,{" to the corresponding "}];" that got placed right after the first `];` it replaced.
# Actually, the python script did:
# parts = content.split("];\n")
# new_content = parts[0] + algo_str_js + "];\n" + "];\n".join(parts[1:])

# Because parts[0] ended right before the first `];\n` which is at line 16.
# So parts[0] is `... metadata: { label: string; value: string }[`
# Then algo_str_js was appended.
# Then `];\n` was appended.
# Then the rest of the file joined by `];\n`.

# We can fix this by finding the `algo-0x0c` block that was inserted at the top and removing it.
# And restoring the `];\n` to `}[];\n` at the type definition.

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

algo_str_js = "  ,{\n"
algo_str_js += f'    id: "{new_algo["id"]}",\n'
algo_str_js += f'    title: "{new_algo["title"]}",\n'
algo_str_js += f'    subTitle: "{new_algo["subTitle"]}",\n'
algo_str_js += f'    description: "{new_algo["description"]}",\n'
algo_str_js += f'    equation: "{new_algo["equation"]}",\n'
algo_str_js += f'    type: "{new_algo["type"]}",\n'
html_safe = new_algo["htmlContent"].replace("`", "\\`").replace("${", "\\${")
algo_str_js += f'    htmlContent: `{html_safe}`,\n'
algo_str_js += f'    code: `{new_algo["code"]}`,\n'
algo_str_js += f'    metadata: {json.dumps(new_algo["metadata"], indent=6)}\n  }}\n'

# The broken string is exactly:
broken_str = "metadata: { label: string; value: string }[" + algo_str_js + "];\n"
fixed_str = "metadata: { label: string; value: string }[];\n"

if broken_str in content:
    content = content.replace(broken_str, fixed_str)
    
    # Now we need to append the algo to the REAL end of the artworks array.
    # The real end looks like:
    #   }
    # ];
    # But wait, we can just replace the last `];\n` or `];` in the file?
    # No, there is only one `];\n` now! Wait, there was only one `];\n` in the file originally, which was the end of `Artwork[]`.
    # Wait, the type definition `metadata: { label: string; value: string }[];\n` has `];\n`.
    # And the `const artworks: Artwork[] = [ ... ];\n` has `];\n`.
    
    # We can split by `\n];`
    
    parts = content.split("\n];")
    if len(parts) >= 2:
        # The first part is the array content. We append our algo to it.
        # But wait, what if there are multiple \n]; ?
        # Let's just find the last `}` before `\n];`
        
        # Let's find where the array ends.
        
        target = "    type: \"CANVAS 2D\",\n"
        idx = content.find("algo-0x0b")
        if idx != -1:
            idx_end = content.find("  }", idx)
            # Find the closing brace of algo-0x0b
            idx_end = content.find("  }", idx_end) + 3
            
            # insert our algo here
            content = content[:idx_end] + "\n" + algo_str_js + content[idx_end:]
            print("Successfully patched")
        else:
            print("Could not find algo-0x0b")

    with open("src/App.tsx", "w") as f:
        f.write(content)
else:
    print("Could not find broken string")

