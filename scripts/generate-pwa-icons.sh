#!/usr/bin/env bash
#
# Generates the PWA icons for Amaya's Swahili Kitchen from public/icons/icon.svg.
# Requires ImageMagick (`convert`). Run from the project root:  bash scripts/generate-pwa-icons.sh
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SVG="$ROOT_DIR/public/icons/icon.svg"
ICON_DIR="$ROOT_DIR/public/icons"

if ! command -v convert >/dev/null 2>&1; then
  echo "Error: ImageMagick 'convert' not found. Install it (e.g. 'sudo apt install imagemagick')." >&2
  exit 1
fi

if [ ! -f "$SVG" ]; then
  echo "Error: source SVG not found at $SVG" >&2
  exit 1
fi

mkdir -p "$ICON_DIR"

# Standard icons.
convert -background none "$SVG" -resize 192x192 -strip "$ICON_DIR/icon-192.png"
convert -background none "$SVG" -resize 512x512 -strip "$ICON_DIR/icon-512.png"

# Maskable icon: full-bleed background with the artwork inside the 80% safe zone
# so Android adaptive icons never crop the flame. We render the SVG onto a solid
# terracotta square, then inset the logo to ~62% and center it.
BG="#EA580C"
convert -size 512x512 "xc:$BG" \
  \( -background none "$SVG" -resize 320x320 \) \
  -gravity center -composite -strip "$ICON_DIR/icon-maskable-512.png"

# Apple touch icon (opaque, no transparency, no rounded corners - iOS masks it).
convert -background none "$SVG" -resize 180x180 \
  -background "$BG" -flatten -alpha remove -alpha off -strip \
  "$ICON_DIR/apple-touch-icon.png"

# Favicon-32.
convert -background none "$SVG" -resize 32x32 -strip "$ICON_DIR/favicon-32.png"

echo "Generated PWA icons in $ICON_DIR:"
ls -la "$ICON_DIR"
