import React from 'react'
import {storiesOf} from '@storybook/react'

import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const defaultIcon = () => (
    <Menu>
      <MenuItem>菜单0</MenuItem>
      <MenuItem disabled>菜单1</MenuItem>
      <MenuItem>菜单2</MenuItem>
      <SubMenu title="drop1">
        <MenuItem>菜单3-0</MenuItem>
        <MenuItem>菜单3-1</MenuItem>
      </SubMenu>
      <SubMenu title="drop2">
        <MenuItem>菜单4-0</MenuItem>
        <MenuItem>菜单4-1</MenuItem>
      </SubMenu>
    </Menu>
)
const verticalIcon = () => (
    <Menu mode="vertical">
      <MenuItem>菜单0</MenuItem>
      <MenuItem>菜单1</MenuItem>
      <MenuItem>菜单2</MenuItem>
      <SubMenu title="drop1">
        <MenuItem>菜单3-0</MenuItem>
        <MenuItem>菜单3-1</MenuItem>
      </SubMenu>
      <SubMenu title="drop2">
        <MenuItem>菜单4-0</MenuItem>
        <MenuItem>菜单4-1</MenuItem>
      </SubMenu>
    </Menu>
)

storiesOf('Menu 菜单', module)
.add('Menu', defaultIcon)
.add('纵向 Menu', verticalIcon)