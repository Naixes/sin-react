import React from 'react'
import {fireEvent, render, RenderResult, waitFor} from '@testing-library/react'

import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps:MenuProps = {
    defaultIndex: '0',
    className: 'test',
    onSelect: jest.fn()
}

const generateMenu = (props: MenuProps) => {
 return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>click</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>dropItem</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>openedItem</MenuItem>
      </SubMenu>
    </Menu>
 )
}

const createStyleFile = () => {
    const cssFile: string = `
        .s-submenu {
            display: none;
        }
        .s-submenu.menu-opened {
          display:block;
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('test menu component in default/horazontal mode', () => {
    beforeEach(() => {
        // 获取元素
        wrapper = render(generateMenu(testProps))
        // 添加测试样式
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    
    it('shuold render correct menu with default props', () => {
        // 存在
        expect(menuElement).toBeInTheDocument()
        // 基础样式
        expect(menuElement).toHaveClass('s-menu test')
        // 数量
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        // 选中
        expect(activeElement).toHaveClass('menu-item is-active')
        // 禁用
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })

    it('click item shuold change active and call the correct callback', () => {
        const clickItem = wrapper.getByText('click')
        // 点击
        fireEvent.click(clickItem)
        expect(clickItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        // 点击禁用
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    
    it('shuold show the dropdown items when hover on subMenu', async() => {
        const dropdownItems = wrapper.queryByText('dropItem')
        // 样式测试
        expect(dropdownItems).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        // 异步测试
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(() => {
            expect(dropdownItems).toBeVisible()
        })
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
            expect(dropdownItems).not.toBeVisible()
        })
    })
});

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenus: ['4']
}
let wrapperVer: RenderResult
describe('test menu component in vertical mode', () => {
    beforeEach(() => {
        wrapperVer = render(generateMenu(testVerProps))
        wrapperVer.container.append(createStyleFile())
    })
    it('shuold render vertical menu in vertical mode', () => {
        const menuElement = wrapperVer.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('shuold show dropdowm items when click on subMenu', () => {
        const dropElement = wrapperVer.getByText('dropItem')
        expect(dropElement).not.toBeVisible()
        fireEvent.click(wrapperVer.getByText('dropdown'))
        expect(dropElement).toBeVisible()
    })
    it('shuold show dropdowm when defaultOpenSubMenus contain SubMenu index', () => {
        expect(wrapperVer.queryByText('openedItem')).toBeVisible()
    })
})
