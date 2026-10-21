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
#
# Source of truth for upstream path: `.framework` pointer file at repo root.
# It carries a relative or absolute path to the upstream checkout (e.g.
# `../vibecrafted`). The pointer is the first candidate; the rest of the
# legacy candidates stay as fallback for environments that haven't seeded
# the pointer yet. Explicit override always wins:
#   make bundle-build UPSTREAM_ROOT=/path/to/vibecrafted
REPO_PARENT := $(abspath $(CURDIR)/..)
FRAMEWORK_POINTER_FILE := $(CURDIR)/.framework
FRAMEWORK_POINTER := $(strip $(shell [ -f "$(FRAMEWORK_POINTER_FILE)" ] && cat "$(FRAMEWORK_POINTER_FILE)" 2>/dev/null))
FRAMEWORK_POINTER_ABS := $(if $(FRAMEWORK_POINTER),$(abspath $(CURDIR)/$(FRAMEWORK_POINTER)))
UPSTREAM_ROOT_CANDIDATES := \
	$(FRAMEWORK_POINTER_ABS) \
	$(REPO_PARENT)/Vibecrafted \
	$(REPO_PARENT)/vibecrafted \
	$(HOME)/Git/Vibecrafted \
	$(HOME)/Libraxis/vc-runtime/vibecrafted
DETECTED_UPSTREAM_ROOT := $(firstword $(foreach dir,$(UPSTREAM_ROOT_CANDIDATES),$(if $(wildcard $(dir)/VERSION),$(dir))))
UPSTREAM_ROOT ?= $(or $(realpath $(DETECTED_UPSTREAM_ROOT)),$(firstword $(UPSTREAM_ROOT_CANDIDATES)))
SIGNING_KEY   ?= $(HOME)/.keys/vibecrafted-signing.key
ALLOW_DIRTY_UPSTREAM ?= 0
BUNDLE_ROOT   := $(CURDIR)/framework
VCFRAME_REPO ?= $(abspath $(UPSTREAM_ROOT)/../vc-frame)
AICX_REPO ?= $(abspath $(UPSTREAM_ROOT)/../aicx)
LOCTREE_REPO ?= $(abspath $(UPSTREAM_ROOT)/../loctree-suite)
LOCTREE_MCP_REPO ?= $(LOCTREE_REPO)/loctree-mcp
DIST_DIR ?= $(CURDIR)/dist
PLUGIN_NAME ?= vibecrafted-framework
FRAMEWORK_VERSION := $(shell cat $(BUNDLE_ROOT)/VERSION 2>/dev/null || echo "1.5.0")
FRAMEWORK_RUNTIME_TESTS := \
	framework/tests/tui/test_bundle.py \
	framework/tests/tui/test_docs_links.py \
	framework/tests/tui/test_install_bootstrap.py \
	framework/tests/tui/test_installer_gui.py \
	framework/tests/tui/test_makefile_installer_contract.py \
	framework/tests/tui/test_release_contract.py

HOST_UNAME_S := $(shell uname -s)
HOST_UNAME_M := $(shell uname -m)
HOST_VENDOR_OS := $(if $(filter Darwin,$(HOST_UNAME_S)),darwin,$(if $(filter Linux,$(HOST_UNAME_S)),linux,$(shell uname -s | tr '[:upper:]' '[:lower:]')))
HOST_VENDOR_ARCH := $(if $(filter arm64 aarch64,$(HOST_UNAME_M)),arm64,$(if $(filter x86_64,$(HOST_UNAME_M)),x64,$(HOST_UNAME_M)))
HOST_VENDOR_PLATFORM := $(HOST_VENDOR_OS)-$(HOST_VENDOR_ARCH)
FOUNDATION_VENDOR_BINARIES := vc-frame loctree-mcp loct aicx aicx-mcp
FOUNDATION_VENDOR_SPECS := \
	vc-frame:$(VCFRAME_REPO):vc-frame \
	loctree-mcp:$(LOCTREE_MCP_REPO):loctree-mcp \
	loct:$(LOCTREE_REPO):loct \
	aicx:$(AICX_REPO):aicx \
	aicx-mcp:$(AICX_REPO):aicx-mcp

