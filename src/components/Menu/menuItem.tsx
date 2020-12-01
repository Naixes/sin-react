import React, { useContext, FC, CSSProperties } from 'react'
import classNames from 'classnames'

import { MenuContext } from './menu'

export interface MenuItemProps {
    index?: string;
    /** 设置 menu 禁用 */
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
    const {
        className,
        style,
        children,
        index,
        disabled,
    } = props

    const context = useContext(MenuContext)

    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    })

    const handleClick = () => {
        if(!disabled && context.onSelect && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem;