with open("src/App.tsx", "r") as f:
    content = f.read()

idx1 = content.find("export default function App() {")
idx2 = content.find("export default function App() {", idx1 + 1)

react_code = content[idx2:]
with open("react_code.tsx", "w") as f:
    f.write(react_code)
