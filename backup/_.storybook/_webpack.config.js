module.exports = ({ config }) => {
    // 配置ts
    config.module.rules.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [require.resolve("babel-preset-react-app")]
          }
        }
      ]
    });
    config.resolve.extensions.push(".ts", ".tsx");
  
    return config;
  };