import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace the nav buttons block
target1 = r'<button onClick={goToPrev} className="hover:text-white/60 transition-colors flex items-center gap-1">\s*<ChevronLeft size={14} /> PRÉC\s*</button>\s*<button onClick={goToNext} className="hover:text-white/60 transition-colors flex items-center gap-1">\s*SUIV <ChevronRight size={14} />\s*</button>\s*</div>'

replacement1 = r'''<button onClick={() => setIsFullscreen(!isFullscreen)} className="hover:text-white/60 transition-colors flex items-center gap-1" title={isFullscreen ? "Quitter le Plein Écran" : "Plein Écran"}>
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />} {isFullscreen ? "RÉDUIRE" : "PLEIN ÉCRAN"}
          </button>
          <div className="text-white/20">|</div>
          <button onClick={goToPrev} className="hover:text-white/60 transition-colors flex items-center gap-1">
            <ChevronLeft size={14} /> PRÉC
          </button>
          <button onClick={goToNext} className="hover:text-white/60 transition-colors flex items-center gap-1">
            SUIV <ChevronRight size={14} />
          </button>
        </div>'''

if target1 in content:
    print("Direct string found?! (Unlikely due to spaces)")
    
content = re.sub(target1, replacement1, content)

with open('src/App.tsx', 'w') as f:
    f.write(content)
