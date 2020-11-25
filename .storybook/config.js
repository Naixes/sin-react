import { configure, addDecorator } from '@storybook/react';
// 处理src下.stories.tsx结尾的文件
configure(require.context('../src', true, /\.stories\.tsx$/), module)