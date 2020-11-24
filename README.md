This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 组件库通用原则

### 标准性

所有组件遵循统一标准

### 独立性

- 单一职责原则，保持组件的纯粹性
- 属性配置API对外开放，内部状态对外封闭，少于业务耦合

### 复用与易用

- UI差异，消化在组件内部（注意并不是写一堆if/else）
- 输入输出友好

### 适用spot法则

不要重复代码

### 避免暴露组件内部实现

### 避免直接操作dom避免使用ref

使用父组件的state控制子组件而不是ref

### 入口处检查参数有效性，出口处检查返回正确性

### 无环依赖原则（ADP）

### 稳定抽象原则（SAP）

组件的抽象程度与稳定程度成正比，要针对抽象组件编程而不是针对业务实现编程

### 避免冗余状态

- 如果一个数据可以由一个state得到那他就不是一个state，写一个函数即可，参考计算属性
- 如果一个数据是固定的，写死或作为全局配置，不属于state
- 如果兄弟拥有同样的state，应该放到更高的层级，使用props传递

### 合理的依赖关系

父组件不依赖子组件，删除子组件不会造成功能异常

### 扁平化参数

尽量只接受原始类型的值

### 良好的接口设计

- 把组件内部可以完成的工作做到极致，拥抱变化但是接口不是越多越好
- 如果常量变为props能应用更对场景，那么就作为props，常量作为默认值
- 如果需要为了某一个使用者编写大量特定代码那么可以通过扩展等方式构建一个新的组件
- 保证组件的属性和事件足够的给大多数组件使用

### API尽量和已知观念一致

## 开发日志

构建项目

代码规范

### 样式解决方案

- inline css：使用类名比 inline css 在性能上要好

- css in js：60多种方案，styled component是其中一种

- sass/less（本项目使用）

  安装node-sass

#### 样式系统文件结构

- styles：全局样式，包含以下内容
  - \_variables.scss：变量及可配置设置
  - \_mixins.scss
  - \_functions.scss：计算并返回值

- components/Button/style.scss：组件单独样式

#### 色彩体系

- 系统色板 - 基础色板（自然颜色定义） + 中性色板（黑白灰）

- 产品色板 - 品牌色 + 功能色（成功，失败等）

```scss
// _variables.scss
// 色彩系统=================================================

// 中性色板，default：支持用户自定义
$white:    #fff !default;
$gray-100: #f8f9fa !default;
$gray-200: #e9ecef !default;
$gray-300: #dee2e6 !default;
$gray-400: #ced4da !default;
$gray-500: #adb5bd !default;
$gray-600: #6c757d !default;
$gray-700: #495057 !default;
$gray-800: #343a40 !default;
$gray-900: #212529 !default;
$black:    #000 !default;

// 基础色板
$blue:    #0d6efd !default;
$indigo:  #6610f2 !default;
$purple:  #6f42c1 !default;
$pink:    #d63384 !default;
$red:     #dc3545 !default;
$orange:  #fd7e14 !default;
$yellow:  #fadb14 !default;
$green:   #52c41a !default;
$teal:    #20c997 !default;
$cyan:    #17a2b8 !default;

// 系统色板
// 品牌色板
$primary:       $blue !default;
$secondary:     $gray-600 !default;
// 功能色板
$success:       $green !default;
$info:          $cyan !default;
$warning:       $yellow !default;
$danger:        $red !default;
$light:         $gray-100 !default;
$dark:          $gray-800 !default;
```

#### 样式变量分类

- 基础色彩系统
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置开关

