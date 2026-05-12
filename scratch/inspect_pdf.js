const fs = require('fs');
const pdf = require('pdf-parse-fork');

async function extract() {
    const dataBuffer = fs.readFileSync('c:/Users/ANAMIKA/DEV/Temp/dashbord/4th Sem_AIML (1).pdf');
    try {
        const data = await pdf(dataBuffer);
        console.log("EXTRACTED_TEXT_START");
        console.log(data.text);
        console.log("EXTRACTED_TEXT_END");
    } catch (e) {
        console.error(e);
    }
}

extract();
