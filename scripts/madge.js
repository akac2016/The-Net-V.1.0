const Madge = require('madge');
const Path = require('path');

Madge(Path.join(__dirname, '..', 'bin', 'src', 'Server.js'))
    .then((res) => res.image(Path.join(__dirname, 'dep.jpg')))
    .then((writtenImagePath) => {
        console.log('Image written to ' + writtenImagePath);
    });