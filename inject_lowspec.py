with open("src/App.tsx", "r") as f:
    content = f.read()

helper = """const getProcessedHtmlContent = (html: string, isLowSpec: boolean) => {
  if (!isLowSpec) return html;
  return html
    .replace(/window\\.devicePixelRatio/g, '1')
    .replace(/10000/g, '3000')
    .replace(/for *\\(let i = 0; i < 6000;/g, 'for(let i = 0; i < 1500;')
    .replace(/canvas\\.width = 800; canvas\\.height = 800;/g, 'canvas.width = 400; canvas.height = 400;')
    .replace(/gl\\.viewport\\(0, 0, 800, 800\\);/g, 'gl.viewport(0, 0, 400, 400);')
    .replace(/< 15/g, '< 8')
    .replace(/< 100/g, '< 40');
};

"""

content = content.replace("export default function App() {", helper + "export default function App() {")
content = content.replace("const [isAboutOpen, setIsAboutOpen] = useState(false);", "const [isAboutOpen, setIsAboutOpen] = useState(false);\n  const [isLowSpec, setIsLowSpec] = useState(false);")

with open("src/App.tsx", "w") as f:
    f.write(content)
