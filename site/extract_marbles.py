import os

def extract_between(content, start_str, end_str=None):
    start_idx = content.find(start_str)
    if start_idx == -1: return ""
    if end_str is None:
        return content[start_idx:]
    end_idx = content.find(end_str, start_idx)
    if end_idx == -1: return content[start_idx:]
    return content[start_idx:end_idx]

with open('../docs/presence/app.js', 'r') as f:
    app_js = f.read()

# Extract utilities
utils = extract_between(app_js, 'var prefersReducedMotion', '// ============ GLASS MARBLE')
marble_factory = extract_between(app_js, '// ============ GLASS MARBLE RENDERER (shared) ============', '// ============ HERO MARBLE SHOWCASE (PHYSICS CONVERGENCE) ============')
hero_showcase = extract_between(app_js, '// ============ HERO MARBLE SHOWCASE (PHYSICS CONVERGENCE) ============', '// ============ DIFFUSION CANVAS')

# Replace global vars that will clash
hero_showcase = hero_showcase.replace("var heroCanvas = document.getElementById('marbleCanvas');", "")
hero_showcase = hero_showcase.replace("var loopCounter = document.getElementById('loopCounter');", "")
hero_showcase = hero_showcase.replace("var coverageCounter = document.getElementById('coverageCounter');", "")

svelte_content = f"""<script lang="ts">
  import {{ onMount, onDestroy }} from 'svelte';

  let canvas: HTMLCanvasElement;
  let loopCounter: HTMLElement;
  let coverageCounter: HTMLElement;

  onMount(() => {{
    if (!canvas) return;
    const heroCanvas = canvas;
    
    // Polyfills for old code
    {utils}
    {marble_factory}
    
    // Execute the showcase logic in this scope
    {hero_showcase}
  }});
</script>

<figure class="hero-canvas" id="showcase">
  <canvas bind:this={{canvas}} id="marbleCanvas" aria-hidden="true"></canvas>
  <div class="hero-canvas-stats" aria-hidden="true">
      <span>Marbles <strong bind:this={{loopCounter}} id="loopCounter">0</strong></span>
      <span>Converge <strong bind:this={{coverageCounter}} id="coverageCounter">0%</strong></span>
  </div>
</figure>
"""

with open('src/components/MarbleCanvas.svelte', 'w') as f:
    f.write(svelte_content)

print("Created MarbleCanvas.svelte")
