with open("src/App.tsx", "r") as f:
    content = f.read()

old_srcDoc = "srcDoc={currentArtwork.htmlContent.replace(/getContext\\('(webgl2?)'\\)/g, \"getContext('$1', { preserveDrawingBuffer: true })\")}"
new_srcDoc = "srcDoc={getProcessedHtmlContent(currentArtwork.htmlContent.replace(/getContext\\('(webgl2?)'\\)/g, \"getContext('$1', { preserveDrawingBuffer: true })\"), isLowSpec)}"

content = content.replace(old_srcDoc, new_srcDoc)

with open("src/App.tsx", "w") as f:
    f.write(content)
