#1
mongodb使用1.4.19版本： npm install mongodb@1.4.19 --save
npm install bson；
并修改node_modules\mongodb\node_modules\bson\ext中index.js的catch：try {bson = require('../browser_build/bson');}

#2
修改package.json使用0.8.2版本的connect-mongo