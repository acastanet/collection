import re

with open("src/App.tsx", "r") as f:
    content = f.read()

search_fn = """  const captureScreenshot = () => {
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const canvas = iframeRef.current.contentDocument.querySelector('canvas');
      if (canvas) {
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${currentArtwork.title.replace(/\\s+/g, '_').toLowerCase()}_capture.png`;
        a.click();
      }
    }
  };"""

replace_fn = """  const captureScreenshot = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        const canvas = iframeRef.current.contentDocument.querySelector('canvas');
        if (canvas) {
          const dataUrl = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = dataUrl;
          a.download = `${currentArtwork.title.replace(/\\s+/g, '_').toLowerCase()}_capture.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }
    } catch (e) {
      console.error("Impossible de capturer la capture d'écran", e);
    }
  };"""

content = content.replace(search_fn, replace_fn)

with open("src/App.tsx", "w") as f:
    f.write(content)
