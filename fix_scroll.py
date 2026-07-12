import re

with open("src/App.tsx", "r") as f:
    content = f.read()

search_str = '        <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-white/10 p-8 md:p-12 flex flex-col justify-between bg-[#090909]/80 backdrop-blur-sm z-10 transition-all duration-300">'
replace_str = '        <div className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-white/10 p-8 md:p-12 flex flex-col justify-between bg-[#090909]/80 backdrop-blur-sm z-10 transition-all duration-300 md:overflow-y-auto">'

content = content.replace(search_str, replace_str)

with open("src/App.tsx", "w") as f:
    f.write(content)
