import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def fix_french_typo(text):
    text = re.sub(r'([^\s])\s*([!?:;])', r'\1 \2', text)
    text = re.sub(r'\s+', ' ', text)
    return text

artworks_data = [
    {
        "id": "algo-0x02",
        "desc_find": "Représentations des sphères. Shader WebGL pur explorant l'accumulation de rayons intersectant des sphères de bruit isomorphes. L'affichage des seuls contours (smoothstep sur l'isosurface) permet de rendre la structure perméable et de voir les couches intérieures.",
        "eq": r"D = (\\mathbf{r}_d \\cdot \\mathbf{r}_o)^2 - (\\|\\mathbf{r}_o\\|^2 - R^2)"
    },
    {
        "id": "algo-0x03",
        "desc_find": "Le nœud de trèfle (Triquetra). L'exemple le plus simple d'un nœud non trivial, formé d'une courbe continue et fermée entrelacée. Modélisé comme un ruban tubulaire avec des arêtes marquées pour accentuer le volume.",
        "eq": r"\\begin{cases} x(t) = \\frac{r}{2} (2 + \\cos(qt / p)) \\cos(t) \\\\ y(t) = \\frac{r}{2} (2 + \\cos(qt / p)) \\sin(t) \\\\ z(t) = \\frac{r}{2} \\sin(qt / p) \\end{cases}"
    },
    {
        "id": "algo-0x04",
        "desc_find": "Tsubuyaki GLSL. Un nuage fractal rendu en quelques dizaines de caractères de shader, utilisant le raymarching et un système de bruit cumulatif.",
        "eq": r"F(p) = -p_y + \\sum_{k} \\frac{\\langle \\sin(s_k p), \\cos(s_k p) \\rangle}{s_k}"
    }
]

for a in artworks_data:
    repl = fix_french_typo(a['desc_find'])
    content = content.replace(f'description: "{a["desc_find"]}"', f'description: "{repl}",\n    equation: "{a["eq"]}"')

with open("src/App.tsx", "w") as f:
    f.write(content)
