/**
 * Generates all favicon assets from public/favicon.svg
 *  - favicon.png           (32×32 PNG fallback)
 *  - favicon.ico           (16/32/48 multi-size ICO)
 *  - apple-touch-icon.png  (180×180 iOS home-screen icon)
 *
 * Run:  npm run favicons
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const publicDir = path.resolve(import.meta.dirname, '..', 'public');
const svg = await readFile(path.join(publicDir, 'favicon.svg'), 'utf8');

await mkdir(publicDir, { recursive: true });

const render = (size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

// --- PNG exports ---
const png32 = await render(32);
await writeFile(path.join(publicDir, 'favicon.png'), png32);
console.log('wrote favicon.png', png32.length, 'bytes (32×32)');

const apple = await render(180);
await writeFile(path.join(publicDir, 'apple-touch-icon.png'), apple);
console.log('wrote apple-touch-icon.png', apple.length, 'bytes (180×180)');

// --- Multi-size ICO (Vista+ allows embedded PNG entries) ---
const sizes = [16, 32, 48];
const entries = [];
let offset = 6 + 16 * sizes.length;
for (const size of sizes) {
  const buf = await render(size);
  entries.push({ size, buf, offset });
  offset += buf.length;
}

const header = new DataView(new ArrayBuffer(6));
header.setUint16(0, 0, true); // reserved
header.setUint16(2, 1, true); // type: icon
header.setUint16(4, sizes.length, true);

const parts = [new Uint8Array(header.buffer)];
for (const e of entries) {
  const entry = new DataView(new ArrayBuffer(16));
  entry.setUint8(0, e.size >= 256 ? 0 : e.size);
  entry.setUint8(1, e.size >= 256 ? 0 : e.size);
  entry.setUint8(2, 0);        // color palette
  entry.setUint8(3, 0);        // reserved
  entry.setUint16(4, 1, true); // planes
  entry.setUint16(6, 32, true); // bits per pixel
  entry.setUint32(8, e.buf.length, true);
  entry.setUint32(12, e.offset, true);
  parts.push(new Uint8Array(entry.buffer));
}
for (const e of entries) parts.push(e.buf);

const icoBytes = new Uint8Array(await new Blob(parts).arrayBuffer());
await writeFile(path.join(publicDir, 'favicon.ico'), icoBytes);
console.log('wrote favicon.ico', icoBytes.length, 'bytes (16/32/48)');