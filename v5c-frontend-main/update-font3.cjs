const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    let list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        let stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.jsx')) results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src'));

let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Replace standard string classNames
    let newContent = content.replace(/<p\s+className=(['"])([\s\S]*?)\1/g, (match, quote, classes) => {
        if (!classes.includes('font-sans') && (classes.includes('text-') || classes.includes('leading-') || classes.includes('mt-') || classes.includes('mb-'))) {
            return `<p className=${quote}${classes} font-sans${quote}`;
        }
        return match;
    });

    // Replace template literal classNames like className={`...`}
    newContent = newContent.replace(/<p\s+className=\{`([\s\S]*?)`\}/g, (match, classes) => {
        if (!classes.includes('font-sans') && (classes.includes('text-') || classes.includes('leading-') || classes.includes('mt-') || classes.includes('mb-'))) {
            return `<p className={\`${classes} font-sans\`}`;
        }
        return match;
    });

    if (newContent !== content) {
        fs.writeFileSync(file, newContent);
        count++;
        console.log('Modified', file);
    }
});
console.log('Modified total:', count);
