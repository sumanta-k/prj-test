import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

let portBeingUsed = process.env.PORT || 8000;

console.log("used port is " + portBeingUsed);
console.log('backend get started');
