import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace any actual newline inside a double-quoted htmlContent string with literal \n
def replacer(match):
    # match.group(0) is the entire htmlContent: "..." string
    return match.group(0).replace('\n', '\\n')

content = re.sub(r'htmlContent:\s*"([^"\\]*(?:\\.[^"\\]*)*)"', replacer, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

