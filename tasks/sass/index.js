'use strict';

const fs = require('fs');
const path = require('path');
const sass = require('npm-sass');

const mkdir = require('../../lib/mkdir');

module.exports = config => {
  if (!config.sass) {
    return Promise.resolve();
  }

  const out = path.resolve(process.cwd(), config.sass.out);

  return mkdir(out)
    .then(() => new Promise((resolve, reject) => {
      const aliases = {};
      if (config.theme) {
        aliases.$$theme = `hof-theme-${config.theme}`;
      }
      sass(config.sass.src, { aliases }, (err, result) => err ? reject(err) : resolve(result.css));
    }))
    .then(css => new Promise((resolve, reject) => {
      fs.writeFile(out, css, err => err ? reject(err) : resolve());
    }));
};
module.exports.task = 'compile sass';
