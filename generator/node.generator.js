const { writeFileSync } = require('fs');
const { program } = require('commander');

let main = `// GENERATED FILE - DO NOT CHANGE BY HAND
//imports

//execution
`;

const filePattern = (index) => `// GENERATED FILE - DO NOT CHANGE BY HAND
export function module${index}() {
    console.log('.');
}

`;

program
    .description('Node modules generator')
    .requiredOption('-c <count>', 'number of modules to generate')
    .parse(process.argv);

let counter = 0;
const modulesCount = Number(program.opts()['c']);
for (let i = 0; i < modulesCount; i++) {
    main = main.replace(
        '//imports',
        `import { module${i} } from './module${i}';\n//imports`
    );

    main = main.replace(
        '//execution',
        `module${i}();\n//execution`
    );

    const fileContent = filePattern(i);
    writeFileSync(`./src/node/module${i}.js`, fileContent);
    counter += fileContent.split('\n').length;
    console.log('generated', `./src/node/module${i}.js`);
}

writeFileSync('./src/node/main.js', main);
console.log('saved', `./src/node/main.js`);
counter += main.split('\n').length;

console.log('Generated', counter, 'LOC');