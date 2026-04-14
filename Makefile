.DEFAULT_GOAL := help

PYTHON   ?= python3
INSTALLER := scripts/vetcoders_install.py
SHELL_INSTALLER := skills/vc-agents/scripts/install-shell.sh
SOURCE   := $(CURDIR)
BRANCH   ?= main

# Caddy deployment target (libraxis-vm, file server at /srv/vibecrafted/docs)
DEPLOY_HOST ?= libraxis-vm
DEPLOY_ROOT ?= /srv/vibecrafted/docs
DEPLOY_OWNER ?= caddy:caddy

.PHONY: help vibecrafted check test install skills helpers setup-dev dry-run doctor list update uninstall restore migrate migrate-dry init-hooks bundle foundations foundations-check site-dev site-build site-deploy site-deploy-pages bundle-build bundle-sign content-truth

help:
	@printf "\n"
	@printf "  \033[1m\033[38;5;173m⚒  𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. Framework\033[0m\n"
	@printf "  ─────────────────────────────────────\n"
	@printf "\n"
	@printf "  \033[36m▸\033[0m  make vibecrafted   \033[2mSafely install or update the 𝚅𝚒𝚋𝚎𝚌𝚛𝚊𝚏𝚝𝚎𝚍. framework (Orchestrator)\033[0m\n"
	@printf "\n"
	@printf "  \033[33m◆\033[0m  make install       \033[2mSkills + shell helpers (Direct)\033[0m\n"
	@printf "  \033[33m◇\033[0m  make skills        \033[2mSkills only\033[0m\n"
	@printf "  \033[33m◇\033[0m  make helpers       \033[2mShell helpers only\033[0m\n"
	@printf "  \033[33m◇\033[0m  make foundations   \033[2mInstall loctree + aicx binaries\033[0m\n"
	@printf "\n"
	@printf "  \033[36m▸\033[0m  make setup-dev     \033[2mSelective interactive install\033[0m\n"
	@printf "  \033[36m▸\033[0m  make dry-run       \033[2mPreview install actions\033[0m\n"
	@printf "\n"
	@printf "  \033[32m✓\033[0m  make doctor        \033[2mVerify installation health\033[0m\n"
	@printf "  \033[32m↻\033[0m  make update        \033[2mPull latest + re-install\033[0m\n"
	@printf "  \033[32m◇\033[0m  make list          \033[2mShow bundle + runtime foundations\033[0m\n"
	@printf "  \033[32m◇\033[0m  make bundle        \033[2mRefresh marketplace plugin bundle\033[0m\n"
	@printf "  \033[32m◇\033[0m  make content-truth \033[2mRender the canonical docs → site surface truth matrix\033[0m\n"
	@printf "  \033[32m✓\033[0m  make test          \033[2mRun installer + marketplace pytest gates\033[0m\n"
	@printf "  \033[32m✓\033[0m  make check         \033[2mRun basic linters on shell scripts\033[0m\n"
	@printf "\n"
	@printf "  \033[33m◆\033[0m  make migrate       \033[2mMigrate .ai-agents/ to \$$VIBECRAFTED_ROOT/.vibecrafted/artifacts/\033[0m\n"
	@printf "  \033[33m◇\033[0m  make migrate-dry   \033[2mPreview migration (dry run)\033[0m\n"
	@printf "\n"
	@printf "  \033[36m▸\033[0m  make site-dev          \033[2mStart Astro dev server for vibecrafted.io\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-build        \033[2mBuild static site (Astro + Svelte)\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-deploy       \033[2mBuild + rsync to libraxis-vm Caddy ($(DEPLOY_HOST):$(DEPLOY_ROOT))\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-deploy-pages \033[2mBuild + sync to local docs/ (GitHub Pages fallback)\033[0m\n"
	@printf "\n"
	@printf "  \033[32m◇\033[0m  make bundle-build  \033[2mBuild tarball bundle without heavy dirs\033[0m\n"
	@printf "  \033[32m◇\033[0m  make bundle-sign   \033[2mSign bundle tarball with RSA private key\033[0m\n"
	@printf "\n"
	@printf "  \033[31m✕\033[0m  make uninstall     \033[2mRemove skills + helpers\033[0m\n"
	@printf "  \033[31m↺\033[0m  make restore       \033[2mUndo last install/uninstall\033[0m\n"
	@printf "\n"
	@printf "  ╭─────────────────────────────────────────╮\n"
	@printf "  │ Vibecrafted with AI Agents by VetCoders │\n"
	@printf "  ╰─────────────────────────────────────────╯\n"
	@printf "\n"

vibecrafted: init-hooks
	@$(PYTHON) $(INSTALLER) install --source "$(SOURCE)" --with-shell

install: init-hooks
	@bash scripts/install-foundations.sh
	@bash skills/vc-agents/scripts/install-frontier-config.sh --source "$(SOURCE)" || printf '\033[33m[warn]\033[0m Frontier config install skipped (non-fatal)\n'
	@$(PYTHON) $(INSTALLER) install --source "$(SOURCE)" --with-shell --non-interactive

skills:
	@$(PYTHON) $(INSTALLER) install --source "$(SOURCE)" --non-interactive

helpers:
	@bash $(SHELL_INSTALLER) --source "$(SOURCE)"

foundations:
	@bash scripts/install-foundations.sh

foundations-check:
	@bash scripts/install-foundations.sh --check

setup-dev: init-hooks
	@$(PYTHON) $(INSTALLER) install --source "$(SOURCE)" --advanced

