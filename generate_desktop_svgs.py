import os

desktop_dir = "/Users/haneesh/Desktop/YOLO_Brand_Assets_HD"
os.makedirs(desktop_dir, exist_ok=True)

svg_template_standard = """<svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="300" fill="none"/>
    <g transform="translate(80, 50)">
        <text x="0" y="150" font-family="Arial, sans-serif" font-weight="900" font-size="140" fill="#212121" letter-spacing="-5">YO</text>
        <g transform="translate(-40, 0)"> 
            <path d="M260,30 L300,30 L300,120 Q300,150 330,150 L370,150 L370,180 L330,180 Q270,180 260,120 Z" fill="#039BE5" />
            <path d="M320,150 L370,60 L420,150" fill="#B0BEC5" opacity="0.5"/>
            <g transform="translate(320, 80) scale(0.9)">
                    <circle cx="5" cy="0" r="6" fill="#212121"/>
                    <path d="M0,8 L10,30 L-10,30 Z" fill="#212121"/>
                    <line x1="8" y1="15" x2="20" y2="40" stroke="#212121" stroke-width="2"/>
            </g>
        </g>
        <text x="340" y="150" font-family="Arial, sans-serif" font-weight="900" font-size="140" fill="#212121">O</text>
        <text x="220" y="240" font-family="Arial, sans-serif" font-weight="300" font-size="{font_size}" fill="#212121" letter-spacing="{letter_spacing}" text-anchor="middle">{brand_name}</text>
    </g>
</svg>"""

# Square format template for WhatsApp and Web Profiles (1:1 ratio)
svg_template_square = """<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="500" fill="#FFFFFF"/>
    <g transform="translate(18, 140) scale(0.9)">
        <text x="0" y="150" font-family="Arial, sans-serif" font-weight="900" font-size="140" fill="#212121" letter-spacing="-5">YO</text>
        <g transform="translate(-40, 0)"> 
            <path d="M260,30 L300,30 L300,120 Q300,150 330,150 L370,150 L370,180 L330,180 Q270,180 260,120 Z" fill="#039BE5" />
            <path d="M320,150 L370,60 L420,150" fill="#B0BEC5" opacity="0.5"/>
            <g transform="translate(320, 80) scale(0.9)">
                    <circle cx="5" cy="0" r="6" fill="#212121"/>
                    <path d="M0,8 L10,30 L-10,30 Z" fill="#212121"/>
                    <line x1="8" y1="15" x2="20" y2="40" stroke="#212121" stroke-width="2"/>
            </g>
        </g>
        <text x="340" y="150" font-family="Arial, sans-serif" font-weight="900" font-size="140" fill="#212121">O</text>
        <text x="220" y="240" font-family="Arial, sans-serif" font-weight="300" font-size="{font_size}" fill="#212121" letter-spacing="{letter_spacing}" text-anchor="middle">{brand_name}</text>
    </g>
</svg>"""

brands = [
    {"name": "COLLECTIVE", "font_size": "32", "spacing": "6", "file_prefix": "Collective"},
    {"name": "OUTDOORS", "font_size": "34", "spacing": "6", "file_prefix": "Outdoors"},
    {"name": "SOCIAL", "font_size": "34", "spacing": "8", "file_prefix": "Social"},
    {"name": "HOMES", "font_size": "34", "spacing": "10", "file_prefix": "Homes"}
]

for brand in brands:
    # Standard format
    standard_content = svg_template_standard.format(
        brand_name=brand['name'], 
        font_size=brand['font_size'], 
        letter_spacing=brand['spacing']
    )
    with open(os.path.join(desktop_dir, f"YOLO_{brand['file_prefix']}_Standard.svg"), "w") as f:
        f.write(standard_content)
        
    # Square format
    square_content = svg_template_square.format(
        brand_name=brand['name'], 
        font_size=brand['font_size'], 
        letter_spacing=brand['spacing']
    )
    with open(os.path.join(desktop_dir, f"YOLO_{brand['file_prefix']}_Profile_Square.svg"), "w") as f:
        f.write(square_content)

print(f"Generated {len(brands) * 2} SVG files to {desktop_dir}")