# Vendored foundation binaries are an install accelerator, never a requirement:
# install.sh / install.ps1 build or fetch foundations when the bundle carries
# none for the running host. So skipping is always safe, and shipping a binary
# built from a moving source is not.
#
#   VENDOR_FOUNDATIONS=1     vendor from clean donors, skip dirty/missing ones
#   VENDOR_FOUNDATIONS=0     ship an unvendored bundle
#
# Living Tree makes the dirty case ordinary, not exceptional — a sibling repo
# usually has another agent's uncommitted work in it. A binary built from that
# tree corresponds to no commit, so it cannot be attested by the release
# receipt. Skip it and let channel/main.json report vendored_foundations:false.
VENDOR_FOUNDATIONS ?= 1

define VENDOR_FOUNDATION_BINARIES
dest_root="$(1)"; \
platform="$(HOST_VENDOR_PLATFORM)"; \
vendor_dir="$$dest_root/bin/vendor/$$platform"; \
if [ "$(VENDOR_FOUNDATIONS)" != "1" ]; then \
	echo "[vendor] VENDOR_FOUNDATIONS=$(VENDOR_FOUNDATIONS); shipping an unvendored bundle"; \
else \
echo "Vendoring foundation binaries for $$platform -> $$vendor_dir"; \
mkdir -p "$$vendor_dir"; \
for spec in $(FOUNDATION_VENDOR_SPECS); do \
	bin="$${spec%%:*}"; \
	rest="$${spec#*:}"; \
	repo="$${rest%:*}"; \
	cargo_bin="$${rest##*:}"; \
	if [ ! -d "$$repo" ]; then \
		echo "[vendor] WARN: $$bin source repo missing: $$repo; skipping"; \
		continue; \
	fi; \
	if git -C "$$repo" rev-parse --is-inside-work-tree >/dev/null 2>&1 \
	   && [ -n "$$(git -C "$$repo" status --porcelain --untracked-files=normal)" ]; then \
		echo "[vendor] WARN: $$bin donor $$repo is dirty; a binary built there matches no commit — skipping"; \
		continue; \
	fi; \
	src="$$repo/target/release/$$bin"; \
	workspace_src="$$(cd "$$repo/.." >/dev/null 2>&1 && pwd)/target/release/$$bin"; \
	if [ ! -x "$$src" ] && [ -x "$$workspace_src" ]; then \
		src="$$workspace_src"; \
	fi; \
	if [ ! -x "$$src" ]; then \
		echo "[vendor] $$bin missing at $$src; running cargo build --release --bin $$cargo_bin in $$repo"; \
		if ! cargo build --release --bin "$$cargo_bin" --manifest-path "$$repo/Cargo.toml"; then \
			echo "[vendor] WARN: build failed for $$bin from $$repo; skipping"; \
			continue; \
		fi; \
		if [ ! -x "$$src" ] && [ -x "$$workspace_src" ]; then \
			src="$$workspace_src"; \
		fi; \
	fi; \
	if [ -x "$$src" ]; then \
		cp "$$src" "$$vendor_dir/$$bin"; \
		chmod +x "$$vendor_dir/$$bin"; \
		echo "[vendor] copied $$bin"; \
	else \
		echo "[vendor] WARN: $$bin still missing after build: $$src; skipping"; \
	fi; \
done; \
for bin in $(FOUNDATION_VENDOR_BINARIES); do \
	if [ ! -x "$$vendor_dir/$$bin" ]; then \
		echo "[vendor] WARN: staged $$bin absent from $$vendor_dir"; \
	fi; \
