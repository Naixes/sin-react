import { configure, addDecorator } from '@storybook/react';

// 不支持scss，改为main.tsx进行配置
// import "../src/styles/index.scss"

// 处理src下.stories.tsx结尾的文件
configure(require.context('../src', true, /\.stories\.tsx$/), module)