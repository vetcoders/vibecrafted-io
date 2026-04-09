import sys

with open('../docs/pl/index.html', 'r') as f:
    content = f.read()

start_idx = content.find('<article class="founder-manifesto">')
end_idx = content.find('<script src="../presence/app.js')

if start_idx != -1 and end_idx != -1:
    body_content = content[start_idx:end_idx]
    
    # Fix paths for assets inside PL version
    body_content = body_content.replace('href="../presence/', 'href="/presence/')
    body_content = body_content.replace('src="../presence/', 'src="/presence/')
    body_content = body_content.replace('href="../', 'href="/')
    
    astro_content = f"""---
import Layout from '../../layouts/Layout.astro';
---

<Layout title="𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. — Framework dla Founderów" lang="pl">
{body_content}
</Layout>
"""
    with open('src/pages/pl/index.astro', 'w') as f:
        f.write(astro_content)
    print("Successfully created src/pages/pl/index.astro")
else:
    print("Could not find boundaries")
