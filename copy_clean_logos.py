import shutil
import os

source_dir = "/Users/haneesh/.gemini/antigravity/brain/10737888-73a6-4aab-bde1-ac4bf67cabab"
dest_dir = "/Users/haneesh/yolowebsite26/assets/logos"

if not os.path.exists(dest_dir):
    os.makedirs(dest_dir)

files = {
    "logo_living_clean_1771449801750.png": "logo_living.png",
    "logo_outdoors_clean_1771449812866.png": "logo_outdoors.png",
    "logo_social_clean_1771449825443.png": "logo_social.png",
    "logo_homes_clean_1771449838725.png": "logo_homes.png"
}

for src_name, dest_name in files.items():
    src_path = os.path.join(source_dir, src_name)
    dest_path = os.path.join(dest_dir, dest_name)
    try:
        shutil.copy2(src_path, dest_path)
        print(f"Copied {src_name} to {dest_name}")
    except Exception as e:
        print(f"Error copying {src_name}: {e}")
