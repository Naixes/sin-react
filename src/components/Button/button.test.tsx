import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import Button, {ButtonProps, ButtonSize, ButtonType} from './button'

// test('first test', () => {
//     const wrapper = render(<Button>test</Button>)
//     const element = wrapper.queryByText('test')
//     // jest提供
//     expect(element).toBeTruthy()
//     // jest-dom提供
//     expect(element).toBeInTheDocument()
// })

const defalutProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'test-class'
}

const linkProps: ButtonProps = {
    btnType: ButtonType.Link,
    href: 'http://testurl'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

// 分组
describe('test Button component', () => {
    // it和test相同
    it('should render the correct refault button', () => {
        const wrapper = render(<Button {...defalutProps}>testText</Button>)
        // getByText（返回HTMLElement）和queryByText（返回HTMLElement|null）只是返回的不一样
        const element = wrapper.getByText('testText') as HTMLButtonElement
        // 存在
        expect(element).toBeInTheDocument()
        // button
        expect(element.tagName).toEqual('BUTTON')
        // className
        expect(element).toHaveClass('btn btn-default')
        // 可用
        expect(element.disabled).toBeFalsy()
        // click
        fireEvent.click(element)
        expect(defalutProps.onClick).toHaveBeenCalled()
    })
    it('should render the correct component base on different props', () => {
        const wrapper = render(<Button {...testProps}>testText</Button>)
        const element = wrapper.getByText('testText')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-primary btn-lg test-class')
    })
    it('should render a link when btnType equals link and href is provided', () => {
        const wrapper = render(<Button {...linkProps}>link</Button>)
        const element = wrapper.getByText('link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('should render a disabled button when disabled to be true', () => {
        const wrapper = render(<Button {...disabledProps}>disabled</Button>)
        const element = wrapper.getByText('disabled') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(defalutProps.onClick).not.toHaveBeenCalled()
    })
})