.DEFAULT_GOAL := help

PYTHON   ?= python3
INSTALLER := scripts/vetcoders_install.py
SHELL_INSTALLER := skills/vc-agents/scripts/install-shell.sh
SOURCE   := $(CURDIR)
BRANCH   ?= main

# Caddy deployment target: libraxis user on libraxis-vm, file server at
# /home/libraxis/vibecrafted-io. libraxis-vm-root stays as root-escape
# alias only — not a deploy target anymore.
DEPLOY_HOST ?= libraxis-vm
DEPLOY_ROOT ?= /home/libraxis/vibecrafted-io

# Release pipeline anchors. Upstream is the canonical framework source;
# BUNDLE_ROOT in this repo tracks it and holds the signed tarball that
# later syncs into site/public/ via scripts/sync_site_release_assets.py.
UPSTREAM_ROOT ?= $(HOME)/Libraxis/vc-runtime/vibecrafted
SIGNING_KEY   ?= $(HOME)/.keys/vibecrafted-signing.key
BUNDLE_ROOT   := $(CURDIR)/framework
FRAMEWORK_RUNTIME_TESTS := \
	framework/tests/tui/test_bundle.py \
	framework/tests/tui/test_docs_links.py \
	framework/tests/tui/test_install_bootstrap.py \
	framework/tests/tui/test_installer_gui.py \
	framework/tests/tui/test_makefile_installer_contract.py \
	framework/tests/tui/test_release_contract.py

.PHONY: help vibecrafted check test install skills helpers setup-dev dry-run doctor list update uninstall restore migrate migrate-dry init-hooks bundle foundations foundations-check site-dev site-preview site-build site-deploy site-deploy-pages site-release bundle-preview bundle-build bundle-sign content-truth

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
	@printf "  \033[36m▸\033[0m  make site-preview      \033[2mServe production build locally (Astro preview, :4321)\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-build        \033[2mBuild static site (Astro + Svelte)\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-deploy       \033[2mBuild + rsync to Caddy ($(DEPLOY_HOST):$(DEPLOY_ROOT))\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-deploy-pages \033[2mBuild + sync to local docs/ (GitHub Pages mirror)\033[0m\n"
	@printf "\n"
	@printf "  \033[35m●\033[0m  make bundle-preview    \033[2mDiff upstream vs framework/ and project SHA256 (gate, non-interactive)\033[0m\n"
	@printf "  \033[35m●\033[0m  make bundle-build      \033[2mrsync upstream → framework/, tar framework/vibecrafted-v<VERSION>.tar.gz\033[0m\n"
	@printf "  \033[35m●\033[0m  make bundle-sign       \033[2mSign tarball + install.sh with ~/.keys/vibecrafted-signing.key\033[0m\n"
	@printf "  \033[35m◉\033[0m  make site-release      \033[2mFull cycle: bundle-preview → build → sign → sync → site-build → site-deploy\033[0m\n"
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
		PYTHONPATH="$(SOURCE)/framework" uv run --with pytest pytest $(FRAMEWORK_RUNTIME_TESTS) -q; \
	else \
		PYTHONPATH="$(SOURCE)/framework" $(PYTHON) -m pytest $(FRAMEWORK_RUNTIME_TESTS) -q; \
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
	@echo "Installing site deps..."
	@cd site && pnpm install --frozen-lockfile=false
	@echo "Building static site..."
	@cd site && pnpm run build

site-deploy: site-build
	@echo "Deploying site to $(DEPLOY_HOST):$(DEPLOY_ROOT) (Caddy file_server)..."
	@rsync -avzh --delete --human-readable \
		--exclude='.DS_Store' \
		site/dist/ \
		$(DEPLOY_HOST):$(DEPLOY_ROOT)/
	@ssh $(DEPLOY_HOST) "echo 'deployed VERSION:' && cat $(DEPLOY_ROOT)/VERSION 2>/dev/null || echo '(no VERSION file)'"
	@echo ""
	@echo "  ✓ https://vibecrafted.io now serves version $$(cat framework/VERSION)"

site-deploy-pages: site-build
	@echo "Syncing built site to local docs/ (GitHub Pages mirror)..."
	@python3 scripts/sync_site_to_docs.py
	@echo "Local docs/ updated. Commit + push to trigger Pages workflow."

site-preview: site-build
	@echo "Starting Astro preview (production build) on port 4321..."
	@cd site && pnpm run preview --host

