import React, {FC} from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
export interface IconProps extends FontAwesomeIconProps {
    /** 设置图标主题颜色 */
    theme?: ThemeProps
}

/**
 * 基于 FontAwesomeIcon 实现的图标组件，可设置主题颜色
 * ### 引用方法
 * 
 * ~~~js
 * import { Icon } from 'sin-react'
 * ~~~
 * 支持 FontAwesomeIcon 的所有基本属性
 */
export const Icon: FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props
    const classes = classNames('s-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
    )
}

export default Icon;