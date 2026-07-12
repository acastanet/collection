import re

with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace(
    '  const [isAboutOpen, setIsAboutOpen] = useState(false);\n  const iframeRef = useRef<HTMLIFrameElement>(null);\n',
    '  const [isAboutOpen, setIsAboutOpen] = useState(false);\n'
)

with open("src/App.tsx", "w") as f:
    f.write(content)
