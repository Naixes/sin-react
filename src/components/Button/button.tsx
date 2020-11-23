import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: string;
    btnType?: string;
    href?: string;
    children: React.ReactNode
}

// 增加原生属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
// ts提供的Partial：将所有属性变为可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
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
        'disabled': btnType === ButtonType.Link && disabled
    })

    // 链接按钮
    if(btnType === ButtonType.Link && href) {
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
    btnType: ButtonType.Default
}

export default Button