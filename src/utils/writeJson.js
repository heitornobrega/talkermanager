const fs = require('fs').promises;

const path = 'src/talker.json';

async function writeData(content) {
    try {
        const convertedData = JSON.stringify(content);
        await fs.writeFile(path, convertedData, 'utf-8');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

module.exports = writeData;