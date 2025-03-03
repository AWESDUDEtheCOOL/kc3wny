const esbuild = require('esbuild');
const { build } = require('next/dist/build');

async function runCustomBuild() {
  // Run Next.js build
  await build(process.cwd());

  // Run esbuild
  await esbuild.build({
    entryPoints: ['.next/server/**/*.js', '.next/static/chunks/**/*.js'],
    outdir: '.next',
    minify: true,
    bundle: false,
    platform: 'node',
    format: 'cjs',
    target: ['es2015'],
  });
}

runCustomBuild();