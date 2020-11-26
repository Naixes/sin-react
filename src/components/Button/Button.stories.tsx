import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Button from './button'

const defaultButton = () => (
    <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
    // 使用空节点会显示Unknown component
    <div>
        <Button size="lg">large button</Button>
        <Button size="sm">small button</Button>
    </div>
)

const buttonWithType = () => (
    <div>
        <Button btnType="primary">primary button</Button>
        <Button btnType="danger">danger button</Button>
        <Button btnType="link" href="www.baidu.com">link button</Button>
    </div>
)

storiesOf('Button 按钮', module)
.add('Button', defaultButton)
.add('不同尺寸的 Button', buttonWithSize)
.add('不同类型的 Button', buttonWithType)