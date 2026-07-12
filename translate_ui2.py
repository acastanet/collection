import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacements = {
    ">Parameters<": ">Paramètres<",
    ">Hide<": ">Masquer<",
    ">Curl Amplitude<": ">Amplitude de Boucle<",
    ">Twist Scale<": ">Échelle de Torsion<",
    ">Glow Intensity<": ">Intensité de Lueur<",
    ">Auto-Rotation<": ">Rotation Auto<",
    ">Show Soft Pole p(t)<": ">Afficher Pôle Doux p(t)<",
    ">Wave Field (μ)<": ">Champ d'Ondes (μ)<",
    "Press [SPACE] or Click to Reseed": "Appuyez sur [ESPACE] ou Cliquez pour Régénérer",
    "SYS_RUNNING": "EN COURS",
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('src/App.tsx', 'w') as f:
    f.write(content)

