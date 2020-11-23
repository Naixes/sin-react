import React, { useContext, useState } from 'react'
import classNames from 'classnames'

import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    style?: React.CSSProperties;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {
        className,
        style,
        children,
        title,
        index,
    } = props

    const context = useContext(MenuContext)
    const openedSubMenus = context.defaulteOpenSubMenus as Array<string>
    const isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [open, setOpen] = useState(isOpen)

    const classes = classNames('menu-item', 'submenu-item', className, {
        'is-opened': open,
        'is-active': context.index === index || context.index.split('-')[0] === index,
        'is-vertical': context.mode === 'vertical'
    })

    let timer:any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
          setOpen(toggle)
        }, 300)
    }
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!open)
    }
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)},
    } : {}
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('s-submenu', {
            'menu-opened': open
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            // 类型断言
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            }else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li className={classes} style={style} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>{title}</div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu