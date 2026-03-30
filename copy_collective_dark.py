import os
import glob
import shutil

src_dir = "/Users/haneesh/.gemini/antigravity/brain/ad7ce59c-a576-40bd-bff5-f3ff5336c830"
dest_dir = "/Users/haneesh/Desktop/YOLO_Brand_Assets_V2_Updated_Color"

file_mappings = {
    # Collective (Dark)
    "collective_std_dark_v2": "YOLO_Collective_Standard_Dark.png",
    "collective_sq_dark_v2": "YOLO_Collective_Profile_Square_Dark.png",
}

for identifier, final_name in file_mappings.items():
    pattern = f"{src_dir}/{identifier}_*.png"
    files = glob.glob(pattern)
    
    if files:
        latest_file = max(files, key=os.path.getctime)
        dest_path = os.path.join(dest_dir, final_name)
        shutil.copy2(latest_file, dest_path)
        print(f"DELIVERED: {final_name}")
    else:
        print(f"ERROR: Could not find PNG capture for {identifier}")
