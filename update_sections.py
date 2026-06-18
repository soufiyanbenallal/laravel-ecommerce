import os
import re

directory = "/Users/user/Documents/AS/laravel-ecommerce/resources/js/Pages/home/partials"

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace bg-white in <section> or main div with bg-background
    # But only if it's the outermost container of the section
    new_content = re.sub(r'className="py-(\d+) bg-white', r'className="py-\1 bg-background', content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for file in os.listdir(directory):
    if file.endswith(".part.tsx"):
        update_file(os.path.join(directory, file))

