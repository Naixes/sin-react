import React, {ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, FC} from 'react'
import classNames from 'classnames'


export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

// export enum ButtonSize {
//     Large = 'lg',
//     Small = 'sm'
// }

// export enum ButtonType {
//     Primary = 'primary',
//     Default = 'default',
//     Danger = 'danger',
//     Link = 'link'
// }

interface BaseButtonProps {
    className?: string;
    /** 设置 Button 是否禁用 */
    disabled?: boolean;
    /** 设置 Button 大小 */
    size?: ButtonSize;
    /** 设置 Button 类型 */
    btnType?: ButtonType;
    href?: string;
    children: ReactNode
}

// 增加原生属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
// ts提供的Partial：将所有属性变为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

// storybook的bug必须加export
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'sin-react'
 * ~~~
 * 支持 ButtonHTMLAttributes/AnchorHTMLAttributes 的所有基本属性
 */
export const Button: FC<ButtonProps> = (props) => {
    const {
        // 用户自定义的class
        className,
        disabled,
        size,
        btnType,
        href,
        children,
        ...restProps
    } = props
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        // button有自己原生的disabled属性
        'disabled': btnType === 'link' && disabled
    })

    // 链接按钮
    if(btnType === 'link' && href) {
        return (
            <a 
                className={classes} 
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    }else {
        return (
            <button 
                className={classes} 
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

// storybook的bug必须加;
export default Button;