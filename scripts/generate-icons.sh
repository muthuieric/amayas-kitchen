#!/usr/bin/env bash
# Generates favicons, Apple touch icon, PWA icons and a 1200x630 OG image
# from public/logo.png using ImageMagick. Run once; safe to re-run.
set -euo pipefail
cd "$(dirname "$0")/.."

LOGO="public/logo.png"
[ -f "$LOGO" ] || { echo "ERROR: $LOGO not found"; exit 1; }

# Background colour sampled from the logo (warm cream #F4E7D2).
BG="#F4E7D2"

echo ">> favicon.ico (multi-size 16/32/48)"
convert "$LOGO" -background none -density 384 \
  -define icon:auto-resize=256,128,64,48,32,16 \
  "app/favicon.ico"

echo ">> icon-192.png & icon-512.png (PWA)"
convert "$LOGO" -background "$BG" -gravity center -resize 192x192 -extent 192x192 -strip public/icon-192.png
convert "$LOGO" -background "$BG" -gravity center -resize 512x512 -extent 512x512 -strip public/icon-512.png

echo ">> apple-icon.png (180x180, opaque bg)"
convert "$LOGO" -background "$BG" -gravity center -resize 180x180 -extent 180x180 -strip public/apple-icon.png

echo ">> favicon-32.png & favicon-16.png"
convert "$LOGO" -background "$BG" -gravity center -resize 32x32 -extent 32x32 -strip public/favicon-32.png
convert "$LOGO" -background "$BG" -gravity center -resize 16x16 -extent 16x16 -strip public/favicon-16.png

echo ">> icon-maskable-512.png (safe-zone padded PWA icon)"
convert "$LOGO" -background "$BG" -gravity center -resize 410x410 -extent 512x512 -strip public/icon-maskable-512.png

echo ">> opengraph-image (1200x630) with logo + name + tagline"
# Cream card on a warm sand gradient, logo centred, wordmark + tagline below.
convert -size 1200x630 gradient:'#F7EBD9-#E9D6B8' \
  \( "$LOGO" -background none -resize 260x244 -gravity center -extent 300x280 \) -gravity north -geometry +0+70 -composite \
  \( -background none -fill '#1A1A1A' -font DejaVu-Sans-Bold -pointsize 82 -gravity center \
     -size 1040x100 caption:'AMAYA'"'"'S' \) -gravity center -geometry +0-40 -composite \
  \( -background none -fill '#B3231C' -font DejaVu-Sans-Bold -pointsize 46 -gravity center \
     -size 1040x80 caption:'SWAHILI KITCHEN' \) -gravity center -geometry +0+50 -composite \
  \( -background none -fill '#5A4632' -font DejaVu-Sans-Oblique -pointsize 34 -gravity center \
     -size 900x60 caption:'Authentic Swahili & Coastal Cuisine · Kilimani, Nairobi' \) -gravity center -geometry +0+120 -composite \
  \( -background none -fill '#5A4632' -font DejaVu-Sans-Bold -pointsize 32 -gravity center \
     -size 900x60 caption:'Dine In · Uber Eats · Bolt Food · Glovo' \) -gravity center -geometry +0+175 -composite \
  -strip -quality 90 public/opengraph-image.png

echo ">> twitter-image (copy of OG, 1200x630)"
cp public/opengraph-image.png public/twitter-image.png

echo "DONE. Generated:"
ls -la public/icon-*.png public/apple-icon.png public/favicon-*.png public/opengraph-image.png public/twitter-image.png app/favicon.ico
