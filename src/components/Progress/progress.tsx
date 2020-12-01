import React, { CSSProperties, FC } from 'react'

import {ThemeProps} from '../Icon/icon'

export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    theme?: ThemeProps;
    styles?: CSSProperties
}

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