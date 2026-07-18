with open("src/App.tsx", "r") as f:
    content = f.read()

idx1 = content.find("export default function App() {")
idx2 = content.find("export default function App() {", idx1 + 1)

print(repr(content[idx2-50:idx2]))
