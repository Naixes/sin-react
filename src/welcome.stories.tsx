import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Get Started', module)
  .add('welcome', () => {
    return (
      <>
        <h2>欢迎来到 sin-react 组件库</h2>
        <hr />
        <h4>安装试试</h4>
        <code>
          npm install sin-react --save
        </code>
      </>
    )
  }, { info : { disable: true }})