import sys

with open("/app/applet/src/App.tsx", "r") as f:
    content = f.read()

start_idx = content.find('  {\n    id: "algo-0x0a",')
if start_idx != -1:
    end_idx = content.find('  {\n    id: "algo-0x0b",', start_idx)
    if end_idx != -1:
        # ALGO 0x0A isn't the last, so we can just slice it out
        content = content[:start_idx] + content[end_idx:]
    else:
        print("Could not find ALGO 0x0B")
else:
    print("Could not find ALGO 0x0A")

with open("/app/applet/src/App.tsx", "w") as f:
    f.write(content)