```scss
// 字体系统=================================================

// 字体家族
// 无饰线字体
$font-family-sans-serif:      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;
// 等宽字体
$font-family-monospace:       SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !default;
$font-family-base:            $font-family-sans-serif !default;

// 字体大小
// rem是相对单位，基于绝对单位px，r指root，基于根元素（html元素）字体大小
// em是相对单位，基于绝对单位px，基于父元素的字体大小
$font-size-base:              1rem !default; // Assumes the browser default, typically `16px`
$font-size-lg:                $font-size-base * 1.25 !default;
$font-size-sm:                $font-size-base * .875 !default;
$font-size-root:              null !default;

// 字重
$font-weight-lighter:         lighter !default;
$font-weight-light:           300 !default;
$font-weight-normal:          400 !default;
$font-weight-bold:            700 !default;
$font-weight-bolder:          bolder !default;
$font-weight-base:            $font-weight-normal !default;

// 行高
$line-height-base:            1.5 !default;
$line-height-lg:              2 !default;
$line-height-sm:              1.25 !default;

// 标题大小
$h1-font-size:                $font-size-base * 2.5 !default;
$h2-font-size:                $font-size-base * 2 !default;
$h3-font-size:                $font-size-base * 1.75 !default;
$h4-font-size:                $font-size-base * 1.5 !default;
$h5-font-size:                $font-size-base * 1.25 !default;
$h6-font-size:                $font-size-base !default;

// 链接
$link-color:                              $primary !default;
$link-decoration:                         none !default;
// darken：sass内置函数，使颜色变暗
$link-hover-color:                        darken($link-color, 15%) !default;
$link-hover-decoration:                   underline !default;

// body
$body-bg:                   $white !default;
$body-color:                $gray-900 !default;
$body-text-align:           null !default;

// Spacing
$spacer: 1rem !default;

$headings-margin-bottom:      $spacer / 2 !default;
$headings-font-family:        null !default;
$headings-font-style:         null !default;
$headings-font-weight:        500 !default;
$headings-line-height:        1.2 !default;
$headings-color:              null !default;

// Paragraphs
$paragraph-margin-bottom:   1rem !default;

// 字体其他部分 heading list hr 等等
$headings-margin-bottom:      $spacer / 2 !default;
$headings-font-family:        null !default;
$headings-font-style:         null !default;
$headings-font-weight:        500 !default;
$headings-line-height:        1.2 !default;
$headings-color:              null !default;

$display1-size:               6rem !default;
$display2-size:               5.5rem !default;
$display3-size:               4.5rem !default;
$display4-size:               3.5rem !default;

$display1-weight:             300 !default;
$display2-weight:             300 !default;
$display3-weight:             300 !default;
$display4-weight:             300 !default;
$display-line-height:         $headings-line-height !default;

$lead-font-size:              $font-size-base * 1.25 !default;
$lead-font-weight:            300 !default;

$small-font-size:             .875em !default;

$sub-sup-font-size:           .75em !default;

$text-muted:                  $gray-600 !default;

$initialism-font-size:        $small-font-size !default;

$blockquote-small-color:      $gray-600 !default;
$blockquote-small-font-size:  $small-font-size !default;
$blockquote-font-size:        $font-size-base * 1.25 !default;

$hr-color:                    inherit !default;
$hr-height:                   1px !default;
$hr-opacity:                  .25 !default;

$legend-margin-bottom:        .5rem !default;
$legend-font-size:            1.5rem !default;
$legend-font-weight:          null !default;

$mark-padding:                .2em !default;

$dt-font-weight:              $font-weight-bold !default;

$nested-kbd-font-weight:      $font-weight-bold !default;

$list-inline-padding:         .5rem !default;

$mark-bg:                     #fcf8e3 !default;

$hr-margin-y:                 $spacer !default;

// Code
$code-font-size:                    $small-font-size !default;
$code-color:                        $pink !default;
$pre-color:                         null !default;

// options 可配置选项
$enable-pointer-cursor-for-buttons:           true !default;

// 边框 和 border radius
$border-width:                1px !default;
$border-color:                $gray-300 !default;

$border-radius:               .25rem !default;
$border-radius-lg:            .3rem !default;
$border-radius-sm:            .2rem !default;

// 不同类型的 box shadow
$box-shadow-sm:               0 .125rem .25rem rgba($black, .075) !default;
$box-shadow:                  0 .5rem 1rem rgba($black, .15) !default;
$box-shadow-lg:               0 1rem 3rem rgba($black, .175) !default;
$box-shadow-inset:            inset 0 1px 2px rgba($black, .075) !default;

// 按钮
// 按钮基本属性
$btn-font-weight:             400;
$btn-padding-y:               .375rem !default;
$btn-padding-x:               .75rem !default;
$btn-font-family:             $font-family-base !default;
$btn-font-size:               $font-size-base !default;
$btn-line-height:             $line-height-base !default;

//不同大小按钮的 padding 和 font size
$btn-padding-y-sm:            .25rem !default;
$btn-padding-x-sm:            .5rem !default;
$btn-font-size-sm:            $font-size-sm !default;

$btn-padding-y-lg:            .5rem !default;
$btn-padding-x-lg:            1rem !default;
$btn-font-size-lg:            $font-size-lg !default;

// 按钮边框
$btn-border-width:            $border-width !default;

// 按钮其他
$btn-box-shadow:              inset 0 1px 0 rgba($white, .15), 0 1px 1px rgba($black, .075) !default;
$btn-disabled-opacity:        .65 !default;

// 链接按钮
$btn-link-color:              $link-color !default;
$btn-link-hover-color:        $link-hover-color !default;
$btn-link-disabled-color:     $gray-600 !default;


// 按钮 radius
$btn-border-radius:           $border-radius !default;
$btn-border-radius-lg:        $border-radius-lg !default;
$btn-border-radius-sm:        $border-radius-sm !default;

$btn-transition:              color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out !default;

// menu
$menu-border-width:            $border-width !default;
$menu-border-color:            $border-color !default;
$menu-box-shadow:              inset 0 1px 0 rgba($white, .15), 0 1px 1px rgba($black, .075) !default;
$menu-transition:              color .15s ease-in-out, border-color .15s ease-in-out !default;

// menu-item
$menu-item-padding-y:          .5rem !default;
$menu-item-padding-x:          1rem !default;
$menu-item-active-color:       $primary !default;
$menu-item-active-border-width: 2px !default;
$menu-item-disabled-color:     $gray-600 !default;

//sub-menu
//submenu
$submenu-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);

//input
$input-padding-y:                       $btn-padding-y !default;
$input-padding-x:                       $btn-padding-x !default;
$input-font-family:                     $btn-font-family !default;
$input-font-size:                       $btn-font-size !default;
$input-font-weight:                     $font-weight-base !default;
$input-line-height:                     $btn-line-height !default;

$input-padding-y-sm:                    $btn-padding-y-sm !default;
$input-padding-x-sm:                    $btn-padding-x-sm !default;
$input-font-size-sm:                    $btn-font-size-sm !default;

$input-padding-y-lg:                    $btn-padding-y-lg !default;
$input-padding-x-lg:                    $btn-padding-x-lg !default;
$input-font-size-lg:                    $btn-font-size-lg !default;

$input-bg:                              $white !default;
$input-disabled-bg:                     $gray-200 !default;
$input-disabled-border-color:           null !default;

$input-color:                           $gray-700 !default;
$input-border-color:                    $gray-400 !default;
$input-border-width:                    $border-width !default;
$input-box-shadow:                      $box-shadow-inset !default;

$input-border-radius:                   $border-radius !default;
$input-border-radius-lg:                $border-radius-lg !default;
$input-border-radius-sm:                $border-radius-sm !default;

$input-focus-bg:                        $input-bg !default;
$input-focus-border-color:              lighten($primary, 25%) !default;
$input-focus-width:                     .2rem !default;
$input-focus-color:                     $input-color !default;
$input-focus-shadow-color:              rgba($primary, .25) !default;
$input-focus-box-shadow:                0 0 0 $input-focus-width $input-focus-shadow-color !default;

$input-placeholder-color:               $gray-600 !default;
$input-plaintext-color:                 $body-color !default;

$input-height-border:                   $input-border-width * 2 !default;


$input-transition:                      border-color .3s ease-in-out, box-shadow .3s ease-in-out !default;

$input-group-addon-color:               $input-color !default;
$input-group-addon-bg:                  $gray-200 !default;
$input-group-addon-border-color:        $input-border-color !default;

// Progress bars
$progress-font-size:                $font-size-base * .75 !default;
$progress-bg:                       $gray-200 !default;
$progress-border-radius:            $border-radius !default;
$progress-bar-color:                $white !default;
$progress-bar-transition:           width .6s ease !default;
```

