import React, { createContext, useState, CSSProperties, FC, Children, FunctionComponentElement, cloneElement } from 'react'
import classNames from 'classnames'

import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
    /** 设置 menu 模式 */
    mode?: MenuMode;
    /** 设置默认选中 */
    defaultIndex?: string;
    /** 设置默认展开 */
    defaultOpenSubMenus?: string[];
    className?: string;
    style?: CSSProperties;
    /** 选中执行回调 */
    onSelect?: (selectIndex: string) => void;
}

interface IMenuContext {
    index: string;
    mode?: string;
    defaultOpenSubMenus?: string[];
    onSelect?: (selectIndex: string) => void;
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

export const Menu: FC<MenuProps> = (props) => {
    const {
        className,
        style,
        children,
        mode,
        defaultIndex,
        defaultOpenSubMenus,
        onSelect,
    } = props

    const [active, setActive] = useState(defaultIndex)

    const classes = classNames('s-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index: string) => {
        setActive(index)
        onSelect && onSelect(index)
    }

    const passedContext:IMenuContext = {
        index: active ? active : '0',
        mode,
        defaultOpenSubMenus,
        onSelect: handleClick
    }

    const renderChildren = () => {
        return Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            // 判断子组件类型
            if(childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
                // 给子组件添加index
                return cloneElement(childElement, {
                    index: index.toString()
                })
            }else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    return (
        // data-testid：方便测试
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu;