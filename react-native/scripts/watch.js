const fs = require('fs')
const { build } = require('esbuild')

const { config } = require('./build.js')

build({
  ...config,
  watch: {
    onRebuild(error, result) {
      if (error) console.error('watch build failed:', error)
      else console.log('watch build succeeded:', result)
    },
  },
  minify: false,
  sourcemap: true,
}).then(result => {
  fs.writeFileSync('meta.json', JSON.stringify(result.metafile))
})
