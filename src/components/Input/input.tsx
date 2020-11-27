import React, { ChangeEvent, FC, InputHTMLAttributes, ReactElement } from 'react'
import classNames from 'classnames'
import {IconProp} from '@fortawesome/fontawesome-svg-core'

import Icon from '../Icon/Icon'

type InputSize = 'lg' | 'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    className?: string;
    /** 设置 Input 是否禁用 */
    disabled?: boolean;
    /** 设置 Input 大小 */
    size?: InputSize;
    /** 添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /** 添加前缀， 用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /** 添加后缀， 用于配置一些固定组合 */
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

/**
 * 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装
 * ### 引用方法
 * 
 * ~~~js
 * import { Input } from 'sin-react'
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = (props) => {
    const {
        size,
        disabled,
        icon,
        prepend,
        append,
        onChange,
        ...restProps
    } = props

    const classes = classNames('s-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-prepend': !!prepend,
        'input-group-append': !!append,
    })

    // 修改受控组件的bug
    // 2.value从undefined修改为有意义的值会报警告
    const fixControledValue = (value: any) => {
        if(typeof value === 'undefined' || value === null) {
            return ''
        }else {
            return value
        }
    }
    if('value' in props) {
        // 1.defaultValue和value不能同时存在
        delete restProps.defaultValue
        restProps.value = fixControledValue(props.value)
    }

    return (
        <div className={classes}>
            {prepend && <div className='s-input-group-prepend'>{prepend}</div>}
            {
                icon && 
                <div className='icon-wrapper'>
                    <Icon icon={icon} title={`title-${icon}`}></Icon>
                </div>
            }
            <input
                className='s-input-inner'
                disabled={disabled}
                {...restProps}
                type="text"
            />
            {append && <div className='s-input-group-append'>{append}</div>}
        </div>
    )
}

export default Input;