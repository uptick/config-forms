const { stylusLoader } = require('esbuild-stylus-loader')

exports.config = {
  plugins: [
    stylusLoader({
      stylusOptions: {
        includeCss: true,
      },
    }),
  ],
  entryPoints: [
    'demo.js',
    'demo.styl',
  ],
  outdir: 'dist',
  metafile: true,
  bundle: true,
  format: 'iife',
}
