import React, { CSSProperties, FC } from 'react'

import {ThemeProps} from '../Icon/icon'

export interface ProgressProps {
    /** 设置 Progress 当前进度 */ 
    percent: number;
    /** 设置 Progress 高度 */ 
    strokeHeight?: number;
    /** 设置 Progress 是否显示当前进度 */ 
    showText?: boolean;
    /** 设置 Progress 主题 */ 
    theme?: ThemeProps;
    styles?: CSSProperties
}

/**
 * 进度条，可自定义样式
 * ### 引用方法
 * 
 * ~~~js
 * import { Progress } from 'sin-react'
 * ~~~
 */
export const Progress: FC<ProgressProps> = (props) => {
    const {
        percent,
        strokeHeight,
        showText,
        theme,
        styles,
    } = props

    return (
        <div className="s-progress-bar" style={styles}>
            <div className="s-progress-bar-outer" style={{ height: `${strokeHeight}px`}}>
                <div className={`s-progress-bar-inner color-${theme}`} style={{width: `${percent}%`}}>
                    {showText && <span className="inner-text">{`${percent}%`}</span>}
                </div>
            </div>
        </div>
    )
}

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
}

export default Progress;