
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});

const text = '012584';
const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);


