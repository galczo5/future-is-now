const { execSync } = require('child_process');
const { writeFileSync } = require('fs');

const reactData = [];
const nodeData = [];

function getTime(command) {
    const start = new Date().getTime();
    execSync(command);
    return new Date().getTime() - start;
}

const numberOfIterations = 20;

for (let i = 1; i < numberOfIterations; i++) {
    const numberOfComponents = i * 100;
    console.log('working on:', 'node:', numberOfComponents);
    execSync('npm run node:clear');
    execSync('npm run node:generate -- -c ' + numberOfComponents);

    const webpack = getTime('npm run node:webpack:build');
    const esbuild = getTime('npm run node:esbuild:build');
    nodeData.push([numberOfComponents, webpack, esbuild]);
}

for (let i = 1; i < numberOfIterations; i++) {
    const numberOfComponents = i * 100;
    console.log('working on:', 'react:', numberOfComponents);
    execSync('npm run react:clear');
    execSync('npm run react:generate -- -c ' + numberOfComponents);

    const webpack = getTime('npm run react:webpack:build');
    const esbuild = getTime('npm run react:esbuild:build');
    reactData.push([numberOfComponents, webpack, esbuild]);
}

const nodeReport = nodeData.map(x => x.join('\t')).join('\n');
const reactReport = reactData.map(x => x.join('\t')).join('\n');

writeFileSync('./dist/nodeReport', nodeReport);
writeFileSync('./dist/reactReport', reactReport);