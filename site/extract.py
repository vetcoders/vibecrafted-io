import sys

with open('../docs/index.html', 'r') as f:
    content = f.read()

start_idx = content.find('<article class="founder-manifesto">')
end_idx = content.find('<script src="presence/app.js')

if start_idx != -1 and end_idx != -1:
    body_content = content[start_idx:end_idx]
    astro_content = f"""---
import Layout from '../layouts/Layout.astro';
---

<Layout title="𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. — The Founders' Framework" lang="en">
{body_content}
</Layout>
"""
    with open('src/pages/index.astro', 'w') as f:
        f.write(astro_content)
    print("Successfully created src/pages/index.astro")
else:
    print("Could not find boundaries")

