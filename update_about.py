import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# 1. Add X to imports
content = content.replace(
    'import { ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";',
    'import { ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize, Minimize, X } from "lucide-react";'
)

# 2. Add isAboutOpen state
state_declaration = """
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
"""
content = content.replace("  const [isFullscreen, setIsFullscreen] = useState(false);", state_declaration)


# 3. Update Nav
nav_search = """        <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase font-medium items-center">"""
nav_replace = """        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase font-medium items-center">"""

content = content.replace(nav_search, nav_replace)

button_search = """            SUIV <ChevronRight size={14} />
          </button>
        </div>
      </nav>"""

button_replace = """            SUIV <ChevronRight size={14} />
          </button>
          </div>
          <button onClick={() => setIsAboutOpen(true)} className="w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors lowercase font-serif italic text-base leading-none" style={{paddingBottom: '2px'}} title="À propos">
            a
          </button>
        </div>
      </nav>"""

content = content.replace(button_search, button_replace)

# 4. Add Modal at the end of the return
modal_code = """
      {/* About Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-[#050505]/90 backdrop-blur-sm" onClick={() => setIsAboutOpen(false)} />
          <div className="relative w-full max-w-2xl bg-[#090909] border border-white/10 shadow-2xl p-8 md:p-12 overflow-y-auto max-h-[90vh]">
            <button 
              onClick={() => setIsAboutOpen(false)} 
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl md:text-4xl font-light tracking-tighter mb-4">
              À propos des algos d'Alexandre.
            </h2>
            <div className="text-xs tracking-[0.2em] uppercase text-white/50 mb-8 border-b border-white/10 pb-6">
              Systèmes Dynamiques & Esthétique Computationnelle
            </div>
            
            <div className="space-y-6 text-sm text-white/80 leading-relaxed font-light">
              <p>
                Ce recueil rassemble une série d'explorations mathématiques et algorithmiques où le code devient la matière première de la création visuelle. Chaque pièce est un <em>système dynamique</em> autonome, défini par des règles mathématiques strictes (équations différentielles, fractales, champs de vecteurs, modèles de réaction-diffusion) qui génèrent des comportements complexes et souvent chaotiques.
              </p>
              <p>
                L'approche repose sur l'<strong>Esthétique Computationnelle</strong> : la recherche de la beauté organique non pas par le dessin manuel, mais par l'orchestration de millions de calculs par seconde. C'est l'expression visuelle de phénomènes invisibles, révélant la structure des attracteurs étranges, l'émergence de motifs naturels (Turing) ou la topologie complexe d'espaces repliés.
              </p>
              <p>
                En temps réel, les cartes graphiques (WebGL) et le processeur (Canvas 2D, Three.js) simulent des mondes contraints par des lois physiques simulées, où la fluidité du mouvement n'est que le résultat d'une intégration numérique (comme Runge-Kutta). 
              </p>
              <p>
                Il s'agit d'une invitation à contempler la précision du chaos.
              </p>
            </div>
            
            <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/40">
              <span>Code / Math / Art</span>
              <span>2024 - 2026</span>
            </div>
          </div>
        </div>
      )}
    </div>
"""

content = content.replace("    </div>\n  );\n}\n", modal_code + "  );\n}\n")


with open("src/App.tsx", "w") as f:
    f.write(content)
