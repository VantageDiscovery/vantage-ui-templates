module.exports = {
  '*.{js,cjs}': 'pnpm lint:fix',
  '*.{ts,tsx}': [() => 'tsc --noEmit', 'pnpm lint:fix'],
};
