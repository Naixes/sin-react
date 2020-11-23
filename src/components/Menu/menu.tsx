import React, { createContext, useState } from 'react'
import classNames from 'classnames'

import { MenuItemProps } from './menuItem'

type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
    mode?: MenuMode;
    defaultIndex?: string;
    defaulteOpenSubMenus?: string[];
    className?: string;
    style?: React.CSSProperties;
    onSelect?: (selectIndex: string) => void;
}

interface IMenuContext {
    index: string;
    mode?: string;
    defaulteOpenSubMenus?: string[];
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
        defaulteOpenSubMenus,
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
        defaulteOpenSubMenus,
        onSelect: handleClick
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem' || childElement.type.displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            }else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaulteOpenSubMenus: []
}

export default Menu