done; \
rmdir "$$vendor_dir" "$$dest_root/bin/vendor" 2>/dev/null || true; \
fi
endef

.PHONY: help vibecrafted check test install skills helpers setup-dev dry-run doctor list update uninstall restore migrate migrate-dry init-hooks bundle foundations foundations-check foundations-release foundations-release-unsigned foundations-build foundations-build-unsigned foundations-pack foundations-pack-unsigned foundations-verify foundations-clean site-dev site-preview site-build site-release-assets-guard release-archive-secret-gate site-deploy site-deploy-pages site-release bundle-preview bundle-preflight bundle-build bundle-sign content-truth

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
	@printf "  \033[32m◇\033[0m  make foundations-release-unsigned \033[2mBuild complete unsigned foundations plugin\033[0m\n"
	@printf "  \033[32m◇\033[0m  make foundations-release \033[2mBuild complete signed/notarized foundations plugin\033[0m\n"
	@printf "  \033[32m✓\033[0m  make test          \033[2mRun installer + marketplace pytest gates\033[0m\n"
	@printf "  \033[32m✓\033[0m  make check         \033[2mRun basic linters on shell scripts\033[0m\n"
	@printf "\n"
	@printf "  \033[33m◆\033[0m  make migrate       \033[2mMigrate .ai-agents/ to \$$VIBECRAFTED_ROOT/.vibecrafted/artifacts/\033[0m\n"
	@printf "  \033[33m◇\033[0m  make migrate-dry   \033[2mPreview migration (dry run)\033[0m\n"
	@printf "\n"
	@printf "  \033[36m▸\033[0m  make site-dev          \033[2mStart Astro dev server for vibecrafted.io\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-preview      \033[2mServe production build locally (Astro preview, :4321)\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-build        \033[2mBuild static site; reuses existing signed framework assets\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-deploy       \033[2mBuild + rsync site only; does not rebuild/sign framework\033[0m\n"
	@printf "  \033[36m▸\033[0m  make site-deploy-pages \033[2mBuild + sync to local docs/ (GitHub Pages mirror)\033[0m\n"
	@printf "\n"
	@printf "  \033[35m●\033[0m  make bundle-preview    \033[2mDiff upstream vs framework/ and project SHA256 (gate, non-interactive)\033[0m\n"
	@printf "  \033[35m●\033[0m  make bundle-build      \033[2mrsync upstream → framework/, tar framework/vibecrafted-v<VERSION>.tar.gz\033[0m\n"
	@printf "  \033[35m●\033[0m  make bundle-sign       \033[2mSign tarball + install.sh with ~/.keys/vibecrafted-signing.key\033[0m\n"
	@printf "  \033[35m◉\033[0m  make site-release      \033[2mRelease mode: rebuild/sign/sync framework, then build + deploy site\033[0m\n"
	@printf "  \033[35m◇\033[0m  SITE_RELEASE_MODE=1 make site-build \033[2mAssert framework/ is fresh against UPSTREAM_ROOT before building\033[0m\n"
	@printf "\n"
	@printf "  \033[31m✕\033[0m  make uninstall     \033[2mRemove skills + helpers\033[0m\n"
	@printf "  \033[31m↺\033[0m  make restore       \033[2mUndo last install/uninstall\033[0m\n"
	@printf "\n"
	@printf "  ╭─────────────────────────────────────────╮\n"
	@printf "  │ Vibecrafted with AI Agents by Vetcoders │\n"
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

foundations-release:
	@$(MAKE) -C "$(BUNDLE_ROOT)" foundations-release \
		AICX_REPO="$(AICX_REPO)" \
		LOCTREE_REPO="$(LOCTREE_REPO)" \
		DIST_DIR="$(DIST_DIR)" \
		PLUGIN_NAME="$(PLUGIN_NAME)" \
		VERSION="$(FRAMEWORK_VERSION)" \
		KEYS="$(KEYS)" \
		NOTARY_PROFILE="$(NOTARY_PROFILE)"

