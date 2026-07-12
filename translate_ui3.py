import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacements = {
    '"Dynamical System"': '"Système Dynamique"',
    '"Energy Level"': '"Niveau d\'Énergie"',
    '"Integration"': '"Intégration"',
    '"Perturbation"': '"Perturbation"',
    '"Rendering"': '"Rendu"',
    '"Dynamics"': '"Dynamiques"',
    '"Color Space"': '"Espace Colorimétrique"',
    '"Modulation"': '"Modulation"',
    '"Stable Path"': '"Chemin Stable"',
    '"Algorithm"': '"Algorithme"',
    '"Entities"': '"Entités"',
    '"Topology"': '"Topologie"',
    '"Hamiltonian mechanics"': '"Mécanique hamiltonienne"',
    '"E < Es (Bound state)"': '"E < Es (État lié)"',
    '"Runge-Kutta 4th Order"': '"Runge-Kutta Ordre 4"',
    '"Divergence-Free Curl Noise"': '"Bruit de Boucle sans Divergence"',
    '"Additive Bloom Points/Lines"': '"Points/Lignes Additifs"',
    '"Reciprocal Fold Map"': '"Carte à Pli Réciproque"',
    '"Orbit Density Fade"': '"Estompement Densité Orbite"',
    '"Coral & Pearl Ridges"': '"Crêtes Corail & Perle"',
    '"Fractional Brownian Motion"': '"Mouvement Brownien Fractionnaire"',
    '"Spots → Maze"': '"Taches → Labyrinthe"',
    '"Paper & Ink"': '"Papier & Encre"',
    '"Simplex Noise Flow"': '"Flux Bruit Simplex"',
    '"6,000 Autonomous Agents"': '"6 000 Agents Autonomes"',
    '"Torus Wrap Space"': '"Espace Torique"'
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('src/App.tsx', 'w') as f:
    f.write(content)

