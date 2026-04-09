import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Add import
    import_stmt = "import MarbleCanvas from '../components/MarbleCanvas.svelte';\n"
    if "src/pages/pl/" in filepath:
        import_stmt = "import MarbleCanvas from '../../components/MarbleCanvas.svelte';\n"
        
    if "import MarbleCanvas" not in content:
        content = content.replace('---\n', f'---\n{import_stmt}', 1)

    # Replace figure
    pattern = r'<figure class="hero-canvas" id="showcase">[\s\S]*?</figure>'
    replacement = '<MarbleCanvas client:only="svelte" />'
    
    content = re.sub(pattern, replacement, content)

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Processed {filepath}")

process_file('src/pages/index.astro')
process_file('src/pages/pl/index.astro')
