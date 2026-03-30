import shutil
import os

files = [
    ("/Users/haneesh/.gemini/antigravity/brain/10737888-73a6-4aab-bde1-ac4bf67cabab/yolo_collective_hd_1771704111904.png", 
     "/Users/haneesh/yolowebsite26/assets/logos/yolo_collective_hd.png"),
    ("/Users/haneesh/.gemini/antigravity/brain/10737888-73a6-4aab-bde1-ac4bf67cabab/yolo_collective_hd_white_1771704132008.png", 
     "/Users/haneesh/yolowebsite26/assets/logos/yolo_collective_hd_white.png")
]

for src, dst in files:
    if os.path.exists(src):
        shutil.copy2(src, dst)
        print(f"Copied {os.path.basename(dst)} successfully.")
    else:
        print(f"Source not found: {src}")
