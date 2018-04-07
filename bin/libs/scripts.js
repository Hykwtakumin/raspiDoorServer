'use strict';

var Scripts, _, fs, path, wildcardToRegExp;

path = require('path');

fs = require('fs');

_ = require('lodash');

wildcardToRegExp = function(wildcardStr) {
  return new RegExp(wildcardStr.replace(/\*/g, '.*'));
};

Scripts = class Scripts {
  load(wildcardStr, callback = function() {}) {
    return this.findFiles(wildcardStr, function(err, files) {
      var file, i, len, scripts;
      if (err) {
        callback(err);
        return;
      }
      scripts = [];
      for (i = 0, len = files.length; i < len; i++) {
        file = files[i];
        scripts.push({
          name: file.name.match(/(.+)\.coffee$/)[1],
          fullpath: file.fullpath,
          function: require(file.fullpath)
        });
      }
      return callback(null, scripts);
    });
  }

  findFiles(wildcardStr, callback = function() {}) {
    return fs.readdir(path.resolve("scripts"), function(err, files) {
      if (err) {
        callback(err);
        return;
      }
      files = _.chain(files).filter(function(file) {
        return wildcardToRegExp(`${wildcardStr}\.coffee$`).test(file);
      }).map(function(file) {
        return {
          fullpath: path.resolve('scripts', file),
          name: file
        };
      }).value();
      return callback(null, files);
    });
  }

};

module.exports = new Scripts;