foundations-release-unsigned:
	@$(MAKE) -C "$(BUNDLE_ROOT)" foundations-release-unsigned \
		AICX_REPO="$(AICX_REPO)" \
		LOCTREE_REPO="$(LOCTREE_REPO)" \
		DIST_DIR="$(DIST_DIR)" \
		PLUGIN_NAME="$(PLUGIN_NAME)" \
		VERSION="$(FRAMEWORK_VERSION)"

foundations-build:
	@$(MAKE) -C "$(BUNDLE_ROOT)" foundations-build \
		AICX_REPO="$(AICX_REPO)" \
		LOCTREE_REPO="$(LOCTREE_REPO)" \
		KEYS="$(KEYS)" \
		NOTARY_PROFILE="$(NOTARY_PROFILE)"

foundations-build-unsigned:
	@$(MAKE) -C "$(BUNDLE_ROOT)" foundations-build-unsigned \
		AICX_REPO="$(AICX_REPO)" \
		LOCTREE_REPO="$(LOCTREE_REPO)"

foundations-pack:
	@$(MAKE) -C "$(BUNDLE_ROOT)" foundations-pack \
		AICX_REPO="$(AICX_REPO)" \
		LOCTREE_REPO="$(LOCTREE_REPO)" \
		DIST_DIR="$(DIST_DIR)" \
		PLUGIN_NAME="$(PLUGIN_NAME)" \
		VERSION="$(FRAMEWORK_VERSION)"

foundations-pack-unsigned:
	@$(MAKE) -C "$(BUNDLE_ROOT)" foundations-pack-unsigned \
		AICX_REPO="$(AICX_REPO)" \
		LOCTREE_REPO="$(LOCTREE_REPO)" \
		DIST_DIR="$(DIST_DIR)" \
		PLUGIN_NAME="$(PLUGIN_NAME)" \
		VERSION="$(FRAMEWORK_VERSION)"

foundations-verify:
	@$(MAKE) -C "$(BUNDLE_ROOT)" foundations-verify \
		DIST_DIR="$(DIST_DIR)" \
		PLUGIN_NAME="$(PLUGIN_NAME)" \
		VERSION="$(FRAMEWORK_VERSION)"

foundations-clean:
	@$(MAKE) -C "$(BUNDLE_ROOT)" foundations-clean DIST_DIR="$(DIST_DIR)"

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
	@$(PYTHON) framework/scripts/check_shell.py
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

# Unconditional gate on the bytes this repo publishes. bundle-build already
# refuses to *create* a leaking payload; this refuses to *ship* one, including
# an archive that was committed before that gate existed or that a stale
# framework/ re-synced into site/public. No bypass flag by design.
release-archive-secret-gate:
	@python3 scripts/check_release_archive_secrets.py

site-dev:
	@echo "Starting Astro dev server..."
	@cd site && pnpm run dev --host

site-build: site-release-assets-guard release-archive-secret-gate
	@echo "Installing site deps..."
	@cd site && pnpm install --frozen-lockfile
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

# Exclude names are the source of truth for rsync, tar, and freshness diffs.
# Two classes:
#   • junk we never ship (VCS, venvs, caches, IDE, OS noise)
#   • release artefacts born in framework/ that upstream does not track —
#     signing.pub (manual), SHA256SUMS (bundle-build), channel/ (sync
#     script), tarballs + sigs (this pipeline). These must survive
#     `rsync --delete upstream → framework/`.
BUNDLE_JUNK_EXCLUDE_NAMES := \
	.git \
	.venv \
	.pytest_cache \
	.ruff_cache \
	.mypy_cache \
	.idea \
	.DS_Store \
	__pycache__ \
	node_modules \
	target \
	build \
	.build \
	DerivedData \
	.swiftpm \
	'*.app' \
	'*.pyc' \
	.ai-agents \
	.ai-context \
	.claude \
	.vibecrafted \
	.playwright-mcp \
	artifacts \
	dist \
	tmp \
	plans \
	'*.log' \
	'*.audit*.md' \
	'*.backup' \
	'*.out' \
	aicx-dashboard.html \
	.env

