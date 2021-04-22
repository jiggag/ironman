module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: [['babel-plugin-styled-components', { displayName: true }]],
    },
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@analytics': './src/analytics',
          '@actions': './src/actions',
          '@components': './src/components',
          '@reducers': './src/reducers',
          '@sagas': './src/sagas',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
