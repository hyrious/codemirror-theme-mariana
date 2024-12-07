import {build} from 'esbuild'
import {external} from '@hyrious/esbuild-plugin-external'

await build({
  entryPoints: ['src/mariana.ts'],
  bundle: true,
  format: 'esm',
  plugins: [external()],
  outdir: 'dist',
  logLevel: 'info'
}).catch(() => process.exit(1))
