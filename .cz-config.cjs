module.exports = {
    allowBreakingChanges: ['feat', 'fix', 'scope'],
    allowCustomScopes: false,
    scopeOverrides: {
        fix: [{ name: 'merge' }, { name: 'style' }, { name: 'test' }, { name: 'hotfix' }],
    },
    skipQuestions: ['body', 'footer', 'scope'],
    subjectLimit: 100,
    types: [
        { name: '🚀 feat:\tAdding a new feature', value: 'feat' },
        { name: '✨ enhance:\tImproving functionality or feature', value: 'enhance' },
        { name: '🐛 fix:\tFixing a bug', value: 'fix' },
        { name: '📒 type:\tUpdate project types', value: 'type' },
        { name: '📝 docs:\tAdd or update documentation', value: 'docs' },
        { name: '💄 style:\tAdd or update styles, ui or ux', value: 'style' },
        { name: '♻️  refactor:\tCode change that neither fixes a bug nor adds a feature', value: 'refactor' },
        { name: '⚡️ perf:\tCode change that improves performance', value: 'perf' },
        { name: '✅ test:\tAdding tests cases', value: 'test' },
        { name: '🚚 chore:\tChanges to the build process or auxiliary tools and libraries', value: 'chore' },
        { name: '⏪️ revert:\tRevert to a commit', value: 'revert' },
        { name: '🚧 wip:\tWork in progress', value: 'wip' },
        { name: '👷 build:\tAdd or update regards to build process', value: 'build' },
        { name: '💚 ci:\tAdd or update regards to build process', value: 'ci' },
    ],
};
