import { readFileSync } from 'fs';

const key = readFileSync('./secure/privkey.pem',{ encoding:'utf8', flag:'r' });
const cert = readFileSync('./secure/fullchain.pem', {encoding:'utf8', flag:'r'});
export default {
    key,
    cert
}