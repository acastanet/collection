import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacements = {
    '"Noise Spheres"': '"Sphères de Bruit"',
    '"Trefoil Knot"': '"Nœud de Trèfle"',
    '"Fractal Cloud"': '"Nuage Fractal"',
    '"Vector Contour System"': '"Système de Contours Vectoriels"',
    'Generative Algorithm Archives': 'Archives d\'Algorithmes Génératifs',
    'A curated collection of procedural, mathematical, and generative studies.': 'Une collection d\'études procédurales, mathématiques et génératives.',
    'PREV <ChevronLeft': 'PRÉC <ChevronLeft',
    'NEXT <ChevronRight': 'SUIV <ChevronRight',
    '>METADATA<': '>MÉTADONNÉES<',
    '>LOGIC<': '>LOGIQUE<',
    '>SOURCE CODE<': '>CODE SOURCE<',
    '>ARCHIVE<': '>ARCHIVES<'
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('src/App.tsx', 'w') as f:
    f.write(content)

