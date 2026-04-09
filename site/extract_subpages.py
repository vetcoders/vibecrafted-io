import os
import sys

files_to_process = [
    ('../docs/presence/faq.html', 'src/pages/presence/faq.astro', 'en', "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. FAQ | VetCoders"),
    ('../docs/presence/quickstart.html', 'src/pages/presence/quickstart.astro', 'en', "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Quick Start | VetCoders"),
    ('../docs/pl/faq.html', 'src/pages/pl/faq.astro', 'pl', "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. FAQ | VetCoders"),
    ('../docs/pl/quickstart.html', 'src/pages/pl/quickstart.astro', 'pl', "𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Quick Start | VetCoders")
]

for src, dest, lang, title in files_to_process:
    if not os.path.exists(src):
        print(f"File {src} does not exist. Skipping.")
        continue
        
    with open(src, 'r') as f:
        content = f.read()

    start_idx = content.find('<div class="docs-shell">')
    if start_idx == -1:
        start_idx = content.find('<main class="shell" id="main-content">')
        if start_idx != -1:
            start_idx += len('<main class="shell" id="main-content">')

    end_idx = content.find('</main>')

    if start_idx != -1 and end_idx != -1:
        body_content = content[start_idx:end_idx]
        
        # Fix paths
        if lang == 'pl':
            body_content = body_content.replace('href="../presence/', 'href="/presence/')
            body_content = body_content.replace('src="../presence/', 'src="/presence/')
            body_content = body_content.replace('href="../', 'href="/')
        else:
            # for presence pages
            body_content = body_content.replace('href="../index.html"', 'href="/"')
            body_content = body_content.replace('href="../pl/', 'href="/pl/')
        
        # Ensure destination directory exists
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        
        layout_path = '../../layouts/Layout.astro' if lang == 'pl' else '../../layouts/Layout.astro'
        if dest.startswith('src/pages/presence'):
            layout_path = '../../layouts/Layout.astro'
            
        astro_content = f"""---
import Layout from '{layout_path}';
---

<Layout title="{title}" lang="{lang}">
{body_content}
</Layout>
"""
        with open(dest, 'w') as f:
            f.write(astro_content)
        print(f"Successfully created {dest}")
    else:
        print(f"Could not find boundaries for {src}")