# ============================================================================
# Release Pipeline
# ============================================================================
#
# Upstream canonical source: $(UPSTREAM_ROOT)
# Bundle root in this repo : $(BUNDLE_ROOT)
# Signed tarball ships through framework/ → site/public/ via
# scripts/sync_site_release_assets.py. site-deploy never rebuilds the
# tarball — release artefacts in site/public/ are stable between cycles.
#
# Cadence:
#   • Site iteration  : site-dev ↔ edit ↔ site-preview ↔ site-deploy
#   • Framework bump  : bump upstream VERSION, commit, then `make site-release`
# ============================================================================

UPSTREAM_VERSION := $(shell cat $(UPSTREAM_ROOT)/VERSION 2>/dev/null || echo "0.0.0")
BUNDLE_VERSION   := $(shell cat $(BUNDLE_ROOT)/VERSION 2>/dev/null || echo "0.0.0")
BUNDLE_ARCHIVE   := vibecrafted-v$(UPSTREAM_VERSION).tar.gz

# Excludes shared by rsync and tar. Two classes:
#   • junk we never ship (VCS, venvs, caches, IDE, OS noise)
#   • release artefacts born in framework/ that upstream does not track —
#     signing.pub (manual), SHA256SUMS (bundle-build), channel/ (sync
#     script), tarballs + sigs (this pipeline). These must survive
#     `rsync --delete upstream → framework/`.
BUNDLE_JUNK_EXCLUDES := \
	--exclude=.git \
	--exclude=.venv \
	--exclude=.pytest_cache \
	--exclude=.ruff_cache \
	--exclude=.mypy_cache \
	--exclude=.idea \
	--exclude=.DS_Store \
	--exclude=__pycache__ \
	--exclude=node_modules \
	--exclude='*.pyc'

BUNDLE_RELEASE_EXCLUDES := \
	--exclude='vibecrafted-v*.tar.gz' \
	--exclude='vibecrafted-v*.tar.gz.sig' \
	--exclude='install.sh.sig' \
	--exclude='SHA256SUMS' \
	--exclude='vibecrafted-signing.pub' \
	--exclude='channel/'

BUNDLE_EXCLUDES := $(BUNDLE_JUNK_EXCLUDES) $(BUNDLE_RELEASE_EXCLUDES)

bundle-preview:
	@if [ ! -d "$(UPSTREAM_ROOT)" ]; then \
		echo "Error: upstream $(UPSTREAM_ROOT) not found." >&2; \
		exit 2; \
	fi
	@printf "\n  upstream VERSION : \033[1m%s\033[0m\n" "$(UPSTREAM_VERSION)"
	@printf "  bundle   VERSION : \033[1m%s\033[0m\n\n" "$(BUNDLE_VERSION)"
	@if [ "$(UPSTREAM_VERSION)" = "$(BUNDLE_VERSION)" ] && \
	    [ -f "$(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE)" ] && \
	    [ -f "$(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE).sig" ] && \
	    diff -rq \
	      -x '.git' -x '.venv' -x '.pytest_cache' -x '.ruff_cache' \
	      -x '.mypy_cache' -x '.idea' -x '.DS_Store' -x '__pycache__' \
	      -x 'node_modules' -x '*.pyc' \
	      -x 'vibecrafted-v*.tar.gz' -x 'vibecrafted-v*.tar.gz.sig' \
	      -x 'install.sh.sig' -x 'SHA256SUMS' \
	      -x 'vibecrafted-signing.pub' -x 'channel' \
	      "$(UPSTREAM_ROOT)" "$(BUNDLE_ROOT)" >/dev/null 2>&1; then \
		printf "  \033[32m✓\033[0m Nothing to bundle — upstream and framework/ are already aligned.\n"; \
		printf "    (tarball present, VERSION matched, file trees identical)\n\n"; \
		exit 1; \
	fi
	@echo "  Changes detected. Projecting tarball..."
	@TMP_DIR=$$(mktemp -d -t vc-preview-XXXXXX) && \
	  trap "rm -rf $$TMP_DIR" EXIT && \
	  rsync -a $(BUNDLE_JUNK_EXCLUDES) $(UPSTREAM_ROOT)/ $$TMP_DIR/vibecrafted/ >/dev/null && \
	  tar -czf $$TMP_DIR/$(BUNDLE_ARCHIVE) -C $$TMP_DIR vibecrafted 2>/dev/null && \
	  TAR_SHA=$$(shasum -a 256 $$TMP_DIR/$(BUNDLE_ARCHIVE) | cut -d' ' -f1) && \
	  INSTALL_SHA=$$(shasum -a 256 $(UPSTREAM_ROOT)/install.sh | cut -d' ' -f1) && \
	  TAR_BYTES=$$(wc -c < $$TMP_DIR/$(BUNDLE_ARCHIVE) | tr -d ' ') && \
	  printf "  \033[1mProjected archive\033[0m: %s (%s bytes)\n" "$(BUNDLE_ARCHIVE)" "$$TAR_BYTES" && \
	  printf "  Projected SHA256 (tarball) : %s\n" "$$TAR_SHA" && \
	  printf "  Projected SHA256 (install) : %s\n" "$$INSTALL_SHA"
	@printf "\n  Next: \033[36mmake bundle-build\033[0m  (or \033[36mmake site-release\033[0m for the full cycle)\n\n"

