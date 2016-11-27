module.exports = {
  'extends': 'eslint:recommended',
  "env": {
    "node": true
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
