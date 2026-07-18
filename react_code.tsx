export default function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const captureScreenshot = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        const canvas = iframeRef.current.contentDocument.querySelector('canvas');
        if (canvas) {
          const dataUrl = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `${currentArtwork.title.replace(/\s+/g, '_').toLowerCase()}_capture.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }
    } catch (e) {
      console.error("Impossible de capturer la capture d'écran", e);
    }
  };

  const audioSystemRef = useRef<AudioSystem | null>(null);

  const currentArtwork = artworks[currentIndex];

  useEffect(() => {
    // Initialize audio system if needed
    if (!audioSystemRef.current) {
      audioSystemRef.current = new AudioSystem();
    }
    
    // Play or stop based on state
    if (isAudioEnabled) {
      audioSystemRef.current.playPattern(currentIndex);
    } else {
      audioSystemRef.current.stop();
    }
  }, [currentIndex, isAudioEnabled]);
  
  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioSystemRef.current) {
        audioSystemRef.current.stop();
      }
    };
  }, []);



  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % artworks.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? artworks.length - 1 : prev - 1));
  };
  
  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev);
  };

  return (
    <div className="w-full h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-white/20 overflow-hidden">
      {/* Top Nav Ribbon */}
      <nav className="p-5 md:p-6 border-b border-white/10 flex justify-between items-center relative z-20 bg-[#090909]">
        <div className="text-xs tracking-[0.4em] font-bold uppercase italic shadow-black drop-shadow-md">
          Computational / Artifact
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-8 text-[10px] tracking-[0.2em] uppercase font-medium items-center">
          <button 
            onClick={toggleAudio} 
            className={`flex items-center gap-2 transition-colors ${isAudioEnabled ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
            title={isAudioEnabled ? "Mute Generative Audio" : "Play Generative Audio"}
          >
            {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            {isAudioEnabled ? 'SYS_AUDIO_ON' : 'SYS_AUDIO_OFF'}
          </button>
          <div className="text-white/20">|</div>
          <div className="text-white/40">
            {currentIndex + 1} / {artworks.length}
          </div>
          <button onClick={() => setIsFullscreen(!isFullscreen)} className="hover:text-white/60 transition-colors flex items-center gap-1" title={isFullscreen ? "Quitter le Plein Écran" : "Plein Écran"}>
            {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
            {isFullscreen ? "RÉDUIRE" : "PLEIN ÉCRAN"}
          </button>
          <div className="text-white/20">|</div>
          <button onClick={goToPrev} className="hover:text-white/60 transition-colors flex items-center gap-1">
            <ChevronLeft size={14} /> PRÉC
          </button>
          <button onClick={goToNext} className="hover:text-white/60 transition-colors flex items-center gap-1">
            SUIV <ChevronRight size={14} />
          </button>
          </div>
          <button onClick={() => setIsAboutOpen(true)} className="w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors lowercase font-serif italic text-base leading-none" style={{paddingBottom: '2px'}} title="À propos">
            a
          </button>
        </div>
      </nav>

      <main className="flex-1 min-h-0 flex flex-col md:flex-row relative z-10 w-full overflow-y-auto md:overflow-hidden">
        {/* Left Side: Generative Visualization Area */}
        <div className={isFullscreen ? "fixed inset-0 z-[100] w-full h-full flex items-center justify-center bg-[#050505]/95 p-4 md:p-12 backdrop-blur-md" : "w-full md:w-3/5 h-[60vh] md:h-auto md:self-stretch relative flex items-center justify-center p-4 md:p-8 shrink-0"}>
          <div className={`relative w-full border border-white/10 flex items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm shadow-2xl transition-all duration-500 ${isFullscreen ? "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] aspect-square md:aspect-video" : "max-w-[calc(60vh-2rem)] md:max-w-[calc(100vh-10rem)] aspect-square"}`}>
            {/* The canvas will render inside this iframe */}
            <iframe
              className="w-full h-full border-none z-10 relative"
              title={currentArtwork.title}
              ref={iframeRef}
              srcDoc={currentArtwork.htmlContent.replace(/getContext\('(webgl2?)'\)/g, "getContext('$1', { preserveDrawingBuffer: true })")}
            />
            {/* Close fullscreen button */}
            {isFullscreen && (
              <button 
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-50 bg-black/60 backdrop-blur border border-white/20 p-3 rounded-full hover:bg-white/20 transition-colors"
                title="Quitter le Plein Écran"
              >
                <Minimize size={20} />
              </button>
            )}


            {/* Minimal overlays for artistic effect */}
            <button
              onClick={captureScreenshot}
              className="absolute top-4 left-4 z-50 bg-black/60 backdrop-blur border border-white/20 p-2 md:p-3 rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white"
              title="Télécharger une capture"
            >
              <Download size={20} />
            </button>
            <div className="absolute right-4 bottom-4 flex flex-col gap-1 items-end z-20 pointer-events-none mix-blend-difference">
               <span className="text-[9px] uppercase tracking-widest text-white/50 italic font-mono">{currentArtwork.type}</span>
               <span className="text-[9px] uppercase tracking-widest text-white/50 font-mono">EN COURS</span>
            </div>
            
            {/* Mobile Navigation (Floating) */}
            <div className="md:hidden absolute bottom-4 left-4 flex gap-4 z-20">
              <button onClick={() => setIsFullscreen(!isFullscreen)} className="bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-transform" title="Plein Écran">
                <Maximize size={16} />
              </button>
              <button onClick={goToPrev} className="bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-transform"><ChevronLeft size={16} /></button>
              <button onClick={goToNext} className="bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-transform"><ChevronRight size={16} /></button>
            </div>
            
            {/* Mobile Audio Toggle */}
            <div className="md:hidden absolute top-4 right-4 z-20">
              <button 
                onClick={toggleAudio} 
                className={`bg-black/60 backdrop-blur border border-white/20 p-2 rounded-full active:scale-95 transition-all ${isAudioEnabled ? 'text-white' : 'text-white/50'}`}
              >
                {isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: The Code & Editorial Metadata */}
        <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-white/10 p-8 md:p-12 flex flex-col justify-between bg-[#090909]/80 backdrop-blur-sm z-10 transition-all duration-300 md:overflow-y-auto custom-scrollbar">
          <div key={currentArtwork.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-none mb-2">
              ALGO<br/><span className="italic font-serif">{currentArtwork.title.split(' ')[1]}</span>
            </h1>
            <h2 className="text-lg md:text-xl font-medium tracking-wider mb-6 text-white/80">
              {currentArtwork.subTitle}
            </h2>
            <p className="text-xs text-white/50 leading-relaxed max-w-[320px] mb-12">
              {currentArtwork.description}
            </p>

            {/* The Code Block (Brutalist style) */}
            {currentArtwork.equation && (
              <div className="bg-black/50 text-white p-4 sm:p-6 mb-4 relative shadow-[0_0_30px_rgba(255,255,255,0.05)] border border-white/10 overflow-hidden flex items-center justify-center min-h-[100px]">
                <div className="absolute top-0 right-0 bg-black text-[9px] px-2 py-1 font-bold border-b border-l border-white/20 uppercase tracking-widest z-10">FORMULE</div>
                <div className="math-container w-full max-w-full flex justify-center">
                  <BlockMath math={currentArtwork.equation} />
                </div>
              </div>
            )}
            <div className="bg-white text-black p-5 sm:p-6 relative shadow-[0_0_30px_rgba(255,255,255,0.05)]">
              <div className="absolute -top-3 -right-3 bg-white text-[10px] px-2 py-1 font-bold border border-black/10 uppercase tracking-widest">{currentArtwork.type} SOURCE</div>
              <code className="font-mono text-[9px] sm:text-[10px] leading-relaxed break-all block whitespace-pre-wrap">{currentArtwork.code}
              </code>
            </div>
          </div>

          {/* Bottom Metadata Section */}
          <div className="flex flex-col gap-8 mt-12 md:mt-0 animate-in fade-in duration-700 delay-200">
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
              {currentArtwork.metadata.slice(0, 2).map((meta, i) => (
                <div key={i}>
                  <div className="text-[9px] uppercase tracking-widest text-white/30 mb-1">{meta.label}</div>
                  <div className="text-sm font-mono text-white/80 truncate pr-2">{meta.value}</div>
                </div>
              ))}
            </div>
            
            {currentArtwork.metadata.length > 2 && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold italic shrink-0">
                  {currentArtwork.type.substring(0, 3)}
                </div>
                <div className="text-[10px] uppercase tracking-widest leading-relaxed">
                  <span className="text-white/80">{currentArtwork.metadata[2].label}</span><br/>
                  <span className="text-white/40 block mt-0.5">{currentArtwork.metadata[2].value}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Ribbon */}
      <footer className="p-5 md:p-6 border-t border-white/10 flex justify-between items-center text-[9px] uppercase tracking-[0.3em] font-medium relative z-10 w-full shrink-0 bg-[#090909]">
        <div className="flex gap-4 md:gap-8 text-white/50">
          <span>{currentArtwork.title}</span>
          <span className="hidden sm:inline">Index {currentIndex + 1}</span>
        </div>
        <div className="italic text-white/40">Crafted in the Void</div>
      </footer>

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
  );
}
