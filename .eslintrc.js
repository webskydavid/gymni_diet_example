module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    jest: true
  },
  plugins: ['react', 'react-hooks'],
  extends: ['react-app'],
  rules: {
    'comma-dangle': ['warn', 'never'],
    quotes: ['warn', 'single'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.test.js', '.jsx']
      }
    ],
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1
      }
    ],
    semi: [2, 'always'],
    'arrow-spacing': [
      1,
      {
        before: true,
        after: true
      }
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton']
      }
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'const', next: '*' },
      { blankLine: 'any', prev: 'const', next: 'const' },
      { blankLine: 'always', prev: 'let', next: '*' }
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.js',
          '**/*.test.jsx',
          '**/test/**/*',
          '**/*.stories.jsx'
        ]
      }
    ],
    'react-hooks/rules-of-hooks': 'error'
  }
};
