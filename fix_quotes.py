import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Fix Algo 0x02 canvas tag
content = re.sub(
    r'<canvas id=\\"c\\" width=\\"400\\" height=\\"400\\"></canvas>',
    r'<canvas id=\\"c\\"></canvas>',
    content
)

# Fix Algo 0x01 canvas tag
content = re.sub(
    r'<canvas id=\\"c\\" width=\\"400\\" height=\\"400\\"></canvas>',
    r'<canvas id=\\"c\\"></canvas>',
    content
)

# Fix Algo 0x01 p5.js size
content = re.sub(
    r'createCanvas\(w=400,w\)',
    r'createCanvas(windowWidth, windowHeight)',
    content
)

with open('src/App.tsx', 'w') as f:
    f.write(content)

