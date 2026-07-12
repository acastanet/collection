import re

with open("src/App.tsx", "r") as f:
    content = f.read()

search_eq = r"\\begin{aligned} &k = 4 \\cos(\\frac{x}{21}), \\quad e = \\frac{y}{8} - 20 \\\\ &q = 3 \\sin(2k) + \\frac{0.3}{k} \\\\ &\\quad + \\sin(\\frac{y}{19})k(9 + 2 \\sin(14e - 3d + 2t)) \\end{aligned}"
replace_eq = r"\\begin{aligned} k &= 4 \\cos\\left(\\frac{x}{21}\\right) \\\\ e &= \\frac{y}{8} - 20 \\\\ q &= 3 \\sin(2k) + \\frac{0.3}{k} \\\\ &\\quad + k \\sin\\left(\\frac{y}{19}\\right) \\big(9 + 2 \\sin(14e - 3d + 2t)\\big) \\end{aligned}"

content = content.replace(search_eq, replace_eq)

with open("src/App.tsx", "w") as f:
    f.write(content)
