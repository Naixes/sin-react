import React from 'react'
import {storiesOf} from '@storybook/react'

import Icon from './icon'

const defaultIcon = () => (
    <Icon icon='spinner' theme='primary' spin>default icon</Icon>
)

storiesOf('Icon 图标', module)
.add('Icon', defaultIcon)