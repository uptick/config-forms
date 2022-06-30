const fs = require('fs')
const path = require('path')
const { build } = require('esbuild')

const pkg = require(path.resolve('./package.json'))

exports.config = {
  watch: false,
  minify: true,
  sourcemap: false,
  entryPoints: [
    'src/index.jsx',
  ],
  outdir: 'dist',
  entryNames: 'config-forms-react-native',
  metafile: true,
  bundle: true,
  format: 'esm',
  target: ['esnext'],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
}

build(exports.config).then(result => {
  fs.writeFileSync('meta.json', JSON.stringify(result.metafile))
})
