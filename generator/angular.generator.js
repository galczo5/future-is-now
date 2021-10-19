const { writeFileSync } = require('fs');
const { program } = require('commander');

let main = `// GENERATED FILE - DO NOT CHANGE BY HAND
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
// imports

const declarations = [
  AppComponent,
  // components
];

@NgModule({
  declarations,
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

`;

let app = `// GENERATED FILE - DO NOT CHANGE BY HAND
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
// template
  \`
})
export class AppComponent {}
`;

const component = (index) => `// GENERATED FILE - DO NOT CHANGE BY HAND
import { Component } from '@angular/core';

@Component({
  selector: 'app-component-${index}',
  template: '.'
})
export class Component${index} {}

`;

program
    .description('React components generator')
    .requiredOption('-c <count>', 'number of components to generate')
    .parse(process.argv);

let counter = 0;
const modulesCount = Number(program.opts()['c']);
for (let i = 0; i < modulesCount; i++) {
    main = main.replace(
        '// imports',
        `import { Component${i} } from './components/Component${i}';\n// imports`
    );

    main = main.replace(
        '// components',
        `Component${i},\n// components`
    );

    app = app.replace(
        '// template',
        `<app-component-${i}></app-component-${i}>\n//template`
    );

    const fileContent = component(i);
    writeFileSync(`./ng-cli/src/app/components/Component${i}.ts`, fileContent);
    counter += fileContent.split('\n').length;
    console.log('generated', `./ng-cli/src/app/components/Component${i}.ts`);
}

writeFileSync('./ng-cli/src/app/app.module.ts', main);
console.log('saved', `./ng-cli/src/app/app.module.ts`);
counter += main.split('\n').length;


writeFileSync('./ng-cli/src/app/app.component.ts', app);
console.log('saved', './ng-cli/src/app/app.component.ts');
counter += app.split('\n').length;

console.log('Generated', counter, 'LOC');
