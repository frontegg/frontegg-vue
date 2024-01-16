export default async ({context, github}) => {
  const {default: fs} = await import('fs');
  let changelog = fs.readFileSync('./CHANGELOG.md', {encoding: 'utf8'});
  const {version} = JSON.parse(fs.readFileSync('./lerna.json', {encoding: "utf-8"}));


  const {data: pullsData} = await github.rest.pulls.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: 'master',
    state: 'closed',
    sort: 'merged_at',
    direction: 'desc'
  });

  let changelogStr = ''
  console.log('pullsData', pullsData)

  const mergedPulls = pullsData.filter(pull => pull.merged_at != null);
  console.log('mergedPulls', mergedPulls)

  const lastReleaseIndex = mergedPulls.findIndex(pull => pull.head.ref === 'release/next')
  console.log('lastReleaseIndex', lastReleaseIndex)

  const lastRelease = mergedPulls[lastReleaseIndex]
  console.log('lastRelease', lastRelease)

  const pullsFromLastRelease = mergedPulls.slice(0, lastReleaseIndex);
  console.log('pullsFromLastRelease', pullsFromLastRelease)

  const reactChanges = pullsFromLastRelease.filter(pull => pull.head.ref !== 'upgrade-admin-portal')
  const adminPortalChanges = pullsFromLastRelease.filter(pull => pull.head.ref === 'upgrade-admin-portal')

  console.log('reactChanges', reactChanges)
  console.log('adminPortalChanges', adminPortalChanges)


  adminPortalChanges.forEach(pull => {
    changelogStr += `${pull.body}\n`
  });
  changelogStr += '\n';
  if (reactChanges.length > 0) {
    changelogStr += `### VueJS Wrapper ${version}:\n`
  }
  reactChanges.forEach(pull => {
    changelogStr += `- ${pull.title}\n`
  });

  console.log('changelogStr', changelogStr)

  changelog = changelog.replace(/# Change Log\n/g, '');
  const dateNow = new Date();
  const date = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`
  let newChangelog = `# Change Log\n\n## [${version}](https://github.com/frontegg/frontegg-vue/compare/${lastRelease.title}...v${version}) (${date})\n\n`
  newChangelog += changelogStr
  newChangelog += changelog.replace(/# Change Log\n/g, '\n');

  fs.writeFileSync('./CHANGELOG.md', newChangelog, {encoding: 'utf8'});
  return changelogStr;
}
