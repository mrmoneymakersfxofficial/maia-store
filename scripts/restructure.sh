#!/bin/bash
set -e
cd /home/z/maia-store/src/app

# Create (store) route group
mkdir -p "(store)"

# Move store routes into (store)/
for f in page.tsx template.tsx sitemap.ts globals.css; do
  [ -f "$f" ] && mv "$f" "(store)/" && echo "  moved $f"
done

for d in buscar carrito checkout coleccion comprar contacto favoritos nosotros api; do
  [ -d "$d" ] && mv "$d" "(store)/" && echo "  moved $d/"
done

echo "✅ Done. Root app contents: $(ls -1)"