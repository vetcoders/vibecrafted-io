import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Add imports to frontmatter
    import_statements = """
import CopyButton from '../components/CopyButton.svelte';
import MermaidViewer from '../components/MermaidViewer.svelte';
"""
    if "src/pages/pl/" in filepath:
        import_statements = """
import CopyButton from '../../components/CopyButton.svelte';
import MermaidViewer from '../../components/MermaidViewer.svelte';
"""

    content = content.replace('---\n', f'---{import_statements}', 1)

    # 2. Replace cb-copy buttons
    # Pattern: <button class="cb-copy"[^>]*data-copy="([^"]+)"[^>]*>([^<]+)</button>
    # Wait, some buttons have multiple classes, like "cb-copy install-command-bar__copy"
    def repl_copy(match):
        full_match = match.group(0)
        data_copy = match.group(1)
        label = match.group(2).strip()
        classes = re.search(r'class="([^"]+)"', full_match).group(1)
        return f'<CopyButton client:visible class="{classes}" textToCopy="{data_copy}" defaultLabel="{label}" />'

    content = re.sub(r'<button[^>]*class="[^"]*cb-copy[^"]*"[^>]*data-copy="([^"]+)"[^>]*>([\s\S]*?)</button>', repl_copy, content)

    # 3. Replace mmd-shell
    # We will find the mmd-shell div and extract the code inside.
    # Because there's only one in index.html, we can use a simpler approach or regex.
    mmd_match = re.search(r'<div class="mmd-shell"[^>]*>([\s\S]*?)<div class="mmd-preview"></div>\s*</div>', content)
    if mmd_match:
        mmd_inner = mmd_match.group(1)
        code_match = re.search(r'<pre><code>([\s\S]*?)</code></pre>', mmd_inner)
        if code_match:
            highlighted_code = code_match.group(1)
            # Raw code removes the span tags
            raw_code = re.sub(r'<span[^>]*>', '', highlighted_code).replace('</span>', '').replace('&gt;', '>')
            
            # Escape backticks and format
            highlighted_code_escaped = highlighted_code.replace('`', '\\`')
            raw_code_escaped = raw_code.replace('`', '\\`')
            
            mermaid_component = f'<MermaidViewer client:visible highlightedCode={{`{highlighted_code_escaped}`}} code={{`{raw_code_escaped}`}} />'
            
            content = content[:mmd_match.start()] + mermaid_component + content[mmd_match.end():]

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Processed {filepath}")

process_file('src/pages/index.astro')
process_file('src/pages/pl/index.astro')
