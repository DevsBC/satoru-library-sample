const fs = require('fs-extra');  
const concat = require('concat');

(async function build() {
    const files = [
        './dist/elements/runtime.js',
        './dist/elements/polyfills.js',
        //'./dist/elements/scripts.js',
        './dist/elements/main.js'
    ];

    await fs.ensureDir('dist/webcomponents');
    await concat(files, 'dist/webcomponents/elements.js');
    await fs.copyFile(
        './dist/elements/styles.css',
        './dist/webcomponents/styles.css'
    );
})();