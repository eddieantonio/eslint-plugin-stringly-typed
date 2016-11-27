module.exports = {
  'extends': 'eslint:recommended',
  "env": {
    "node": true
  },
  'parserOptions': {
    'ecmaVersion': 2015,
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-unused-vars': [
      'error', {
        'vars': 'all',
        'argsIgnorePattern': '^_'
      }
    ],
    'semi': [
      'error',
      'always'
    ]
  }
};
