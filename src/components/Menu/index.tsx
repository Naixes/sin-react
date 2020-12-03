import { FC } from 'react'
import Menu, {MenuProps} from './menu'
import MenuItem, {MenuItemProps} from './menuItem'
import SubMenu, {SubMenuProps} from './subMenu'

export type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>,
    SubMenu: FC<SubMenuProps>
}

// 合并成为一个组件
const TransMenu = Menu as IMenuComponent
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu
