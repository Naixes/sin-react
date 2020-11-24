import React, { createContext, useState } from 'react'
import classNames from 'classnames'

import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
    mode?: MenuMode;
    defaultIndex?: string;
    defaultOpenSubMenus?: string[];
    className?: string;
    style?: React.CSSProperties;
    onSelect?: (selectIndex: string) => void;
}

interface IMenuContext {
    index: string;
    mode?: string;
    defaultOpenSubMenus?: string[];
    onSelect?: (selectIndex: string) => void;
}

export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
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
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            // 判断子组件类型
            if(childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
                // 给子组件添加index
                return React.cloneElement(childElement, {
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

export default Menu