import re

with open("src/styles/global.css", "r") as f:
    css = f.read()

# Replace gap: 0.15rem; with a larger gap and a separator
new_css_block = """
.nav-get-zone {
    display: inline-flex;
    align-items: center;
    gap: 1.25rem;
}

.nav-get-zone a[lang="pl"],
.nav-get-zone a[lang="en"] {
    position: relative;
}

.nav-get-zone a[lang="pl"]::before,
.nav-get-zone a[lang="en"]::before {
    content: "";
    position: absolute;
    left: -0.625rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 14px;
    background-color: var(--glass-panel-border);
}
"""

css = re.sub(r'\.nav-get-zone\s*\{\s*display:\s*inline-flex;\s*align-items:\s*center;\s*gap:\s*0\.15rem;\s*\}', new_css_block.strip(), css)

with open("src/styles/global.css", "w") as f:
    f.write(css)

print("Nav styles patched.")