bundle-build:
	@if [ ! -d "$(UPSTREAM_ROOT)" ]; then \
		echo "Error: upstream $(UPSTREAM_ROOT) not found." >&2; \
		exit 2; \
	fi
	@echo "Syncing upstream $(UPSTREAM_ROOT) → $(BUNDLE_ROOT)..."
	@rsync -a --delete $(BUNDLE_EXCLUDES) $(UPSTREAM_ROOT)/ $(BUNDLE_ROOT)/
	@echo "  ✓ Upstream synced"
	@echo "Building tarball: $(BUNDLE_ARCHIVE)..."
	@TMP_DIR=$$(mktemp -d -t vc-bundle-XXXXXX) && \
	  trap "rm -rf $$TMP_DIR" EXIT && \
	  rsync -a $(BUNDLE_JUNK_EXCLUDES) $(UPSTREAM_ROOT)/ $$TMP_DIR/vibecrafted/ && \
	  tar -czf $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE) -C $$TMP_DIR vibecrafted
	@echo "  ✓ Tarball: $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE)"
	@TAR_SHA=$$(shasum -a 256 $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE) | cut -d' ' -f1) && \
	  INSTALL_SHA=$$(shasum -a 256 $(BUNDLE_ROOT)/install.sh | cut -d' ' -f1) && \
	  printf "%s  %s\n%s  %s\n" \
	    "$$TAR_SHA" "$(BUNDLE_ARCHIVE)" \
	    "$$INSTALL_SHA" "install.sh" \
	    > $(BUNDLE_ROOT)/SHA256SUMS && \
	  echo "  ✓ SHA256SUMS updated ($(BUNDLE_ROOT)/SHA256SUMS)"

bundle-sign:
	@if [ ! -f "$(SIGNING_KEY)" ]; then \
		echo "Error: signing key $(SIGNING_KEY) not found." >&2; \
		echo "       Set SIGNING_KEY env var or place the key at that path." >&2; \
		exit 1; \
	fi
	@if [ ! -f "$(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE)" ]; then \
		echo "Error: $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE) missing. Run make bundle-build first." >&2; \
		exit 1; \
	fi
	@echo "Signing $(BUNDLE_ARCHIVE) with $(SIGNING_KEY)..."
	@openssl dgst -sha256 -sign $(SIGNING_KEY) \
		-out $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE).sig \
		$(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE)
	@echo "  ✓ Signature: $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE).sig"
	@echo "Signing install.sh..."
	@openssl dgst -sha256 -sign $(SIGNING_KEY) \
		-out $(BUNDLE_ROOT)/install.sh.sig \
		$(BUNDLE_ROOT)/install.sh
	@echo "  ✓ Signature: $(BUNDLE_ROOT)/install.sh.sig"

site-release:
	@echo ""
	@printf "  \033[1m⚒  Release cycle\033[0m — upstream v$(UPSTREAM_VERSION) → production\n"
	@echo "  ────────────────────────────────────────"
	@$(MAKE) --no-print-directory bundle-preview
	@$(MAKE) --no-print-directory bundle-build
	@$(MAKE) --no-print-directory bundle-sign
	@echo "Syncing release artefacts into site/public/..."
	@$(PYTHON) scripts/sync_site_release_assets.py
	@$(MAKE) --no-print-directory site-build
	@$(MAKE) --no-print-directory site-deploy
	@printf "\n  \033[32m✓\033[0m Release v%s shipped to https://vibecrafted.io\n\n" "$(UPSTREAM_VERSION)"