BUNDLE_RELEASE_EXCLUDE_NAMES := \
	'vibecrafted-v*.tar.gz' \
	'vibecrafted-v*.tar.gz.sig' \
	'install.sh.sig' \
	'SHA256SUMS' \
	'vibecrafted-signing.pub' \
	channel

# Top-level dot entries are keep-listed, not block-listed.
#
# Every payload leak this repo has had came from a blocklist that did not know
# about a directory yet: `.env` in 2026-08-10, and on 2026-08-16 a 4.1.0 build
# that carried 2.0 GB of `.loctree/` analysis cache (AICX-derived intent maps),
# `.prview/`, and a `.antigravitycli/` symlink pointing into the operator's home
# — in a payload whose actual product content is ~25 MB.
#
# A blocklist has to be updated every time somebody adopts a new tool. A
# keep-list fails the other way: a new dot directory is excluded until someone
# decides it belongs in the product. That is the direction the failure should
# lean. These six are what the last clean published tarball (3.5.0) carried.
BUNDLE_DOTENTRY_KEEP_NAMES := \
	.dockerignore \
	.github \
	.gitignore \
	.junie \
	.loctignore \
	.prettierignore

# rsync applies the first matching rule, so the includes must precede the
# anchored `/.*` exclude. The anchor keeps this to the transfer root; nested
# dot directories stay covered by BUNDLE_JUNK_EXCLUDE_NAMES.
BUNDLE_DOTENTRY_RULES := \
	$(addprefix --include=/,$(BUNDLE_DOTENTRY_KEEP_NAMES)) \
	--exclude='/.*'

BUNDLE_EXCLUDE_NAMES := $(BUNDLE_JUNK_EXCLUDE_NAMES) $(BUNDLE_RELEASE_EXCLUDE_NAMES)
BUNDLE_JUNK_EXCLUDES := $(addprefix --exclude=,$(BUNDLE_JUNK_EXCLUDE_NAMES)) $(BUNDLE_DOTENTRY_RULES)
BUNDLE_RELEASE_EXCLUDES := $(addprefix --exclude=,$(BUNDLE_RELEASE_EXCLUDE_NAMES))
BUNDLE_EXCLUDES := $(addprefix --exclude=,$(BUNDLE_EXCLUDE_NAMES)) $(BUNDLE_DOTENTRY_RULES)
BUNDLE_COPY_DIRLINK_DIFF_EXCLUDE_NAMES := skills runtime
BUNDLE_DIFF_EXCLUDES := $(addprefix -x ,$(BUNDLE_EXCLUDE_NAMES) $(BUNDLE_COPY_DIRLINK_DIFF_EXCLUDE_NAMES))

