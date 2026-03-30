import os
import glob

target_dir = "/Users/haneesh/yolowebsite26"
html_files = glob.glob(os.path.join(target_dir, "*.html"))

replacements = [
    ('src="assets/icons/header_logo.webp"', 'src="logo.svg"'),
    ('src="assets/icons/yolo_logo_horizontal.webp"', 'src="logo.svg"')
]

count = 0
for file_path in html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        modified = False
        for old, new in replacements:
            if old in new_content:
                new_content = new_content.replace(old, new)
                modified = True
        
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {os.path.basename(file_path)}")
            count += 1
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

print(f"Total files updated: {count}")
