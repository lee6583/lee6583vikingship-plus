module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": {
    "name": "@storybook/react-webpack5",
    "options": {}
  },
  webpackFinal: async (config) => {
    // 修复 react-refresh-webpack-plugin 的 source map 兼容性问题
    // 禁用 source map 以避免 Invalid mapping 错误
    config.devtool = false;
    
    // 或者尝试禁用 react-refresh-webpack-plugin 的 source map
    const reactRefreshPlugin = config.plugins.find(
      plugin => plugin && plugin.constructor && plugin.constructor.name === 'ReactRefreshPlugin'
    );
    if (reactRefreshPlugin) {
      reactRefreshPlugin.options = reactRefreshPlugin.options || {};
      reactRefreshPlugin.options.overlay = false;
    }
    
    return config;
  }
}