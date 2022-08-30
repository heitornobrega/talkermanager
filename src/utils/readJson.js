const fs = require('fs').promises;

const path = 'src/talker.json';

async function readData() {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = readData;
