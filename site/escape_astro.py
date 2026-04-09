import os
import glob

def escape_astro_files():
    for root, dirs, files in os.walk('src/pages'):
        for file in files:
            if file.endswith('.astro'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                # Replace `{XDG_CONFIG_HOME` with `&#123;XDG_CONFIG_HOME`
                # and `config}` with `config&#125;`
                content = content.replace('{XDG_CONFIG_HOME', '&#123;XDG_CONFIG_HOME')
                content = content.replace('config}', 'config&#125;')
                
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Escaped braces in {filepath}")

escape_astro_files()
