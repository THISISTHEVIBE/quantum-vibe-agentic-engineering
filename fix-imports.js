const fs = require('fs');
const path = require('path');

// Quick fixes for unused imports
const fixes = [{
        file: 'src/pages/AIOptimization/AIOptimization.tsx',
        search: /import \{ [^}]*Avatar[^}]*\}/g,
        replace: 'import {'
    },
    {
        file: 'src/pages/AIOptimization/AIOptimization.tsx',
        search: /import \{ [^}]*IconButton[^}]*\}/g,
        replace: 'import {'
    },
    {
        file: 'src/pages/AIOptimization/AIOptimization.tsx',
        search: /import \{ [^}]*Slider[^}]*\}/g,
        replace: 'import {'
    }
];

fixes.forEach(fix => {
    if (fs.existsSync(fix.file)) {
        let content = fs.readFileSync(fix.file, 'utf8');
        content = content.replace(fix.search, fix.replace);
        fs.writeFileSync(fix.file, content);
        console.log(`Fixed ${fix.file}`);
    }
});