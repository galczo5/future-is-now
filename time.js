const { execSync } = require('child_process');
const { program } = require('commander');
const chalk = require('chalk');

program
    .description('Measure and compare time execution of bash commands')
    .requiredOption('--webpack <command>', 'command to execute')
    .requiredOption('--esbuild <command>', 'command to execute')
    .option('--headless', 'print without header')
    .option('--header <header>', 'text to print as header')
    .parse(process.argv);

let msg = `
    ______ _   _ _____ _    ______   _____ ________  ___ _____     
    | ___ \\ | | |_   _| |   |  _  \\ |_   _|_   _|  \\/  ||  ___|    
    | |_/ / | | | | | | |   | | | |   | |   | | | .  . || |__      
    | ___ \\ | | | | | | |   | | | |   | |   | | | |\\/| ||  __|     
    | |_/ / |_| |_| |_| |___| |/ /    | |  _| |_| |  | || |___     
    \\____/ \\___/ \\___/\\_____/___/     \\_/  \\___/\\_|  |_/\\____/     
                                                                   
                                                                   
     _____ ________  _________  ___  ______  ___ _____ ___________ 
    /  __ \\  _  |  \\/  || ___ \\/ _ \\ | ___ \\/ _ \\_   _|  _  | ___ \\
    | /  \\/ | | | .  . || |_/ / /_\\ \\| |_/ / /_\\ \\| | | | | | |_/ /
    | |   | | | | |\\/| ||  __/|  _  ||    /|  _  || | | | | |    / 
    | \\__/\\ \\_/ / |  | || |   | | | || |\\ \\| | | || | \\ \\_/ / |\\ \\ 
     \\____/\\___/\\_|  |_/\\_|   \\_| |_/\\_| \\_\\_| |_/\\_/  \\___/\\_| \\_|
                                                                   
                                                                                                                                                               
`;
if (!program.opts()['headless']) {
    console.log(msg);
}

const header = program.opts()['header'];
if (header) {
    console.log(chalk.cyanBright(chalk.bold('-'.repeat(header.length + 6))));
    console.log(
        chalk.cyanBright(chalk.bold('--')),
        chalk.cyanBright(chalk.bold(header)),
        chalk.cyanBright(chalk.bold('--'))
    );
    console.log(chalk.cyanBright(chalk.bold('-'.repeat(header.length + 6))), '\n')
}

const command1 = program.opts()['webpack'];
console.log(chalk.bold('-- measuring time of webpack command:'), chalk.yellow(command1));
const start1 = new Date().getTime();
execSync(command1);
const end1 = new Date().getTime();
const time1 = end1 - start1;
console.log('-- webpack command measure end', time1, '\n');

const command2 = program.opts()['esbuild'];
console.log(chalk.bold('-- measuring time of esbuild command:'), chalk.yellow(command2));
const start2 = new Date().getTime();
execSync(command2);
const end2 = new Date().getTime();
const time2 = end2 - start2;
console.log('-- esbuild command measure end', time2, '\n');

console.log(chalk.bold('--- Summary:'));
console.log('webpack: ', time1, 'ms');
console.log('esbuild: ', time2, 'ms');

console.log();

const compareResult = chalk.bold(Math.round((time1 / time2) * 100) / 100);
console.log(
    chalk.bgGreen(`ESBUILD WAS ${compareResult} TIMES FASTER THAN WEBPACK`),
);

console.log();