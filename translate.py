import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

replacements = {
    '"Orbital Decay"': '"Désintégration Orbitale"',
    '"An exploration of trigonometric convergence and orbital decay expressed through 280 characters of logic."': '"Une exploration de la convergence trigonométrique et de la désintégration orbitale exprimée à travers 280 caractères de logique."',
    
    '"Hénon-Heiles Hamiltonian"': '"Hamiltonien de Hénon-Heiles"',
    '"What Shape Does Chaos Take Before It Looks Random? Take one particle moving in the Hénon-Heiles Hamiltonian. Its motion is forced by Hamilton’s equations. Below the saddle energy, a tiny packet of nearby initial conditions stretches into filaments, folds through the potential, and begins to look almost random."': '"Quelle forme prend le chaos avant de sembler aléatoire ? Prenez une particule évoluant dans le Hamiltonien de Hénon-Heiles. Son mouvement est régi par les équations de Hamilton. Sous l\'énergie de selle, un minuscule paquet de conditions initiales proches s\'étire en filaments, se replie à travers le potentiel, et commence à paraître presque aléatoire."',
    
    '"Lorenz Attractor"': '"Attracteur de Lorenz"',
    '"The classical Lorenz system (σ=10, ρ=28, β=8/3) drawn in 3D to trace the iconic butterfly trajectory. A divergence-free 3D curl noise is applied to undulate the entire shape, while additive blending of lines and points creates a radiant bloom effect. The whole scene rotates slowly around the Y-axis."': '"Le système classique de Lorenz (σ=10, ρ=28, β=8/3) dessiné en 3D pour tracer l\'emblématique trajectoire en papillon. Un bruit de boucle (curl noise) 3D sans divergence est appliqué pour faire onduler toute la forme, tandis que le mélange additif de lignes et de points crée un effet de floraison radieuse. L\'ensemble de la scène tourne lentement autour de l\'axe Y."',

    '"Dynamical Systems"': '"Systèmes Dynamiques"',
    '"A Soft Singularity Pulls Phase Space Into Waves. Inspired by the work of @S_Conradi. A moving reciprocal fold pulls nearby orbits into sharp folds, while a sine term creates repeated wave-like bands. The image is a record of where the map keeps returning."': '"Une singularité douce attire l\'espace des phases en ondes. Inspiré par les travaux de @S_Conradi. Un pli réciproque en mouvement tire les orbites voisines en plis nets, tandis qu\'un terme sinusoïdal crée des bandes répétées ressemblant à des vagues. L\'image est un enregistrement des endroits où la carte revient sans cesse."',
    
    '"Reaction-Diffusion"': '"Réaction-Diffusion"',
    '"Gray-Scott diffusion-reaction parameters and pattern scale, modulated by a continuous spatial field. The slowly time-evolving fractional Brownian motion maps the reaction into a stable Pearson classification path (spots → worms → maze), producing varying size and behavior seamlessly across the single domain. Finished with paper thresholding and thin shadows."': '"Paramètres de diffusion-réaction de Gray-Scott et échelle de motif, modulés par un champ spatial continu. Le mouvement brownien fractionnaire évoluant lentement dans le temps mappe la réaction vers un chemin de classification de Pearson stable (taches → vers → labyrinthe), produisant des tailles et des comportements variés de manière transparente sur un seul domaine. Terminé par un seuillage texturé et des ombres fines."',
    
    '"Vector Flow Field"': '"Champ de Flux Vectoriel"',
    '"A high-density particle system tracing the gradients of a multi-octave 3D simplex noise field. Thousands of autonomous agents sample the continuous vector field to determine their headings. Their trails accumulate over time to reveal the invisible topological contours, producing organic, hair-like fluid structures."': '"Un système de particules à haute densité traçant les gradients d\'un champ de bruit simplex 3D multi-octaves. Des milliers d\'agents autonomes échantillonnent le champ de vecteurs continu pour déterminer leurs caps. Leurs traînées s\'accumulent au fil du temps pour révéler les contours topologiques invisibles, produisant des structures fluides organiques similaires à des cheveux."'
}

for k, v in replacements.items():
    content = content.replace(k, v)

with open('src/App.tsx', 'w') as f:
    f.write(content)

