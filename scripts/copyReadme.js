const fs = require('fs');
const DIST_LIB_PATH = 'dist/angular-contenteditable-accessor/';
const README_PATH = 'README.md';
const DIST_README_PATH = DIST_LIB_PATH + README_PATH;

// Copy README.md into dist folder
copyReadme();

function copyReadme() {
    if (fs.existsSync(README_PATH)) {
        fs.copyFile(README_PATH, DIST_README_PATH, () => {});
    }
}
