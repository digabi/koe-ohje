const esbuild = require('esbuild')

esbuild.build({
  entryPoints:[
    {in: './src/index.ts', out: 'app.bundle'},
    {in: 'monaco-editor/esm/vs/editor/editor.worker.js', out: 'editor.worker.bundle'}
  ],
  bundle: true,
  outdir: 'build',
  loader: {
    '.png': 'file',
    '.gif': 'file',
    '.ttf': 'file',

  },
  define: {
    'process.env.MAP_TILES_URL':
      process.env.DEPLOYMENT_ENV === 'koe'
        ? JSON.stringify('/tiles')
        : JSON.stringify('https://s3.eu-north-1.amazonaws.com/abitti-prod.abitti-prod-cdk.maptiles.abitti.fi'),
    'process.env.MATH_DEMO_URL':
      process.env.DEPLOYMENT_ENV === 'koe' ? JSON.stringify('') : JSON.stringify('https://math-demo.abitti.fi'),
  },
}).then(() => console.log('esbuild done')).catch(console.error)