#### normalize.css

使样式在各种浏览器中表现一致，见`_reboot.scss`，基于normalize修改而成

```scss
// config
// @import：sass提供，不同于css的import，直接将文件包含进来不会有额外的请求
// 导入时不需要_，sass不会将_文件编译到css文件，只能当作模块导入不能单独编译或使用
@import "variables";

//layout
@import "reboot";

...
```

### Button组件

#### 需求分析

type：primary，default，danger，link

size：normal，small，large

disabled：true，false（注意link button）

原生属性的支持

#### 工具

npm i classnames --save

npm i @types/classnames --save

#### 代码

```tsx
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
```

### 组件测试

#### Jest-通用测试框架

cra默认测试框架，断言库

`npx jest xxx.js`

#### react测试工具

将react组件挂载到测试用例上，官方test utilities复杂难用，封装后enzyme（链式语法），react testing library（cra3.3.0以上内置）

#### jest-dom工具

新增了一些关于dom的断言（cra3.3.0以上内置）

```tsx
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
```

### Menu组件

#### 需求分析

横/纵向

下拉菜单/展开

高亮

禁用

- MenuProps
  - mode
  - activeIndex
  - onSelect：点击回调
  - className

- MenuItem
  - index
  - disabled
  - className

#### 代码

字符串字面量：`type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'`可以用来替代枚举