site-release-assets-guard:
	@if [ "$(SITE_RELEASE_MODE)" != "1" ]; then \
		printf "Site asset mode: stable signed framework assets from framework/ v%s. Use make site-release for framework release freshness.\n" "$(BUNDLE_VERSION)"; \
	else \
		if [ ! -d "$(UPSTREAM_ROOT)" ]; then \
			echo "Error: upstream $(UPSTREAM_ROOT) not found." >&2; \
			exit 2; \
		fi; \
		if [ ! -d "$(BUNDLE_ROOT)" ]; then \
			echo "Error: bundle root $(BUNDLE_ROOT) not found." >&2; \
			exit 2; \
		fi; \
		changes=$$(rsync -rcn --copy-dirlinks --delete --itemize-changes \
		      $(BUNDLE_EXCLUDES) --exclude='/bin/vendor/' \
		      "$(UPSTREAM_ROOT)/" "$(BUNDLE_ROOT)/") || exit 2; \
		if [ "$(UPSTREAM_VERSION)" != "$(BUNDLE_VERSION)" ] || [ -n "$$changes" ]; then \
			echo "Error: SITE_RELEASE_MODE=1 requested, but framework/ is not fresh against $(UPSTREAM_ROOT)." >&2; \
			echo "       Run make site-release to rebuild/sign/sync/deploy framework assets." >&2; \
			echo "       For a site-only deploy that intentionally reuses stable signed assets, run make site-build without SITE_RELEASE_MODE." >&2; \
			exit 4; \
		fi; \
		printf "Release asset guard: framework/ v%s is fresh against %s.\n" "$(BUNDLE_VERSION)" "$(UPSTREAM_ROOT)"; \
	fi

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
	      $(BUNDLE_DIFF_EXCLUDES) \
	      "$(UPSTREAM_ROOT)" "$(BUNDLE_ROOT)" >/dev/null 2>&1; then \
		printf "  \033[32m✓\033[0m Nothing to bundle — upstream and framework/ are already aligned.\n"; \
		printf "    (tarball present, VERSION matched, file trees identical)\n\n"; \
		exit 0; \
	fi
	@echo "  Changes detected. Projecting tarball..."
	@TMP_DIR=$$(mktemp -d -t vc-preview-XXXXXX) && \
	  trap "rm -rf $$TMP_DIR" EXIT && \
	  rsync -a $(BUNDLE_JUNK_EXCLUDES) $(UPSTREAM_ROOT)/ $$TMP_DIR/vibecrafted/ >/dev/null && \
	  $(call VENDOR_FOUNDATION_BINARIES,$$TMP_DIR/vibecrafted) && \
	  tar -czf $$TMP_DIR/$(BUNDLE_ARCHIVE) -C $$TMP_DIR vibecrafted 2>/dev/null && \
	  if command -v sha256sum >/dev/null 2>&1; then SHA256_CMD='sha256sum'; else SHA256_CMD='shasum -a 256'; fi && \
	  TAR_SHA=$$($$SHA256_CMD $$TMP_DIR/$(BUNDLE_ARCHIVE) | cut -d' ' -f1) && \
	  INSTALL_SHA=$$($$SHA256_CMD $(UPSTREAM_ROOT)/install.sh | cut -d' ' -f1) && \
	  TAR_BYTES=$$(wc -c < $$TMP_DIR/$(BUNDLE_ARCHIVE) | tr -d ' ') && \
	  printf "  \033[1mProjected archive\033[0m: %s (%s bytes)\n" "$(BUNDLE_ARCHIVE)" "$$TAR_BYTES" && \
	  printf "  Projected SHA256 (tarball) : %s\n" "$$TAR_SHA" && \
	  printf "  Projected SHA256 (install) : %s\n" "$$INSTALL_SHA"
	@printf "\n  Next: \033[36mmake bundle-build\033[0m  (or \033[36mmake site-release\033[0m for the full cycle)\n\n"

bundle-preflight:
	@if [ ! -d "$(UPSTREAM_ROOT)" ]; then \
		echo "Error: upstream $(UPSTREAM_ROOT) not found." >&2; \
		exit 2; \
	fi
	@if git -C "$(UPSTREAM_ROOT)" rev-parse --is-inside-work-tree >/dev/null 2>&1; then \
		status="$$(git -C "$(UPSTREAM_ROOT)" status --porcelain --untracked-files=all)"; \
		if [ -n "$$status" ] && [ "$(ALLOW_DIRTY_UPSTREAM)" != "1" ]; then \
			echo "Error: upstream $(UPSTREAM_ROOT) has uncommitted or untracked changes." >&2; \
			echo "       site-release publishes this upstream as the public tarball; release from a clean source tree." >&2; \
			echo "       To override intentionally, rerun with ALLOW_DIRTY_UPSTREAM=1." >&2; \
			echo "" >&2; \
			git -C "$(UPSTREAM_ROOT)" status --short --branch >&2; \
			exit 3; \
		fi; \
	fi

