with open("src/App.tsx", "r") as f:
    content = f.read()

# I will replace the unescaped backtick and ${ in algo-0x0b
content = content.replace("hudParams.innerText = `a=${a.toFixed(3)} b=${b.toFixed(3)}\\nc=${c.toFixed(3)} d=${d.toFixed(3)}`;", "hudParams.innerText = '\\`a=\\${a.toFixed(3)} b=\\${b.toFixed(3)}\\\\nc=\\${c.toFixed(3)} d=\\${d.toFixed(3)}\\`';")

with open("src/App.tsx", "w") as f:
    f.write(content)

