const fs = require('fs').promises;

async function readData() {
    try {
        const data = await fs.readFile('./talker.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = readData;