bundle-build: bundle-preflight
	@echo "Syncing upstream $(UPSTREAM_ROOT) → $(BUNDLE_ROOT)..."
	@rsync -a --delete --force --copy-dirlinks $(BUNDLE_EXCLUDES) $(UPSTREAM_ROOT)/ $(BUNDLE_ROOT)/
	@$(call VENDOR_FOUNDATION_BINARIES,$(BUNDLE_ROOT))
	@echo "  ✓ Upstream synced"
	@echo "Building tarball: $(BUNDLE_ARCHIVE)..."
	@TMP_DIR=$$(mktemp -d -t vc-bundle-XXXXXX) && \
	  trap "rm -rf $$TMP_DIR" EXIT && \
	  rsync -a --copy-dirlinks $(BUNDLE_JUNK_EXCLUDES) $(UPSTREAM_ROOT)/ $$TMP_DIR/vibecrafted/ && \
	  $(call VENDOR_FOUNDATION_BINARIES,$$TMP_DIR/vibecrafted) && \
	  leaks=$$(find "$$TMP_DIR" -type f \( -name '.env' -o \( -name '.env.*' ! -name '*.example' \) \)) && \
	  if [ -n "$$leaks" ]; then \
	    echo "FATAL: secret-bearing env files in the public release payload (2026-08-10 tskey incident class):" >&2; \
	    echo "$$leaks" >&2; \
	    echo "This gate is unconditional — ALLOW_DIRTY_UPSTREAM does not bypass it." >&2; \
	    exit 9; \
	  fi && \
	  tar -czf $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE) -C $$TMP_DIR vibecrafted
	@echo "  ✓ Tarball: $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE)"
	@if command -v sha256sum >/dev/null 2>&1; then SHA256_CMD='sha256sum'; else SHA256_CMD='shasum -a 256'; fi && \
	  TAR_SHA=$$($$SHA256_CMD $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE) | cut -d' ' -f1) && \
	  INSTALL_SHA=$$($$SHA256_CMD $(BUNDLE_ROOT)/install.sh | cut -d' ' -f1) && \
	  TAR_BYTES=$$(wc -c < $(BUNDLE_ROOT)/$(BUNDLE_ARCHIVE) | tr -d ' ') && \
	  printf "  Archive size: %s bytes\n" "$$TAR_BYTES" && \
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
	@echo "Publishing public key..."
	@PUB="$(patsubst %.key,%.pub,$(SIGNING_KEY))"; \
	  if [ -f "$$PUB" ]; then cp "$$PUB" "$(BUNDLE_ROOT)/vibecrafted-signing.pub"; \
	  else openssl pkey -in "$(SIGNING_KEY)" -pubout -out "$(BUNDLE_ROOT)/vibecrafted-signing.pub"; fi
	@echo "  ✓ Public key: $(BUNDLE_ROOT)/vibecrafted-signing.pub"

site-release:
	@echo ""
	@printf "  \033[1m⚒  Release cycle\033[0m — upstream v$(UPSTREAM_VERSION) → production\n"
	@echo "  ────────────────────────────────────────"
	@$(MAKE) --no-print-directory bundle-preflight
	@$(MAKE) --no-print-directory bundle-preview
	@$(MAKE) --no-print-directory bundle-build
	@$(MAKE) --no-print-directory bundle-sign
	@echo "Syncing release artefacts into site/public/..."
	@$(PYTHON) scripts/sync_site_release_assets.py
	@$(MAKE) --no-print-directory SITE_RELEASE_MODE=1 site-build
	@$(MAKE) --no-print-directory SITE_RELEASE_MODE=1 site-deploy
	@printf "\n  \033[32m✓\033[0m Release v%s shipped to https://vibecrafted.io\n\n" "$(UPSTREAM_VERSION)"
