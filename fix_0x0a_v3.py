import sys

with open("/app/applet/src/App.tsx", "r") as f:
    content = f.read()

start_idx = content.find('  {\n    id: "algo-0x0a",')
if start_idx != -1:
    b_idx = content.find('id: "algo-0x0b",', start_idx)
    # The start of algo-0x0b block
    b_start = content.rfind('{', start_idx, b_idx)
    
    # We want to remove the comma that precedes b_start as well? Wait.
    # The structure around algo-0x0a is:
    #   },
    #   {
    #     id: "algo-0x0a",
    #     ...
    #     ]
    #   }  ,{
    #     id: "algo-0x0b",
    #
    # So if we cut from `  {\n    id: "algo-0x0a",` to `  }  ,{` (exclusive), and then we just need to make sure the commas match.
    # Actually, it's `  }  ,{`. If we remove from `  {\n    id: "algo-0x0a",` to `  }  ,`, we leave `{` which is the start of `algo-0x0b`.
    
    # Let's find the exact string to remove.
    b_block_start = content.find('  }  ,{\n    id: "algo-0x0b",', start_idx)
    if b_block_start != -1:
        # Before algo-0x0a there is `  },\n`
        # If we remove from `start_idx` to `b_block_start + 6` (which is `  }  ,`), we will leave `{\n    id: "algo-0x0b",`.
        # Wait, the preceding block ends with `  },\n`. 
        # `content[start_idx:b_block_start + 5]` is the whole `algo-0x0a` block including the `  }  `. 
        content = content[:start_idx] + "  " + content[b_block_start + 6:]
    else:
        print("Could not find algo-0x0b block start")
else:
    print("Could not find ALGO 0x0A")

with open("/app/applet/src/App.tsx", "w") as f:
    f.write(content)
