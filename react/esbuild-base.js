const path = require('path')
const { stylusLoader } = require('esbuild-stylus-loader')

const pkg = require(path.resolve('./package.json'))

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

exports.config = {
  plugins: [
    stylusLoader({}),
  ],
  entryPoints: [
    'src/config-forms-react.styl',
    'src/field-renderers.js',
    'src/form-container.jsx',
    'src/layout-renderers.js',
    'src/renderer.jsx',
  ],
  outdir: '.',
  metafile: true,
  bundle: true,
  format: 'esm',
  target: ['esnext'],
  external,
}
