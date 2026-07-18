with open("src/App.tsx", "r") as f:
    content = f.read()

old_btn = """            <button
              onClick={captureScreenshot}
              className="absolute top-4 left-4 z-50 bg-black/60 backdrop-blur border border-white/20 p-2 md:p-3 rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white"
              title="Télécharger une capture"
            >
              <Download size={20} />
            </button>"""

new_btns = """            <button
              onClick={captureScreenshot}
              className="absolute top-4 left-4 z-50 bg-black/60 backdrop-blur border border-white/20 p-2 md:p-3 rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white"
              title="Télécharger une capture"
            >
              <Download size={20} />
            </button>
            <button
              onClick={() => setIsLowSpec(!isLowSpec)}
              className={`absolute top-4 left-[3.5rem] md:left-[4.5rem] z-50 bg-black/60 backdrop-blur border border-white/20 p-2 md:p-3 rounded-full hover:bg-white/20 transition-colors ${isLowSpec ? 'text-green-400 border-green-400/50' : 'text-white/70 hover:text-white'}`}
              title={isLowSpec ? "Désactiver le Mode Performance" : "Activer le Mode Performance"}
            >
              <Gauge size={20} />
            </button>"""

content = content.replace(old_btn, new_btns)

with open("src/App.tsx", "w") as f:
    f.write(content)
