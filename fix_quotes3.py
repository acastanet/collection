import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace the unescaped "resize"
content = content.replace('window.addEventListener("resize",', 'window.addEventListener(\\"resize\\",')

with open('src/App.tsx', 'w') as f:
    f.write(content)

