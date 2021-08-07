const start = new Date().getTime();
const { build } = require('esbuild')
const path = require("path");

build({
    entryPoints: ['./src/react/main.jsx'],
    minify: true,
    platform: 'browser',
    bundle: true,
    format: 'iife',
    keepNames: false,
    sourcemap: false,
    outdir: path.resolve(__dirname, "../dist/react-esbuild")
})
    .then(() =>
        console.log('esbuild compiled', new Date().getTime() - start, 'ms')
    );
