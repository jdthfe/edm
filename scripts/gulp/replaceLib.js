'use strict';

const { dirname } = require('path');
const fs = require('fs');
const { getProjectPath } = require('../helpers');

function replacePath(path) {
  if (path.node.source && /\/lib\//.test(path.node.source.value)) {
    const esModule = path.node.source.value.replace('/lib/', '/es/');
    const esPath = dirname(getProjectPath('node_modules', esModule));
    if (fs.existsSync(esPath)) {
      path.node.source.value = esModule;
    }
  }

  // @ant-design/icons/xxx => @ant-design/icons/es/icons/xxx
  const antdIconMatcher = /@eui\/icons\/([^/]*)$/;
  if (path.node.source && antdIconMatcher.test(path.node.source.value)) {
    const esModule = path.node.source.value.replace(
      antdIconMatcher,
      (_, iconName) => `@eui/icons/es/icons/${iconName}`
    );
    const esPath = dirname(getProjectPath('node_modules', esModule));
    if (fs.existsSync(esPath)) {
      path.node.source.value = esModule;
    }
  }
}

function replaceLib() {
  return {
    visitor: {
      ImportDeclaration: replacePath,
      ExportNamedDeclaration: replacePath,
    },
  };
}

module.exports = replaceLib;
