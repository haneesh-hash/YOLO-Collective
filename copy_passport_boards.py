import os
import glob
import shutil

src_dir = "/Users/haneesh/.gemini/antigravity/brain/ad7ce59c-a576-40bd-bff5-f3ff5336c830"
dest_dir = "/Users/haneesh/yolowebsite26/assets/sign_boards"
os.makedirs(dest_dir, exist_ok=True)

for i in range(1, 6):
    pattern = f"{src_dir}/social_passport_{i}_*.png"
    files = glob.glob(pattern)
    if files:
        latest_file = max(files, key=os.path.getctime)
        dest_path = os.path.join(dest_dir, f"social_passport_{i}.png")
        shutil.copy2(latest_file, dest_path)
        print(f"Copied {os.path.basename(latest_file)} to social_passport_{i}.png")
    else:
        print(f"Warning: No files found matching {pattern}")
