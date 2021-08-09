const path = require('path');
const fs = require('fs');

function updatePreReleaseVersion(packagePath, nextVersion) {
  if (packagePath.indexOf('demo-saas') !== -1) {
    return;
  }
  const pkg = JSON.parse(fs.readFileSync(`${packagePath}/package.json`, { encoding: 'utf8' }));
  const lernaJSON = JSON.parse(fs.readFileSync(path.join(`${packagePath}/../../lerna.json`), { encoding: 'utf8' }));

  pkg.version = nextVersion;
  lernaJSON.version = nextVersion;

  [
    '@frontegg/vue',
    '@frontegg/nuxt',
  ].forEach(dep => {
    if (pkg.dependencies && pkg.dependencies[dep]) {
      pkg.dependencies[dep] = `${nextVersion}`;
    }
    if (pkg.devDependencies && pkg.devDependencies[dep]) {
      pkg.devDependencies[dep] = `${nextVersion}`;
    }
    if (pkg.peerDependencies && pkg.peerDependencies[dep]) {
      pkg.peerDependencies[dep] = `${nextVersion}`;
    }
  });

  fs.writeFileSync(`${packagePath}/package.json`, JSON.stringify(pkg, null, 2), { encoding: 'utf-8' });
  fs.writeFileSync(path.join(`${packagePath}/../../lerna.json`), JSON.stringify(lernaJSON, null, 2), { encoding: 'utf-8' });
}

updatePreReleaseVersion(process.argv[2], process.argv[3]);
