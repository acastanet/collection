import re

with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace(r'\\\`', r'\`').replace(r'\\\$', r'\$')

with open("src/App.tsx", "w") as f:
    f.write(content)
