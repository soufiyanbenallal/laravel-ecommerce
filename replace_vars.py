import os
import re

directory = "/Users/user/Documents/AS/laravel-ecommerce/resources/js"

replacements = {
    r'bg-\(--brand\)': 'bg-primary',
    r'text-\(--brand\)': 'text-primary',
    r'border-\(--brand\)': 'border-primary',
    r'ring-\(--brand\)': 'ring-ring',
    r'from-\(--brand\)': 'from-primary',
    r'to-\(--brand\)': 'to-primary',
    r'fill-\(--brand\)': 'fill-primary',
    r'stroke-\(--brand\)': 'stroke-primary',
    r'accent-\(--brand\)': 'accent-primary',

    r'bg-\(--brand-dark\)': 'bg-primary/90',
    r'text-\(--brand-dark\)': 'text-primary/90',
    r'border-\(--brand-dark\)': 'border-primary/90',
    
    r'bg-\(--brand-dim\)': 'bg-primary/10',

    r'bg-\(--dark\)': 'bg-foreground',
    r'text-\(--dark\)': 'text-foreground',
    r'border-\(--dark\)': 'border-foreground',

    r'bg-\(--surface\)': 'bg-background',
    r'bg-\(--surface-2\)': 'bg-secondary',

    # Also handle combinations like text-(--brand)/80 -> text-primary/80
    r'-\(--brand\)(/\d+)?': r'-primary\1',
    r'-\(--dark\)(/\d+)?': r'-foreground\1',
    r'-\(--surface\)(/\d+)?': r'-background\1',
    r'-\(--surface-2\)(/\d+)?': r'-secondary\1',
    r'-\(--gold\)(/\d+)?': r'-accent\1',
}

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content
    for pattern, repl in replacements.items():
        new_content = re.sub(pattern, repl, new_content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith((".tsx", ".ts", ".js", ".jsx")):
            replace_in_file(os.path.join(root, file))

