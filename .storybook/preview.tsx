import React from 'react'
import {addDecorator, addParameters} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'

// storybook样式
import './style.scss'
// 组件样式
import '../src/styles/index.scss'

const wrapperStyle: React.CSSProperties = {
    padding: '20px 40px 0 40px'
}
const storyWrapper = (storyFn: any) => (
    <div style={wrapperStyle}>
        <h4>组件演示</h4>
        {storyFn()}
    </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: { inline: true, header: false}})

export const parameters = {
    // layout: 'centered',
};