#### 判断子组件类型

##### 不要使用children.map

因为props.children可能是任何类型

使用React.Children.map/React.Children.forEach

`React.Children.map(children, (child, index) => {})`类型为ReactNode

##### displayName

FC内置静态属性：displayName可以用来判断类型

#### 给子组件添加index

React.cloneElement

```tsx
// subMenu.tsx
import React, { useContext, useState } from 'react'
import classNames from 'classnames'

import { MenuItemProps } from './menuItem'
import { MenuContext } from './menu'

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    style?: React.CSSProperties;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {
        className,
        style,
        children,
        title,
        index,
    } = props

    const context = useContext(MenuContext)
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
    const [open, setOpen] = useState(isOpen)

    const classes = classNames('menu-item', 'submenu-item', className, {
        'is-opened': open,
        'is-active': context.index === index || context.index.split('-')[0] === index,
        'is-vertical': context.mode === 'vertical'
    })

    let timer:any
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
          setOpen(toggle)
        }, 300)
    }
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!open)
    }
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)},
    } : {}
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('s-submenu', {
            'menu-opened': open
        })
        const childrenComponent = React.Children.map(children, (child, i) => {
            // 类型断言
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            // 判断子组件类型
            if(childElement.type.displayName === 'MenuItem') {
                // 给子组件添加index
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            }else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li className={classes} style={style} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>{title}</div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
```

#### subMenu

`:scope`伪类选择器：确定层级

#### 测试

##### 测试样式

先引入测试样式

##### 测试异步代码

```tsx
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
```

### Icon组件

#### 图标解决方案

雪碧图：不能缩放，不能css控制

字体图标：控制字体属性，下载字体文件，各种奇怪的bug（显示方块等）

svg：完全可控，即取即用

#### `react-fontawesome`库

支持svg

```
npm i --save @fortawesome/fontawesome-svg-core \
             @fortawesome/free-solid-svg-icons \
             @fortawesome/react-fontawesome
```

#### 样式循环

```scss
// _variables.scss
$theme-colors: 
(
  "primary":    $primary,
  "secondary":  $secondary,
  "success":    $success,
  "info":       $info,
  "warning":    $warning,
  "danger":     $danger,
  "light":      $light,
  "dark":       $dark
);
// _style.scss
@each $key, $val in $theme-colors {
    .icon-#{$key} {
      color: $val;
    }
  }
```

#### 代码

```tsx
import React from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'
export interface IconProps extends FontAwesomeIconProps {
    theme?: string
}

const Icon: React.FC<IconProps> = (props) => {
    const { className, theme, ...restProps } = props
    const classes = classNames('s-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
    )
}

export default Icon

// 使用
<Icon theme='primary' icon='angle-double-down'></Icon>
```

#### 动画animation

##### css

问题：display会让动画效果失效，只使用opacity不符合需求

##### `react-transition-group`库

animate.css可以用来查找动画效果

消失时display使动画失效

### Transition组件

transition冲突：提供一个空节点