/// <reference types="node" />
import fs from 'node:fs'
import path from 'node:path'
import { context } from 'esbuild'

let cache_path = 'node_modules/.cache/codemirror.js'
fs.mkdirSync('node_modules/.cache', { recursive: true })
let cm: string
if (fs.existsSync(cache_path)) {
  cm = fs.readFileSync(cache_path, 'utf8')
} else {
  cm = await fetch('https://codemirror.net/codemirror.js').then(r => r.text())
  fs.writeFileSync(cache_path, cm)
}

let shim = `
var require = function (mod) {
  if (mod == '@hyrious/codemirror-theme-mariana') return mariana;
  return CM[mod];
};
`

let ctx = await context({
  entryPoints: ['src/codemirror.js', 'src/dev-main.ts'],
  bundle: true,
  plugins: [{
    name: 'cm',
    setup({ onResolve, onLoad }) {
      onResolve({ filter: /codemirror\.js$/ }, args => {
        return { path: path.join(args.resolveDir, 'dist', args.path) }
      })
      onLoad({ filter: /codemirror\.js$/ }, () => {
        return ({ contents: cm + shim, loader: 'copy' })
      })
    }
  }],
  outdir: 'dist',
  packages: 'external',
  alias: {
    crelt: './node_modules/crelt/index.js',
    culori: './node_modules/culori/bundled/culori.mjs'
  },
  write: false,
  logLevel: 'info'
})

await ctx.serve({
  servedir: '.'
})
