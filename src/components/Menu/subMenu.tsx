import React, { useContext, useState, FC, CSSProperties } from 'react'
import classNames from 'classnames'

import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'

export interface SubMenuProps {
    index?: string;
    /** 设置可展开菜单标题 */
    title: string;
    className?: string;
    style?: CSSProperties;
}

export const SubMenu: FC<SubMenuProps> = (props) => {
    const {
        className,
        style,
        children,
        title,
        index,
    } = props

    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
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
            // 判断子组件类型
            if(childElement.type.displayName === 'MenuItem') {
                // 给子组件添加index
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            }else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <Transition 
                in={open}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }

    return (
        <li className={classes} style={style} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon"/>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu;