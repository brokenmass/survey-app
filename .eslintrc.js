// Allows 'variables' in the form 'SOME_CONST_VALUE' or 'SOME_CONST_VALUE2'
const CONST_REGEX = '^[A-Z]+(_[A-Z]+)*\\d*?$';

// Allows variables in the form 'someVariable' or 'SomeVariable' or 'SomeVariable2'
const VAR_REGEX = '^[A-Za-z]+\\d*$';

// Allows filenames in the form 'fileName' or 'FileName' or 'FileName2' or 'FileName.spec'
const FILENAME_REGEX = '^[A-Za-z]+\\d*(\\.[a-z]+)*$';

// Allows one char conventional variables for well know dependencies (lodash, jquery, etc)
const DEPENDENCIES_REGEX = '^(_|\\$)$';

// Allows globally defined (through webpack env) variables (see 'globals' section belov)
const GLOBALS_REGEX = '^__[A-Z]+__$';

module.exports = {
  extends: ['canonical', 'canonical/react'],
  rules: {
    // core rules
    'lines-around-comment': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'filenames/match-regex': ['error', FILENAME_REGEX, false],
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    quotes: [2, 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],
    'no-unused-vars': ['error', {ignoreRestSiblings: true}],
    'sort-keys': 'off',
    'sort-vars': 'off',
    'class-methods-use-this': 'off',
    'id-match': [
      'error',
      [VAR_REGEX, CONST_REGEX, DEPENDENCIES_REGEX, GLOBALS_REGEX].join('|'),
      {
        onlyDeclarations: true,
        properties: true
      }
    ],

    // import plugin rules
    'import/no-namespace': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['[[theme]]']
      }
    ],
    'import/max-dependencies': ['warn', {max: 20}],
    'import/extensions': [
      'error',
      'never',
      {
        json: 'always',
        css: 'always',
        scss: 'always',
        svg: 'always'
      }
    ],
    'import/no-unassigned-import': [
      'error',
      {
        allow: ['babel-register', 'babel-polyfill']
      }
    ],

    // unicorn
    'unicorn/import-index': 'off',

    //react
    'react/prefer-stateless-function': [
      'error',
      {
        ignorePureComponents: true
      }
    ],
    'react/jsx-sort-props': 'off',
    'react/jsx-one-expression-per-line': 'off'
  },
  globals: {
    __PACKAGE__: true,
    __DEV__: true,
    __TEST__: true
  }
};
