module.exports = function (api) {
  api.cache(true);

  const plugins = ['emotion'];
  const presets = ['next/babel', '@emotion/babel-preset-css-prop'];

  return { plugins, presets };
};
