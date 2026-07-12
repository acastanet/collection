import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Fix Algo 3
search_eq3 = r"\\begin{cases} x(t) = \\frac{r}{2} (2 + \\cos(qt / p)) \\cos(t) \\\\ y(t) = \\frac{r}{2} (2 + \\cos(qt / p)) \\sin(t) \\\\ z(t) = \\frac{r}{2} \\sin(qt / p) \\end{cases}"
replace_eq3 = r"\\begin{aligned} x(t) &= \\frac{r}{2} \\left(2 + \\cos\\left(\\frac{qt}{p}\\right)\\right) \\cos(t) \\\\ y(t) &= \\frac{r}{2} \\left(2 + \\cos\\left(\\frac{qt}{p}\\right)\\right) \\sin(t) \\\\ z(t) &= \\frac{r}{2} \\sin\\left(\\frac{qt}{p}\\right) \\end{aligned}"

# Fix Algo 8
search_eq8 = r"z_{n+1} = z_n + \\frac{\\lambda(t) \\overline{(z_n - p(t))}}{|z_n - p(t)|^2 + \\sigma^2} + \\mu(t) \\sin(\\kappa(t) z_n)"
replace_eq8 = r"\\begin{aligned} z_{n+1} &= z_n + \\frac{\\lambda(t) \\overline{(z_n - p(t))}}{|z_n - p(t)|^2 + \\sigma^2} \\\\ &\\quad + \\mu(t) \\sin(\\kappa(t) z_n) \\end{aligned}"

# Fix Algo 9
search_eq9 = r"\\begin{cases} \\frac{\\partial u}{\\partial t} = D_u \\nabla^2 u - u v^2 + f(1 - u) \\\\ \\frac{\\partial v}{\\partial t} = D_v \\nabla^2 v + u v^2 - (f + k)v \\end{cases}"
replace_eq9 = r"\\begin{aligned} \\frac{\\partial u}{\\partial t} &= D_u \\nabla^2 u - u v^2 + f(1 - u) \\\\ \\frac{\\partial v}{\\partial t} &= D_v \\nabla^2 v + u v^2 - (f + k)v \\end{aligned}"

# Fix Algo 7
search_eq7 = r"\\begin{cases} \\frac{dx}{dt} = \\sigma(y - x) \\\\ \\frac{dy}{dt} = x(\\rho - z) - y \\\\ \\frac{dz}{dt} = xy - \\beta z \\end{cases}"
replace_eq7 = r"\\begin{aligned} \\frac{dx}{dt} &= \\sigma(y - x) \\\\ \\frac{dy}{dt} &= x(\\rho - z) - y \\\\ \\frac{dz}{dt} &= xy - \\beta z \\end{aligned}"

# Fix Algo 10
search_eq10 = r"\\begin{cases} \\theta = \\text{noise3D}(x, y, t) \\cdot 4\\pi \\\\ v_x = \\cos(\\theta) \\cdot s \\\\ v_y = \\sin(\\theta) \\cdot s \\end{cases}"
replace_eq10 = r"\\begin{aligned} \\theta &= \\text{noise3D}(x, y, t) \\cdot 4\\pi \\\\ v_x &= \\cos(\\theta) \\cdot s \\\\ v_y &= \\sin(\\theta) \\cdot s \\end{aligned}"

# Fix Algo 11
search_eq11 = r"\\begin{cases} x_{n+1} = \\sin(a y_n) + c \\cos(a x_n) \\\\ y_{n+1} = \\sin(b x_n) + d \\cos(b y_n) \\end{cases}"
replace_eq11 = r"\\begin{aligned} x_{n+1} &= \\sin(a y_n) + c \\cos(a x_n) \\\\ y_{n+1} &= \\sin(b x_n) + d \\cos(b y_n) \\end{aligned}"

content = content.replace(search_eq3, replace_eq3)
content = content.replace(search_eq8, replace_eq8)
content = content.replace(search_eq9, replace_eq9)
content = content.replace(search_eq7, replace_eq7)
content = content.replace(search_eq10, replace_eq10)
content = content.replace(search_eq11, replace_eq11)

with open("src/App.tsx", "w") as f:
    f.write(content)
