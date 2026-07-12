import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# 1. Fix the main scrollbar
content = content.replace(
    'bg-[#090909]/80 backdrop-blur-sm z-10 transition-all duration-300 md:overflow-y-auto"',
    'bg-[#090909]/80 backdrop-blur-sm z-10 transition-all duration-300 md:overflow-y-auto custom-scrollbar"'
)

# 2. Fix the formula container
search_formula = """              <div className="bg-black/50 text-white p-5 sm:p-6 mb-4 relative shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10">
                <div className="absolute -top-3 -right-3 bg-black text-[10px] px-2 py-1 font-bold border border-white/20 uppercase tracking-widest">FORMULE</div>
                <BlockMath math={currentArtwork.equation} />
              </div>"""

replace_formula = """              <div className="bg-black/50 text-white p-5 sm:p-6 mb-4 relative shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10 overflow-x-auto custom-scrollbar">
                <div className="absolute top-0 right-0 bg-black text-[10px] px-2 py-1 font-bold border-b border-l border-white/20 uppercase tracking-widest z-10">FORMULE</div>
                <div className="text-[11px] sm:text-xs min-w-max pr-4">
                  <BlockMath math={currentArtwork.equation} />
                </div>
              </div>"""

content = content.replace(search_formula, replace_formula)

with open("src/App.tsx", "w") as f:
    f.write(content)
