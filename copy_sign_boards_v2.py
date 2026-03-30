import os
import glob
import shutil

src_dir = "/Users/haneesh/.gemini/antigravity/brain/ad7ce59c-a576-40bd-bff5-f3ff5336c830"
dest_dir = "/Users/haneesh/yolowebsite26/assets/sign_boards"
os.makedirs(dest_dir, exist_ok=True)

# Overwrite the previous versions with the _v2 captures
for i in range(1, 6):
    pattern = f"{src_dir}/social_sign_{i}_v2_*.png"
    files = glob.glob(pattern)
    if files:
        latest_file = max(files, key=os.path.getctime)
        # We save them with the exact same name as before to seamlessly overwrite the old color.
        dest_path = os.path.join(dest_dir, f"social_sign_{i}.png")
        shutil.copy2(latest_file, dest_path)
        print(f"Update: Copied {os.path.basename(latest_file)} and overwrote social_sign_{i}.png")
    else:
        print(f"Warning: No files found matching {pattern}")
