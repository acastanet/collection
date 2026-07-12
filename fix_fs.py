import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add Fullscreen button to desktop nav
target1 = r'<button onClick={goToPrev} className="hover:text-white/60 transition-colors flex items-center gap-1">\s*<ChevronLeft size={14} /> PREV\s*</button>\s*<button onClick={goToNext} className="hover:text-white/60 transition-colors flex items-center gap-1">\s*SUIV <ChevronRight size={14} />\s*</button>\s*</div>'

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

content = re.sub(target1, replacement1, content)

# Change Left Side wrapper based on isFullscreen
target2 = r'<div className="w-full md:w-3/5 h-\[60vh\] md:h-auto md:self-stretch relative flex items-center justify-center p-4 md:p-8 shrink-0">'
replacement2 = r'<div className={isFullscreen ? "fixed inset-0 z-[100] w-full h-full flex items-center justify-center bg-black/90 p-4 md:p-12 backdrop-blur-sm" : "w-full md:w-3/5 h-[60vh] md:h-auto md:self-stretch relative flex items-center justify-center p-4 md:p-8 shrink-0"}>'
content = content.replace(target2, replacement2)

# Change inner aspect-square based on isFullscreen
target3 = r'<div className="relative w-full max-w-\[calc\(60vh-2rem\)\] md:max-w-\[calc\(100vh-10rem\)\] aspect-square border border-white/10 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl transition-all duration-500">'
replacement3 = r'<div className={`relative w-full border border-white/10 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl transition-all duration-500 ${isFullscreen ? "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] aspect-square md:aspect-video" : "max-w-[calc(60vh-2rem)] md:max-w-[calc(100vh-10rem)] aspect-square"}`}>'
content = re.sub(target3, replacement3, content)

# Also add the close button when in fullscreen
target4 = r'{/* Minimal overlays for artistic effect */}'
replacement4 = r'''{/* Close fullscreen button */}
            {isFullscreen && (
              <button 
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-50 bg-black/60 backdrop-blur border border-white/20 p-3 rounded-full hover:bg-white/20 transition-colors"
                title="Quitter le Plein Écran"
              >
                <Minimize size={20} />
              </button>
            )}

            {/* Minimal overlays for artistic effect */}'''
content = content.replace(target4, replacement4)

with open('src/App.tsx', 'w') as f:
    f.write(content)
