import shutil
import os

src = "/Users/haneesh/.gemini/antigravity/brain/10737888-73a6-4aab-bde1-ac4bf67cabab/logo_collective_clean_1771703782664.png"
dst = "/Users/haneesh/yolowebsite26/assets/logos/logo_collective.png"

if os.path.exists(src):
    shutil.copy2(src, dst)
    print("Copied successfully.")
else:
    print("Source not found.")
