with open("src/App.tsx", "r") as f:
    content = f.read()

idx1 = content.find("export default function App() {")
idx2 = content.find("export default function App() {", idx1 + 1)

if idx2 != -1:
    print(f"First App is from {idx1} to {idx2}")
else:
    print("Only one App found")
