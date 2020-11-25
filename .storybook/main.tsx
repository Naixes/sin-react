module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    // 官网ts配置：好像默认就支持
    // typescript: {
    //   check: false,
    //   checkOptions: {},
    //   reactDocgen: 'react-docgen-typescript',
    //   reactDocgenTypescriptOptions: {
    //     shouldExtractLiteralValuesFromEnum: true,
    //     propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    //   },
    // },
    addons: [
        // 官网scss配置，引入样式失败改为webpack配置的方式
        // {
        //     name: '@storybook/preset-scss',
        //     options: {
        //         cssLoaderOptions: {
        //             modules: true
        //         }
        //     }
        // },
        // You can add other presets/addons by using the string declaration
        '@storybook/addon-actions/register',
        '@storybook/preset-create-react-app'
    ],
    webpackFinal: async config => {
        // Edit default scss loader to exclude storybook specific scss files
        config.module.rules = config.module.rules.filter(rule => {
        if (rule.test instanceof RegExp && rule.test.test('.scss')) {
            rule.exclude = /\.(stories|story).s[ca]ss$/;
        }
        return rule;
        });

        config.module.rules.push({
        test: /\.(stories|story).s[ca]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
        });

        // Return the altered config
        return config;
    },
  }