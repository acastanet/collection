import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Fix unescaped quotes inside htmlContent
# It's specifically around id="c"
content = content.replace('<canvas id="c"></canvas>', '<canvas id=\\"c\\"></canvas>')

with open('src/App.tsx', 'w') as f:
    f.write(content)

