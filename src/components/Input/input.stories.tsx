import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Input from './input'

// 受控组件
// const ControlledInput = () => {
//   const [value, setValue] = useState()
//   return <Input value={value} defaultValue={value} onChange={(e) => {setValue(e.target.value)}}/>
// }

const defaultInput = () => (
  <div>
    <Input
      placeholder="placeholder"
      onChange={action('changed')}
    />
    {/* <ControlledInput /> */}
  </div>
)

const disabledInput = () => (
  <Input
    placeholder="disabled input"
    disabled 
  />
)

const iconInput = () => (
  <Input
    placeholder="input with icon"
    icon="search"
  />  
)

const sizeInput = () => (
  <div>
    <Input
      defaultValue="large size"
      size="lg"
    />
    <Input
      placeholder="small size"
      size="sm"
    />
  </div>
)

const pandInput = () => (
  <div>
    <Input
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      defaultValue="google"
      append=".com"
    />
    
  </div>
)


storiesOf('Input 输入框', module)
  .add('Input', defaultInput)
  .add('被禁用的 Input', disabledInput)
  .add('带图标的 Input', iconInput)
  .add('大小不同的 Input', sizeInput)
  .add('带前后缀的 Input', pandInput)
