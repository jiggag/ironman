module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
    'jest/globals': true,
    'react-native/react-native': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  plugins: ['react', 'react-native', 'jest', 'react-hooks', 'lodash', 'react-redux', 'promise', 'import'],
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:lodash/recommended',
    'plugin:react-redux/recommended',
    'plugin:promise/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    requireSemicolons: 'off',
    'global-require': 'warn',
    'arrow-body-style': 'off',
    'vars-on-top': 'error',
    'prefer-arrow-callback': 'warn',
    strict: 'warn',
    'no-var': 'warn',
    'no-console': 'off',
    'prefer-template': 'error',
    'spaced-comment': 'error',
    'max-len': 'off',
    'arrow-parens': 'off',
    quotes: 'error',
    'no-param-reassign': 'off',
    'no-undef': 'warn',
    'consistent-return': 'off',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'off',
    'comma-dangle': 'error',
    camelcase: 'off',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: true,
      },
    ],
    'object-shorthand': 'warn',
    'no-multiple-empty-lines': 'error',
    'no-underscore-dangle': 'error',
    'func-names': 'error',
    'prefer-const': 'error',
    'padded-blocks': 'error',
    'no-trailing-spaces': 'error',
    'no-shadow': 'warn',
    'object-curly-spacing': 'error',
    'array-callback-return': 'error',
    'quote-props': 'error',
    'eol-last': 'error',
    eqeqeq: 'warn',
    'generator-star-spacing': 'error',
    'function-paren-newline': 'error',
    'no-restricted-syntax': 'error',
    'class-methods-use-this': 'error',
    'no-plusplus': 'warn',
    'object-curly-newline': 'warn',
    'no-return-assign': 'warn',
    'prefer-destructuring': 'warn',
    'no-lonely-if': 'warn',
    'no-loop-func': 'warn',
    'no-nested-ternary': 'warn',
    'no-else-return': 'warn',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-no-bind': 'warn',
    'react/no-array-index-key': 'warn',
    'react/no-unused-state': 'warn',
    'react/no-multi-comp': 'warn',
    'react/jsx-closing-bracket-location': 'warn',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/no-string-refs': 'warn',
    'react/forbid-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-redux/useSelector-prefer-selectors': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'never',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-native',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'react-native-ui-lib',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'lodash/**',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        camelcase: 'warn',
      },
    },
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      'babel-module': {},
      node: {
        extensions: ['.js', '.android.js', '.ios.js', '.native.js', '.ts', '.tsx'],
      },
    },
  },
};
