import os
import glob
import shutil

src_dir = "/Users/haneesh/.gemini/antigravity/brain/ad7ce59c-a576-40bd-bff5-f3ff5336c830"
dest_dir = "/Users/haneesh/Desktop/YOLO_Brand_Assets_V2_Updated_Color"

# Define the exact file name mappings based on the subagent's actual captures
# Key: The substring we know is unique to that specific capture
# Value: The final pristine filename the user wants
file_mappings = {
    # Standards (Light)
    "collective_std_v4_final": "YOLO_Collective_Standard.png",
    "outdoors_std_v4_final": "YOLO_Outdoors_Standard.png",
    "social_std_v4_final": "YOLO_Social_Standard.png",
    "homes_std_v4_final": "YOLO_Homes_Standard.png",
    
    # Standards (Dark)
    "outdoors_std_dark_v4_final": "YOLO_Outdoors_Standard_Dark.png",
    "social_std_dark_v4_final": "YOLO_Social_Standard_Dark.png",

    # Squares (Light)
    "collective_sq_v5_final_hd": "YOLO_Collective_Profile_Square.png",
    "outdoors_sq_v5_final_hd": "YOLO_Outdoors_Profile_Square.png",
    "social_sq_v4_final_hd": "YOLO_Social_Profile_Square.png",
    "homes_sq_v4_final_hd": "YOLO_Homes_Profile_Square.png",

    # Squares (Dark)
    "outdoors_sq_dark_v5_final_hd": "YOLO_Outdoors_Profile_Square_Dark.png",
    "social_sq_dark_v5_final_hd": "YOLO_Social_Profile_Square_Dark.png",
}

for identifier, final_name in file_mappings.items():
    # Find the most recent capture matching this identifier
    pattern = f"{src_dir}/{identifier}_*.png"
    files = glob.glob(pattern)
    
    if files:
        latest_file = max(files, key=os.path.getctime)
        dest_path = os.path.join(dest_dir, final_name)
        shutil.copy2(latest_file, dest_path)
        print(f"DELIVERED: {final_name}")
    else:
        print(f"ERROR: Could not find PNG capture for {identifier}")
