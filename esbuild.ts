// eslint-disable-next-line
const esbuild = require('esbuild')

const isWatchMode = process.argv.includes("--watch")

/* `koe` build version is the one to be run in actual test environment,
 * the `else` option is the cheat app hosted in S3 for public internet usage */
const isKoeBuild = process.env.DEPLOYMENT_ENV === 'koe'

const buildOptions = {
  entryPoints: [{ in: './src/index.ts', out: 'app.bundle' }],
  sourcemap: !isWatchMode,
  minify: !isWatchMode,
  bundle: true,
  outdir: 'build',
  loader: {
    '.png': 'file',
    '.gif': 'file',
    '.ttf': 'file',

  },
  define: {
    'process.env.MAP_TILES_URL':
      isKoeBuild
        ? JSON.stringify('/tiles')
        : JSON.stringify('https://s3.eu-north-1.amazonaws.com/abitti-prod.abitti-prod-cdk.maptiles.abitti.fi'),
    'process.env.MATH_DEMO_URL':
      isKoeBuild ? JSON.stringify('') : JSON.stringify('https://math-demo.abitti.fi'),
    'process.env.WATCH': isWatchMode.toString()
  },
}

const watch = async () => {
  const buildContext = await esbuild.context(buildOptions)

  await buildContext.watch()

  await buildContext.serve({
    servedir: ".",
    port: 8080
  })
  console.log('Watching for changes, serving in port 8080.')
}

if (isWatchMode) {
  watch().catch(console.error)
} else {
  esbuild.build(buildOptions).then(() => console.log('esbuild done')).catch(console.error)
}
