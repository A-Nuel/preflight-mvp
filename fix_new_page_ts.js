const fs = require('fs');
const path = 'src/app/decisions/new/page.tsx';
let code = fs.readFileSync(path, 'utf8');

// Replace all for=" with htmlFor="
code = code.replace(/for="/g, 'htmlFor="');

// Replace all required="" with required
code = code.replace(/required=""/g, 'required');

fs.writeFileSync(path, code);
console.log('Fixed TS errors in new decision form.');
