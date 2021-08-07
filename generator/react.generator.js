const { writeFileSync } = require('fs');
const { program } = require('commander');

const main = `// GENERATED FILE - DO NOT CHANGE BY HAND
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
`;

let app = `// GENERATED FILE - DO NOT CHANGE BY HAND
import React from 'react';
//imports

const App = () => {
  return (
  <div>
    //execution
  </div>
  );
};

export default App;
`;

const component = (index) => `// GENERATED FILE - DO NOT CHANGE BY HAND
import React from 'react';
const Component${index} = () => {
  return (
    <span>.</span>
  );
};

export default Component${index};
`;

program
    .description('React components generator')
    .requiredOption('-c <count>', 'number of components to generate')
    .parse(process.argv);

const modulesCount = Number(program.opts()['c']);
for (let i = 0; i < modulesCount; i++) {
    app = app.replace(
        '//imports',
        `import Component${i} from './Component${i}';\n//imports`
    );

    app = app.replace(
        '//execution',
        `<Component${i}/>\n    //execution`
    );

    writeFileSync(`./src/react/Component${i}.jsx`, component(i));
    console.log('generated', `./src/react/module${i}.jsx`);
}

app = app.replace('//execution', '');

writeFileSync('./src/react/main.jsx', main);
console.log('saved', `./src/react/main.jsx`);

writeFileSync('./src/react/App.jsx', app);
console.log('saved', `./src/react/App.jsx`);