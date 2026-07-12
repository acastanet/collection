import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# 1. Add Download to lucide-react imports
content = content.replace(
    'import { ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize, Minimize, X } from "lucide-react";',
    'import { ChevronLeft, ChevronRight, Volume2, VolumeX, Maximize, Minimize, X, Download } from "lucide-react";'
)

# 2. Add iframeRef
content = content.replace(
    'const [isAboutOpen, setIsAboutOpen] = useState(false);',
    'const [isAboutOpen, setIsAboutOpen] = useState(false);\n  const iframeRef = useRef<HTMLIFrameElement>(null);\n\n  const captureScreenshot = () => {\n    if (iframeRef.current && iframeRef.current.contentDocument) {\n      const canvas = iframeRef.current.contentDocument.querySelector(\'canvas\');\n      if (canvas) {\n        const dataUrl = canvas.toDataURL(\'image/png\');\n        const a = document.createElement(\'a\');\n        a.href = dataUrl;\n        a.download = `${currentArtwork.title.replace(/\\s+/g, \'_\').toLowerCase()}_capture.png`;\n        a.click();\n      }\n    }\n  };'
)

# 3. Apply modifiedHtmlContent
content = content.replace(
    'srcDoc={currentArtwork.htmlContent}',
    'ref={iframeRef}\n              srcDoc={currentArtwork.htmlContent.replace(/getContext\\(\'(webgl2?)\'\\)/g, "getContext(\'$1\', { preserveDrawingBuffer: true })")}'
)

# 4. Add Download button overlay
download_btn = """
            {/* Minimal overlays for artistic effect */}
            <button
              onClick={captureScreenshot}
              className="absolute top-4 left-4 z-50 bg-black/60 backdrop-blur border border-white/20 p-2 md:p-3 rounded-full hover:bg-white/20 transition-colors text-white/70 hover:text-white"
              title="Télécharger une capture"
            >
              <Download size={20} />
            </button>
            <div className="absolute right-4 bottom-4 flex flex-col gap-1 items-end z-20 pointer-events-none mix-blend-difference">"""
            
content = content.replace(
    '            {/* Minimal overlays for artistic effect */}\n            <div className="absolute right-4 bottom-4 flex flex-col gap-1 items-end z-20 pointer-events-none mix-blend-difference">',
    download_btn
)

with open("src/App.tsx", "w") as f:
    f.write(content)
