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
    'src/config-forms-react-editor.styl',
    'src/dnd-types.js',
    'src/field-renderers.js',
    'src/form-container.js',
    'src/layout-renderers.js',
    'src/palette.jsx',
    'src/editor.jsx',
  ],
  outdir: '.',
  metafile: true,
  bundle: true,
  format: 'esm',
  target: ['esnext'],
  external,
}
