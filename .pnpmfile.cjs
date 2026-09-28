function readPackage(pkg, context) {
  if (pkg.dependencies && pkg.dependencies['qs']) {
    pkg.dependencies['qs'] = '6.16.0';
  }
  if (pkg.dependencies && pkg.dependencies['path-to-regexp']) {
    if (pkg.dependencies['path-to-regexp'].startsWith('0.1.') || pkg.dependencies['path-to-regexp'] === '0.1.12') {
      pkg.dependencies['path-to-regexp'] = '0.1.13';
    }
  }
  if (pkg.dependencies && pkg.dependencies['fast-xml-parser']) {
    if (pkg.dependencies['fast-xml-parser'].startsWith('5.') || pkg.dependencies['fast-xml-parser'].startsWith('^5.')) {
      pkg.dependencies['fast-xml-parser'] = '5.7.0';
    }
  }
  if (pkg.dependencies && pkg.dependencies['body-parser']) {
    if (pkg.dependencies['body-parser'].startsWith('1.') || pkg.dependencies['body-parser'].startsWith('^1.')) {
      pkg.dependencies['body-parser'] = '1.20.6';
    }
  }
  if (pkg.dependencies && pkg.dependencies['esbuild']) {
    pkg.dependencies['esbuild'] = '^0.25.10';
  }
  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
