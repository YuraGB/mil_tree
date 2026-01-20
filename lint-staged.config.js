/* eslint-env node */
const formatCommand = 'prettier . --check';

module.exports = {
  '*.{js,jsx,ts,tsx,json,css,scss,md,mdx,html,yml,yaml}': formatCommand,
};
