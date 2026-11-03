/**
 * Bootstrap documented in vetcoders/vibecrafted:
 * README.md "Install" (macOS and Linux) and docs/INSTALL.md
 * (bootstrap channel). The script is `install.sh` in that repo.
 * The website publishes it at /install.sh; the script installs the
 * version named by /channel/main.json.
 */
export const PUBLIC_INSTALL_COMMAND =
  "curl -fsSL https://vibecrafted.io/install.sh | bash";
