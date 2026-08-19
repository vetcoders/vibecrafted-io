# Backlog: vendored foundation binaries exist only for the build host

Status: open · opened 2026-08-16 during the 4.1.0 publication cut

## What is true today

The public install tarball is platform-neutral. Its payload is Python, shell,
Rust sources, and the launchers — the same bytes install correctly on macOS,
Linux, and Windows. `install.sh` / `install.ps1` build or fetch the foundations
when the bundle carries none for the running host.

The only platform-specific bytes are the vendored foundation binaries under
`bin/vendor/<platform>/`: `vc-frame`, `loct`, `loctree-mcp`, `aicx`, `aicx-mcp`.
They are an **install accelerator**, not a requirement.

`VENDOR_FOUNDATION_BINARIES` in the root `Makefile` hardcodes
`platform="$(HOST_VENDOR_PLATFORM)"` and builds with a plain
`cargo build --release`. So a bundle built on this Mac carries exactly one
vendor directory: `darwin-arm64`.

`channel/main.json` now states this per platform via the additive `platforms`
map (`vendored_foundations: true|false`). Nothing lies; Linux and Windows are
served the same archive and simply build their own foundations, which is slower,
not broken.

## What is missing

Real `bin/vendor/linux-x64`, `linux-arm64`, `windows-x64` payloads.

Deliberately **not** faked in this cut: parameterising the vendor macro to just
rename the output directory would put arm64 Mach-O binaries in a `linux-x64`
folder. A wrong binary is worse than an absent one — the absent case has a
working fallback path, the wrong case fails at exec time after install.

## What would close it

The layout already supports it: `bin/vendor/<platform>/` is platform-keyed
inside one tarball, and each host picks its own directory. One bundle can carry
all platforms.

- `cargo-zigbuild`, `cross`, and `zig` are present on the build host, so
  `linux-x64` / `linux-arm64` (gnu and musl targets are installed) are a
  plausible local cross-build. `vc-frame` is a zellij fork and is the risky one
  — probe it first, alone.
- `x86_64-pc-windows-msvc` is an installed rustup target but has no linker or
  SDK here; Windows vendoring needs a real Windows or `windows-gnu` runner. A CI
  matrix job producing the three vendor directories as artifacts, consumed by
  `bundle-build`, is the honest shape.
- Once a platform directory lands in `framework/bin/vendor/`,
  `describe_platform_coverage()` flips that platform to
  `vendored_foundations: true` with no further code change.

## Why it was not done in the 4.1.0 cut

The signed macOS release build owned the machine, and a speculative
cross-compile of a zellij fork under CPU contention was the wrong trade against
a security fix and a publication that both had to land the same evening.
