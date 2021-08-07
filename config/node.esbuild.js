const start = new Date().getTime();
const { build } = require('esbuild')
const path = require("path");

build({
    entryPoints: ['./src/node/main.js'],
    minify: true,
    platform: 'node',
    bundle: true,
    format: 'iife',
    keepNames: false,
    sourcemap: false,
    outdir: path.resolve(__dirname, "../dist/node-esbuild")
})
    .then(() =>
        console.log('esbuild compiled', new Date().getTime() - start, 'ms')
    );
