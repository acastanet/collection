import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Fix French typography in descriptions
# In French: space before : ; ! ? (narrow no-break space ideally, but regular space is often used in code)
# space before ? ! : ;
def fix_french_typo(text):
    text = re.sub(r'([^\s])\s*([!?:;])', r'\1 \2', text)
    # Also handle some edge cases if needed, but simple sub is okay
    # Remove double spaces
    text = re.sub(r'\s+', ' ', text)
    return text

# We will just manually fix the descriptions for the few artworks
# Let's extract them, fix them, and add `equation: "..."`

artworks_data = [
    {
        "id": "algo-0x01",
        "desc_find": "Le système classique de Lorenz (σ=10, ρ=28, β=8/3) dessiné en 3D pour tracer l'emblématique trajectoire en papillon. Un bruit de boucle (curl noise) 3D sans divergence est appliqué pour faire onduler toute la forme, tandis que le mélange additif de lignes et de points crée un effet de floraison radieuse. L'ensemble de la scène tourne lentement autour de l'axe Y.",
        "desc_repl": "Le système classique de Lorenz (σ=10, ρ=28, β=8/3) dessiné en 3D pour tracer l'emblématique trajectoire en papillon. Un bruit de boucle (curl noise) 3D sans divergence est appliqué pour faire onduler toute la forme, tandis que le mélange additif de lignes et de points crée un effet de floraison radieuse. L'ensemble de la scène tourne lentement autour de l'axe Y.",
        "eq": r"\\begin{cases} \\frac{dx}{dt} = \\sigma(y - x) \\\\ \\frac{dy}{dt} = x(\\rho - z) - y \\\\ \\frac{dz}{dt} = xy - \\beta z \\end{cases}"
    },
    {
        "id": "algo-0x07",
        "desc_find": "Une singularité douce attire l'espace des phases en ondes. Inspiré par les travaux de @S_Conradi. Un pli réciproque en mouvement tire les orbites voisines en plis nets, tandis qu'un terme sinusoïdal crée des bandes répétées ressemblant à des vagues. L'image est un enregistrement des endroits où la carte revient sans cesse.",
        "desc_repl": "Une singularité douce attire l'espace des phases en ondes. Inspiré par les travaux de @S_Conradi. Un pli réciproque en mouvement tire les orbites voisines en plis nets, tandis qu'un terme sinusoïdal crée des bandes répétées ressemblant à des vagues. L'image est un enregistrement des endroits où la carte revient sans cesse.",
        "eq": r"z_{n+1} = z_n + \\frac{\\lambda(t) \\overline{(z_n - p(t))}}{|z_n - p(t)|^2 + \\sigma^2} + \\mu(t) \\sin(\\kappa(t) z_n)"
    },
    {
        "id": "algo-0x08",
        "desc_find": "Paramètres de diffusion-réaction de Gray-Scott et échelle de motif, modulés par un champ spatial continu. Le mouvement brownien fractionnaire évoluant lentement dans le temps mappe la réaction vers un chemin de classification de Pearson stable (taches → vers → labyrinthe), produisant des tailles et des comportements variés de manière transparente sur un seul domaine. Terminé par un seuillage texturé et des ombres fines.",
        "desc_repl": "Paramètres de diffusion-réaction de Gray-Scott et échelle de motif, modulés par un champ spatial continu. Le mouvement brownien fractionnaire évoluant lentement dans le temps mappe la réaction vers un chemin de classification de Pearson stable (taches → vers → labyrinthe), produisant des tailles et des comportements variés de manière transparente sur un seul domaine. Terminé par un seuillage texturé et des ombres fines.",
        "eq": r"\\begin{cases} \\frac{\\partial u}{\\partial t} = D_u \\nabla^2 u - u v^2 + f(1 - u) \\\\ \\frac{\\partial v}{\\partial t} = D_v \\nabla^2 v + u v^2 - (f + k)v \\end{cases}"
    },
    {
        "id": "algo-0x0a",
        "desc_find": "Un système de particules à haute densité traçant les gradients d'un champ de bruit simplex 3D multi-octaves. Des milliers d'agents autonomes échantillonnent le champ de vecteurs continu pour déterminer leurs caps. Leurs traînées s'accumulent au fil du temps pour révéler les contours topologiques invisibles, produisant des structures fluides organiques similaires à des cheveux.",
        "desc_repl": "Un système de particules à haute densité traçant les gradients d'un champ de bruit simplex 3D multi-octaves. Des milliers d'agents autonomes échantillonnent le champ de vecteurs continu pour déterminer leurs caps. Leurs traînées s'accumulent au fil du temps pour révéler les contours topologiques invisibles, produisant des structures fluides organiques similaires à des cheveux.",
        "eq": r"\\begin{cases} \\theta = \\text{noise3D}(x, y, t) \\cdot 4\\pi \\\\ v_x = \\cos(\\theta) \\cdot s \\\\ v_y = \\sin(\\theta) \\cdot s \\end{cases}"
    },
    {
        "id": "algo-0x0b",
        "desc_find": "Inspiré des systèmes dynamiques partagés par Simone Conradi. Un Attracteur de Clifford rendu en temps réel via Canvas 2D. Les paramètres (a, b) évoluent lentement et continuellement, révélant la nature fractale et chaotique du système. La couleur de chaque point est dérivée de sa 'vélocité' dans l'espace des phases.",
        "desc_repl": "Inspiré des systèmes dynamiques partagés par Simone Conradi. Un Attracteur de Clifford rendu en temps réel via Canvas 2D. Les paramètres (a, b) évoluent lentement et continuellement, révélant la nature fractale et chaotique du système. La couleur de chaque point est dérivée de sa « vélocité » dans l'espace des phases.",
        "eq": r"\\begin{cases} x_{n+1} = \\sin(a y_n) + c \\cos(a x_n) \\\\ y_{n+1} = \\sin(b x_n) + d \\cos(b y_n) \\end{cases}"
    }
]

for a in artworks_data:
    repl = fix_french_typo(a['desc_repl'])
    content = content.replace(f'description: "{a["desc_find"]}"', f'description: "{repl}",\n    equation: "{a["eq"]}"')

with open("src/App.tsx", "w") as f:
    f.write(content)

