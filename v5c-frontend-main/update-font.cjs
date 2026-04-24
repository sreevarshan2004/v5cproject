const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.jsx')) {
            results.push(file);
        }
    });
    return results;
}

const dirsToProcess = [
    path.join(__dirname, 'src', 'pages'),
    path.join(__dirname, 'src', 'components')
];

let files = [];
dirsToProcess.forEach(dir => {
    if (fs.existsSync(dir)) {
        files = files.concat(walkDir(dir));
    }
});

let updatedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Regex to match <p ... className="...">
    content = content.replace(/<p\b([^>]*?)className=[\"']([^\"']+)[\"']([^>]*?)>/g, (match, beforeClass, classNames, afterClass) => {
        if (!classNames.includes('font-sans')) {
            return `<p${beforeClass}className="${classNames} font-sans"${afterClass}>`;
        }
        return match;
    });

    if (content !== original) {
        fs.writeFileSync(file, content);
        updatedCount++;
        console.log('Updated:', file);
    }
});

console.log('Total files updated:', updatedCount);
