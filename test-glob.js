const { globSync } = require('glob');
console.log('Testing globSync for jacoco.xml...');
const reports = globSync('**/jacoco.xml', { ignore: ['node_modules/**'] });
console.log('Reports found:', reports);

const reportsWithTarget = globSync('target/site/jacoco/jacoco.xml');
console.log('Direct path found:', reportsWithTarget);
