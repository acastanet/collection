import re

with open("src/App.tsx", "r") as f:
    content = f.read()

search_formula = """              <div className="bg-black/50 text-white p-5 sm:p-6 mb-4 relative shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10 overflow-x-auto custom-scrollbar">
                <div className="absolute top-0 right-0 bg-black text-[10px] px-2 py-1 font-bold border-b border-l border-white/20 uppercase tracking-widest z-10">FORMULE</div>
                <div className="text-[11px] sm:text-xs min-w-max pr-4">
                  <BlockMath math={currentArtwork.equation} />
                </div>
              </div>"""

replace_formula = """              <div className="bg-black/50 text-white p-4 sm:p-6 mb-4 relative shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10 overflow-hidden flex items-center justify-center min-h-[100px]">
                <div className="absolute top-0 right-0 bg-black text-[9px] px-2 py-1 font-bold border-b border-l border-white/20 uppercase tracking-widest z-10">FORMULE</div>
                <div className="math-container w-full max-w-full flex justify-center">
                  <BlockMath math={currentArtwork.equation} />
                </div>
              </div>"""

content = content.replace(search_formula, replace_formula)

with open("src/App.tsx", "w") as f:
    f.write(content)
