# ScreenScribe Review Gate

ScreenScribe is a narrated runtime review tool. This doc records the
reproducible path for getting past model validation so the review gate stays
usable instead of becoming a mystery failure.

## Verified Runtime Truth

- CLI: `screenscribe`
- Config file: `~/.config/screenscribe/config.env`
- Default provider path in this repo: LibraxisAI
- Default model aliases for that path: `ai-suggestions` for both LLM and vision
- Operator intent in config: `SCREENSCRIBE_VISION=false`
- Executable launcher surface in our shells: `~/.vibecrafted/bin/screenscribe`

## Failure Mode

If the CLI reports:

```text
Vision model 'programmer' not found
```

the stale-config case is only half the story. The model alias can be wrong,
but the current Libraxis Responses API also rejects ScreenScribe's
`input_image` validation probe with `404`, which makes the CLI misreport a
provider/request-shape mismatch as "model not found."

## Recovery

1. Open `~/.config/screenscribe/config.env`.
2. Update the model lines so they match the provider you are actually using.
3. For the default LibraxisAI path, keep both model aliases set to
   `ai-suggestions`.
4. Set `SCREENSCRIBE_VISION=false` to record operator intent.
5. Do not stop there. The current `screenscribe review` CLI still overrides the
   stored config flag by defaulting `vision=True` at runtime.
6. Make sure the launcher you actually call injects `--no-vision` unless you
   explicitly override it.
7. Re-run `screenscribe review` with the same video path.

## Launcher Shim

For the current Vibecrafted runtime surface, `~/.vibecrafted/bin/screenscribe`
is the operator-facing launcher. Until ScreenScribe's upstream CLI stops
overriding the stored config flag, that launcher should forward plain review
commands as:

```bash
screenscribe review --no-vision /absolute/path/to/video.mov
```

while still letting an explicit `--vision` or `--no-vision` flag pass through
unchanged.

## Repro Command

```bash
screenscribe review '/Users/polyversai/Desktop/Pulpit/Screnshots/Screen_Recording_2026-04-13_at_09.27.41.mov'
```

This command should now get past validation and enter the real STT + semantic
review pipeline. Full vision analysis remains disabled on this provider path
until the upstream validator and endpoint behavior converge.