dry-run:
	@$(PYTHON) $(INSTALLER) install --source "$(SOURCE)" --dry-run

doctor:
	@$(PYTHON) $(INSTALLER) doctor

list:
	@$(PYTHON) $(INSTALLER) list --source "$(SOURCE)"

bundle:
	@$(PYTHON) scripts/build_marketplace_bundle.py --output "$(SOURCE)/vibecrafted-framework.plugin"

content-truth:
	@$(PYTHON) scripts/content_truth_report.py --format markdown

semgrep:
	@semgrep scan --config auto --error --quiet --exclude-rule html.security.audit.missing-integrity.missing-integrity .

test:
	@if command -v uv >/dev/null 2>&1; then \
		PYTHONPATH="$(SOURCE)" uv run --with pytest pytest tests/tui -q; \
	else \
		PYTHONPATH="$(SOURCE)" $(PYTHON) -m pytest tests/tui -q; \
	fi

update:
	@printf "Pulling origin/$(BRANCH)...\n"
	@git fetch origin
	@git checkout $(BRANCH) -- . 2>/dev/null || git merge --ff-only origin/$(BRANCH)
	@printf "Re-installing...\n"
	@$(PYTHON) $(INSTALLER) install --source "$(SOURCE)" --with-shell --non-interactive

uninstall:
	@$(PYTHON) $(INSTALLER) uninstall

restore:
	@$(PYTHON) $(INSTALLER) restore

migrate:
	@bash scripts/migrate_agents_workspace.sh

migrate-dry:
	@bash scripts/migrate_agents_workspace.sh --dry-run

check:
	@$(PYTHON) scripts/check_shell.py
	@echo "Check complete."

init-hooks:
	@if git rev-parse --git-dir >/dev/null 2>&1; then \
		echo "Installing custom git hooks..."; \
		git config core.hooksPath scripts/hooks; \
		chmod +x scripts/hooks/pre-commit scripts/hooks/pre-push; \
		echo "Hooks installed to scripts/hooks and activated via core.hooksPath."; \
		echo "Ensuring hook toolchain..."; \
		command -v uv >/dev/null 2>&1 || { echo "  installing uv..."; curl -LsSf https://astral.sh/uv/install.sh | sh; }; \
		uvx ruff --version >/dev/null 2>&1 && echo "  ruff: ok" || echo "  [warn] ruff unavailable via uvx"; \
		command -v semgrep >/dev/null 2>&1 && echo "  semgrep: ok" || { echo "  checking semgrep via uvx..."; uvx semgrep --version >/dev/null 2>&1 && echo "  semgrep: ok via uvx" || echo "  [warn] semgrep unavailable"; }; \
		npx --yes prettier --version >/dev/null 2>&1 && echo "  prettier: ok" || echo "  [warn] prettier unavailable via npx"; \
	else \
		echo "Not a git repo — skipping hooks."; \
	fi

# ============================================================================
# Site Management & Deployments
# ============================================================================

site-dev:
	@echo "Starting Astro dev server..."
	@cd site && pnpm run dev --host

site-build:
	@echo "Building static site..."
	@cd site && pnpm run build

site-deploy: site-build
	@echo "Deploying site to $(DEPLOY_HOST):$(DEPLOY_ROOT) (Caddy file_server)..."
	@rsync -avzh --delete --human-readable \
		--exclude='.DS_Store' \
		site/dist/ \
		$(DEPLOY_HOST):$(DEPLOY_ROOT)/
	@ssh $(DEPLOY_HOST) "chown -R $(DEPLOY_OWNER) $(DEPLOY_ROOT) && echo 'deployed VERSION:' && cat $(DEPLOY_ROOT)/VERSION 2>/dev/null || echo '(no VERSION file)'"
	@echo ""
	@echo "  ✓ https://vibecrafted.io now serves version $$(cat framework/VERSION)"

site-deploy-pages: site-build
	@echo "Syncing built site to local docs/ (GitHub Pages fallback)..."
	@python3 scripts/sync_site_to_docs.py
	@echo "Local docs/ updated. Commit + push to trigger Pages workflow."

# ============================================================================
# Bundled Builds & Codesigning
# ============================================================================

VERSION_STR := $(shell cat VERSION 2>/dev/null || echo "0.0.0")
BUNDLE_FILE := vibecrafted-v$(VERSION_STR).tar.gz
SIGNING_KEY ?= ~/.ssh/vibecrafted-private.pem

bundle-build:
	@echo "Building framework tarball: $(BUNDLE_FILE)..."
	@tar -czf $(BUNDLE_FILE) \
		--exclude='.git' \
		--exclude='node_modules' \
		--exclude='.idea' \
		--exclude='site/node_modules' \
		--exclude='site/dist' \
		--exclude='*.sig' \
		--exclude='*.tar.gz' \
		--exclude='*.tar' \
		.
	@echo "Bundle created: $(BUNDLE_FILE)"
	@shasum -a 256 $(BUNDLE_FILE) > SHA256SUMS.tar
	@echo "Checksum written to SHA256SUMS.tar"

bundle-sign:
	@if [ ! -f "$(SIGNING_KEY)" ]; then \
		echo "Error: Private key $(SIGNING_KEY) not found!"; \
		echo "Please provide SIGNING_KEY via env var or place it in default location."; \
		exit 1; \
	fi
	@echo "Signing $(BUNDLE_FILE)..."
	@openssl dgst -sha256 -sign $(SIGNING_KEY) -out $(BUNDLE_FILE).sig $(BUNDLE_FILE)
	@echo "Signature created: $(BUNDLE_FILE).sig"
