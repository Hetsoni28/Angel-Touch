// Build raster favicons from src/app/icon.svg (the butterfly mark).
// Google Search's favicon crawler and many browsers want a real favicon.ico / PNG,
// not only an SVG. Next.js links these automatically from the src/app folder.
//
// Run after changing the logo:  node scripts/make-favicons.mjs
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const app = path.join(process.cwd(), 'src', 'app')
const svg = fs.readFileSync(path.join(app, 'icon.svg'))
const IVORY = { r: 250, g: 248, b: 242, alpha: 1 }
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 }

/** The mark centred on a square canvas, with `pad` (0–0.5) of empty border. */
async function square(size, pad, background) {
  const inner = Math.round(size * (1 - pad * 2))
  const mark = await sharp(svg, { density: 600 }).resize(inner, inner, { fit: 'contain', background: CLEAR }).png().toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toBuffer()
}

// favicon.ico: PNG-compressed entries (16, 32, 48), supported by every current browser and Google
const sizes = [16, 32, 48]
const pngs = await Promise.all(sizes.map((s) => square(s, 0.04, CLEAR)))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4)
let offset = 6 + 16 * sizes.length
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3)
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6)
  e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12)
  offset += pngs[i].length
  return e
})
fs.writeFileSync(path.join(app, 'favicon.ico'), Buffer.concat([header, ...entries, ...pngs]))

// icon.png: 192×192 (a multiple of 48, as Google Search asks for), transparent
fs.writeFileSync(path.join(app, 'icon.png'), await square(192, 0.06, CLEAR))

// apple-icon.png: 180×180 on ivory; iOS rounds the corners itself
fs.writeFileSync(path.join(app, 'apple-icon.png'), await square(180, 0.14, IVORY))

for (const f of ['favicon.ico', 'icon.png', 'apple-icon.png']) {
  console.log(`${f.padEnd(15)} ${fs.statSync(path.join(app, f)).size} bytes`)
}
