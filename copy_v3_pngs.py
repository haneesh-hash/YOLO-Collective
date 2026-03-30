import os
import glob
import shutil

src_dir = "/Users/haneesh/.gemini/antigravity/brain/10737888-73a6-4aab-bde1-ac4bf67cabab"
dest_dir = "/Users/haneesh/yolowebsite26/assets/ad_boards"
os.makedirs(dest_dir, exist_ok=True)

for i in range(1, 6):
    pattern = f"{src_dir}/ad_concept_{i}_v3_*.png"
    files = glob.glob(pattern)
    if files:
        latest_file = max(files, key=os.path.getctime)
        shutil.copy2(latest_file, f"{dest_dir}/ad_concept_{i}_v3.png")
        print(f"Copied {latest_file} to ad_concept_{i}_v3.png")
