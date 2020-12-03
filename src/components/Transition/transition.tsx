import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

// 报错
// interface TransitionProps extends CSSTransitionProps {
//   animation?: AnimationName,
//   wrapper? : boolean,
// }
// type TransitionProps = CSSTransitionProps & { animation?: AnimationName, wrapper?: boolean }
type TransitionProps = CSSTransitionProps & { animation?: AnimationName}

const Transition: React.FC<TransitionProps> = (props) => {
    const {
        children,
        classNames,
        animation,
        wrapper,
        ...restProps
    } = props

    // 解决findDOMNode警告
    const nodeRef = React.useRef(null)
    return (
        <CSSTransition
            nodeRef={nodeRef}
            classNames = { classNames ? classNames : animation}
            {...restProps}
        >
            <div ref={nodeRef}>{children}</div>
            {/* {wrapper ? <div>{children}</div> : children} */}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
}

export default Transition
