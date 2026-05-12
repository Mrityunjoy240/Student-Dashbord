const fs = require('fs');
const content = fs.readFileSync('scratch/full_syllabus.txt', 'utf16le');

const subjects = [];
const courseSections = content.split(/Course Name/g).slice(1);

courseSections.forEach(section => {
    const lines = section.split('\n');
    const name = lines[0].trim().replace(/^ /, '');
    
    const modules = [];
    // More robust module extraction
    const moduleSectionMatch = section.match(/5\. Course Modules([\s\S]*?)(6\. References|7\. Course Outcomes)/);
    if (moduleSectionMatch) {
        const moduleText = moduleSectionMatch[1];
        // Split by lines that start with a number (module number)
        // But be careful because topics might start with a number if they are lists
        // Looking at the text, module rows start with a number, then the title, then topics, then hours.
        const lines = moduleText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        let currentModule = null;
        
        lines.forEach(line => {
            // Check if line starts with a number followed by a space (Module number)
            const moduleStartMatch = line.match(/^(\d+)\s+([A-Za-z\s,&]+)/);
            if (moduleStartMatch && !line.includes('-')) {
                if (currentModule) modules.push(currentModule);
                currentModule = {
                    number: moduleStartMatch[1],
                    title: line.replace(/^\d+\s+/, '').trim(),
                    topics: []
                };
            } else if (currentModule) {
                // If it starts with - it's a topic
                if (line.startsWith('-')) {
                    currentModule.topics.push(line.replace(/^- /, '').trim());
                } else if (line.match(/^\d+$/)) {
                    // It's the hours line, ignore or store
                } else {
                    // Might be a continuation of a title or a topic without dash
                    if (line !== 'Module Topics Hours') {
                        // If it's not the header, treat it as a topic if it doesn't look like a number
                        if (!line.match(/^\d+$/)) {
                             currentModule.topics.push(line);
                        }
                    }
                }
            }
        });
        if (currentModule) modules.push(currentModule);
    }
    
    subjects.push({
        name: name,
        modules: modules
    });
});

fs.writeFileSync('scratch/syllabus_structured.json', JSON.stringify(subjects, null, 2));
console.log('Structured syllabus saved to scratch/syllabus_structured.json');
