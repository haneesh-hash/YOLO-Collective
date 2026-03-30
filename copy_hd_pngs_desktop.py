import os
import glob
import shutil

src_dir = "/Users/haneesh/.gemini/antigravity/brain/ad7ce59c-a576-40bd-bff5-f3ff5336c830"
dest_dir = "/Users/haneesh/Desktop/YOLO_Brand_Assets_HD"
os.makedirs(dest_dir, exist_ok=True)

asset_map = {
    "collective_std": "YOLO_Collective_Standard.png",
    "collective_sq": "YOLO_Collective_Profile_Square.png",
    "outdoors_std": "YOLO_Outdoors_Standard.png",
    "outdoors_sq": "YOLO_Outdoors_Profile_Square.png",
    "social_std": "YOLO_Social_Standard.png",
    "social_sq": "YOLO_Social_Profile_Square.png",
    "homes_std": "YOLO_Homes_Standard.png",
    "homes_sq": "YOLO_Homes_Profile_Square.png"
}

for prefix, final_name in asset_map.items():
    pattern = f"{src_dir}/{prefix}_*.png"
    files = glob.glob(pattern)
    if files:
        latest_file = max(files, key=os.path.getctime)
        dest_path = os.path.join(dest_dir, final_name)
        shutil.copy2(latest_file, dest_path)
        print(f"Copied {os.path.basename(latest_file)} to {final_name}")
    else:
        print(f"Warning: No files found matching {pattern}")
