with open("src/App.tsx", "r") as f:
    content = f.read()

old_fn = """const getProcessedHtmlContent = (html: string, isLowSpec: boolean) => {
  if (!isLowSpec) return html;
  return html
    .replace(/window\\.devicePixelRatio/g, '1')
    .replace(/10000/g, '3000')
    .replace(/for *\\(let i = 0; i < 6000;/g, 'for(let i = 0; i < 1500;')
    .replace(/canvas\\.width = 800; canvas\\.height = 800;/g, 'canvas.width = 400; canvas.height = 400;')
    .replace(/gl\\.viewport\\(0, 0, 800, 800\\);/g, 'gl.viewport(0, 0, 400, 400);')
    .replace(/< 15/g, '< 8')
    .replace(/< 100/g, '< 40');
};"""

new_fn = """const getProcessedHtmlContent = (html: string, isLowSpec: boolean) => {
  if (!isLowSpec) return html;
  return html
    .replace(/window\\.devicePixelRatio/g, '1')
    .replace(/10000/g, '3000')
    .replace(/for *\\(let i = 0; i < 6000;/g, 'for(let i = 0; i < 1500;')
    .replace(/canvas\\.width = 800; canvas\\.height = 800;/g, 'canvas.width = 400; canvas.height = 400;')
    .replace(/gl\\.viewport\\(0, 0, 800, 800\\);/g, 'gl.viewport(0, 0, 400, 400);')
    .replace(/< 15/g, '< 8')
    .replace(/< 100/g, '< 40')
    .replace(/for \\(int i = 0; i < 32; i\\+\\+\\) \\{/g, 'for (int i = 0; i < 16; i++) {')
    .replace(/const P4_Value = 30.0;/g, 'const P4_Value = 15.0;');
};"""

content = content.replace(old_fn, new_fn)

with open("src/App.tsx", "w") as f:
    f.write(content)

