import React from 'react'
import {storiesOf} from '@storybook/react'

import Progress from './progress'

const defaultProgress = () => (
    <Progress percent={30}></Progress>
)

storiesOf('Progress 进度条', module)
.add('Progress', defaultProgress)