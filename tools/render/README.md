# Render harness

The favicons and the share card are rendered from these two pages rather than
kept as binaries nobody can edit. Both are plain HTML — open them in a browser
and screenshot the element, or drive a headless one.

| File | Produces |
|---|---|
| `icon.html` | `public/favicon/*` and `public/favicon/favicon.svg` |
| `og.html` | `public/og-image.png` (1200×630) |

With [gstack browse](https://github.com/gowth6m/gstack):

```sh
B=~/.claude/skills/gstack/browse/dist/browse

# Share card
$B viewport 1300x800
$B goto file://./tools/render/og.html
$B screenshot public/og-image.png --selector '#og'

# Icons — set the size, then shoot, once per size
for size in 512 192 180 96 48; do
  $B goto file://./tools/render/icon.html
  $B js "document.getElementById('icon').style.width = \
         document.getElementById('icon').style.height = '${size}px'"
  $B screenshot /tmp/icon-$size.png --selector '#icon'
done
```

`favicon.ico` wraps the 48px PNG in an ICO container:

```python
import struct, pathlib
png = pathlib.Path("/tmp/icon-48.png").read_bytes()
pathlib.Path("public/favicon/favicon.ico").write_bytes(
    struct.pack("<HHH", 0, 1, 1)
    + struct.pack("<BBBBHHII", 48, 48, 0, 0, 1, 32, len(png), 22)
    + png
)
```

Keep `og.html`'s headline in step with the one in
`src/components/sections/hero.tsx`.
