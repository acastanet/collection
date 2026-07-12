import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def fix_french_typo(text):
    text = re.sub(r'([^\s])\s*([!?:;])', r'\1 \2', text)
    text = re.sub(r'\s+', ' ', text)
    return text

artworks_data = [
    {
        "id": "algo-0x01",
        "desc_find": "Une exploration de la convergence trigonométrique et de la désintégration orbitale exprimée à travers 280 caractères de logique.",
        "eq": r"\\begin{cases} k = 4 \\cos(\\frac{x}{21}), \\quad e = \\frac{y}{8} - 20 \\\\ q = 3 \\sin(2k) + \\frac{0.3}{k} + \\sin(\\frac{y}{19})k(9 + 2 \\sin(14e - 3d + 2t)) \\end{cases}"
    },
    {
        "id": "algo-0x05",
        "desc_find": "Système de cross-hatching paramétrique. Applique un champ de vecteurs tangents (produit vectoriel du gradient par un plan spatial) pour tracer des polylignes fluides à la surface d'une iso-forme (gyroid). Le résultat est un véritable maillage filaire semi-transparent qui révèle ses propres contours.",
        "eq": r"f(x, y, z) = \\sin x \\cos y + \\sin y \\cos z + \\sin z \\cos x = 0"
    },
    {
        "id": "algo-0x06",
        "desc_find": "Quelle forme prend le chaos avant de sembler aléatoire ? Prenez une particule évoluant dans le Hamiltonien de Hénon-Heiles. Son mouvement est régi par les équations de Hamilton. Sous l'énergie de selle, un minuscule paquet de conditions initiales proches s'étire en filaments, se replie à travers le potentiel, et commence à paraître presque aléatoire.",
        "eq": r"H = \\frac{1}{2}(p_x^2 + p_y^2 + x^2 + y^2) + \\lambda\\left(x^2 y - \\frac{y^3}{3}\\right)"
    }
]

for a in artworks_data:
    repl = fix_french_typo(a['desc_find'])
    content = content.replace(f'description: "{a["desc_find"]}"', f'description: "{repl}",\n    equation: "{a["eq"]}"')

with open("src/App.tsx", "w") as f:
    f.write(content)
