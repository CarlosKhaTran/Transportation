const commonPlugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ['./src'],
      alias: {
        src: './src'
      }
    }
  ]
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [...commonPlugins],
};
