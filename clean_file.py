import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# We need to find `metadata: { label: string; value: string }[  ,{`
# And remove everything from the `[  ,{` all the way down to `  }\n];\n` that was inserted before `const artworks: Artwork[] = [`
# Let's find the start of the mistake
start_idx = content.find("  metadata: { label: string; value: string }[  ,{")

if start_idx != -1:
    # We want to keep `  metadata: { label: string; value: string }`
    # and add `[];\n`
    # Then we need to find `const artworks: Artwork[] = [`
    end_idx = content.find("const artworks: Artwork[] = [", start_idx)
    if end_idx != -1:
        # replace the broken block
        fixed_top = content[:start_idx] + "  metadata: { label: string; value: string }[];\n\n" + content[end_idx:]
        
        # Now let's see if there is another copy of algo-0x0c at the bottom
        # because `fix_file.py` might have added it.
        # Let's remove ANY algo-0x0c to start fresh.
        # We can just remove the algo-0x0c block at the bottom if it exists.
        idx_c = fixed_top.find("algo-0x0c")
        if idx_c != -1:
            print("Found algo-0x0c at bottom, removing it too.")
            # find the start of `  ,{` before algo-0x0c
            start_c = fixed_top.rfind("  ,{", 0, idx_c)
            # find the end of algo-0x0c which is `  }\n];`
            end_c = fixed_top.find("  }\n];", idx_c)
            if start_c != -1 and end_c != -1:
                # We want to remove from `  ,{` to `  }` but leave `\n];`
                fixed_top = fixed_top[:start_c] + "\n];" + fixed_top[end_c+6:]
                
        with open("src/App.tsx", "w") as f:
            f.write(fixed_top)
        print("File cleaned.")
    else:
        print("Could not find const artworks")
else:
    print("Could not find metadata line")
