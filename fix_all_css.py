import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

def replace_style(match):
    style_content = match.group(1)
    
    # Remove existing canvas styles
    style_content = re.sub(r'canvas\s*\{[^}]*\}', '', style_content)
    
    # Add new canvas style
    new_canvas_style = "canvas { width: 100vmin !important; height: 100vmin !important; object-fit: contain; box-shadow: 0 0 20px rgba(0,0,0,0.8); border-radius: 4px; }"
    
    # Check if body style exists, if not create it
    if 'body {' not in style_content:
        style_content += " body { margin: 0; background-color: #000; overflow: hidden; display: flex; justify-content: center; align-items: center; min-height: 100vh; touch-action: none; }"
    else:
        # ensure body has flex centering
        style_content = re.sub(r'body\s*\{([^}]*)\}', r'body { \1 display: flex; justify-content: center; align-items: center; overflow: hidden; touch-action: none; }', style_content)
    
    return f'<style>{style_content} {new_canvas_style}</style>'

content = re.sub(r'<style>(.*?)</style>', replace_style, content, flags=re.DOTALL)

with open('src/App.tsx', 'w') as f:
    f.write(content)

