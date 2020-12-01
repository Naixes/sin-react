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

类型，type：primary，default，danger，link

大小，size：normal，small，large

禁用，disabled：true，false（注意link button）

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

jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})

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

> findDOMNode警告解决：
>
> From 4.4.0 release notes:
>
> > react-transition-group internally uses findDOMNode, which is deprecated and produces warnings in Strict Mode, so now you can optionally pass nodeRef to Transition and CSSTransition, it's a ref object that should point to the transitioning child:
>
> You can fix this like this
>
> ```
> import React from "react"
> import { CSSTransition } from "react-transition-group"
> 
> const MyComponent = () => {
>   const nodeRef = React.useRef(null)
>   return (
>     <CSSTransition nodeRef={nodeRef} in timeout={200} classNames="fade">
>       <div ref={nodeRef}>Fade</div>
>     </CSSTransition>
>   )
> }
> ```

animate.css可以用来查找动画效果

消失时display使动画失效，使用unmountOnExit属性

### Transition组件

transition冲突：提供一个空节点

```tsx
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
```

#### 样式

```scss
// _mixin.scss
// 动画
@mixin zoom-animation(
  $direction: 'top',
  $scaleStart: scaleY(0),
  $scaleEnd: scaleY(1),
  $origin: center top,
) {
  .zoom-in-#{$direction}-enter {
    opacity: 0;
    transform: $scaleStart;
  }
  .zoom-in-#{$direction}-enter-active {
    opacity: 1;
    transform: $scaleEnd;
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
    transform-origin: $origin
  }
  .zoom-in-#{$direction}-exit {
    opacity: 1;
  }
  .zoom-in-#{$direction}-exit-active {
    opacity: 0;
    transform: $scaleStart;
    transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms;
    transform-origin: $origin;
  }
}

// _animation.scss
@include zoom-animation('top', scaleY(0), scaleY(1), center top);
@include zoom-animation('left', scale(.45, .45), scale(1, 1), top left);
@include zoom-animation('right', scale(.45, .45), scale(1, 1), top right);
@include zoom-animation('bottom', scaleY(0), scaleY(1),  center bottom);

// menu_style.scss
.menu-horizontal {
    >.menu-item {
        border-bottom: $menu-item-active-border-width solid transparent;
    }
    .s-submenu {
        position: absolute;
        background: $white;
        z-index: 100;
        top: calc(100% + 8px);
        left: 0;
        border: $menu-border-width solid $menu-border-color;
        box-shadow: $submenu-box-shadow;
    }
    // 修改动画不正常bug
    .zoom-in-top-enter, .zoom-in-top-enter-active, .zoom-in-top-exit, .zoom-in-top-exit-active {
        position: absolute;
        top: 100%;
        left: 0;
    }
}
```

### Storybook

自动安装`npx sb init`

> 报错：弹框，脚本错误
>
> 解决参考：https://blog.csdn.net/weixin_43768107/article/details/107038953
>
> 进行手动安装：
>
> 1.全局安装Storybook
>
> ```js
> npm i -g storybook
> ```
>
> 2.执行以下命令安装@storybook/react
>
> ```js
> npm i --save-dev @storybook/react
> ```
>
> 3.在package.json文件中
>
> ```js
> {
>   "scripts": {
>     "storybook": "start-storybook -p 9009 -s public",
>     "build-storybook": "build-storybook -s public"
>   }
> ```
>
> 4.在工程根目录创建.storybook目录
>
> 5.在.storybook目录下创建config.js文件
>
> ```js
> import { configure, addDecorator } from '@storybook/react';
> configure(require.context('../src', true, /\.stories\.tsx$/), module)
> 12
> ```
>
> 6.自己创建以.stories.js结尾的文件
>
> 7.需要集成typescrip,则创建webpack.config.js文件在.storybook文件夹里
>
> ```js
> module.exports = ({ config }) => {
>     config.module.rules.push({
>       test: /\.tsx?$/,
>       use: [
>         {
>           loader: require.resolve("babel-loader"),
>           options: {
>             presets: [require.resolve("babel-preset-react-app")]
>           }
>         }
>       ]
>     });
>     config.resolve.extensions.push(".ts", ".tsx");
>   
>     return config;
>   };
> ```
>
> 8.安装其他依赖
>
> ```js
> npm i @storybook/addon-actions @storybook/addon-links @storybook/addons -D
> 1
> ```
>
> 9.@storybook/preset-create-react-app用来代表您配置Storybook。这是由Storybook在自动设置（Storybook 5.3或更高版本）期间安装的。
>
> ```js
> npm i --save-dev @storybook/preset-create-react-app
> ```

启动`npm run storybook`

#### 支持ts

参考：https://github.com/Luchanso/storybook-cra-ts-example/blob/master/.storybook/webpack.config.js

```js
// webpack.config
module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [require.resolve("babel-preset-react-app")]
        }
      },
      // 自动生成文档
      require.resolve("react-docgen-typescript-loader")
    ]
  });

  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
```

> config.js不支持tsx
>
> ```json
> // tsconfig.json
> {
>   "compilerOptions": {
>     "target": "es5",
>     "lib": [
>       "dom",
>       "dom.iterable",
>       "esnext"
>     ],
>     "allowJs": true,
>     "skipLibCheck": true,
>     "esModuleInterop": true,
>     "allowSyntheticDefaultImports": true,
>     "strict": true,
>     "forceConsistentCasingInFileNames": true,
>     "noFallthroughCasesInSwitch": true,
>     "module": "esnext",
>     "moduleResolution": "node",
>     "resolveJsonModule": true,
>     "isolatedModules": true,
>     "noEmit": true,
>     "jsx": "react"
>   },
>   "include": [
>     "src",
>     // 增加包含文件
>     ".storybook"
>   ]
> }
> 
> ```

#### 配置scss

删除webpack.config和config.tsx文件使用main.tsx进行配置

`npm i -D @storybook/preset-scss css-loader sass-loader style-loader`

```tsx
module.exports = {
    stories: ['../src/**/*.stories.tsx'],
    // ts：好像默认就支持
    // typescript: {
    //   check: false,
    //   checkOptions: {},
    //   reactDocgen: 'react-docgen-typescript',
    //   reactDocgenTypescriptOptions: {
    //     shouldExtractLiteralValuesFromEnum: true,
    //     propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    //   },
    // },
    addons: [
        // 官网scss配置，引入样式失败改为webpack配置的方式
        // {
        //     name: '@storybook/preset-scss',
        //     options: {
        //         cssLoaderOptions: {
        //             modules: true
        //         }
        //     }
        // },
        // You can add other presets/addons by using the string declaration
        '@storybook/addon-actions/register',
        '@storybook/preset-create-react-app'
    ],
    webpackFinal: async config => {
        // Edit default scss loader to exclude storybook specific scss files
        config.module.rules = config.module.rules.filter(rule => {
        if (rule.test instanceof RegExp && rule.test.test('.scss')) {
            rule.exclude = /\.(stories|story).s[ca]ss$/;
        }
        return rule;
        });

        config.module.rules.push({
        test: /\.(stories|story).s[ca]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
        });

        // Return the altered config
        return config;
    },
  }
```

#### button

三种不同的写法，经典写法storiesOf

```tsx
import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'

import Button from './button'

const defaultButton = () => (
    <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
    // 使用空节点会显示Unknown component
    <div>
        <Button size="lg">large button</Button>
        <Button size="sm">small button</Button>
    </div>
)

const buttonWithType = () => (
    <div>
        <Button btnType="primary">primary button</Button>
        <Button btnType="danger">danger button</Button>
        <Button btnType="link" href="www.baidu.com">link button</Button>
    </div>
)

storiesOf('Button Component', module)
.add('Button', defaultButton)
.add('不同尺寸的 Button', buttonWithSize)
.add('不同类型的 Button', buttonWithType)
```

#### 插件系统addons

两大类：装饰器（Decorators）和Native Addons

```tsx
// 在story中
...
const styles: React.CSSProperties = {
    textAlign: center,
}
// 创建decorator
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
...
// 添加decorator
storiesOf('Button Component', module)
	.addDecorator(CenterDecorator)
    .add('Button', defaultButton)
    .add('不同尺寸的 Button', buttonWithSize)
    .add('不同类型的 Button', buttonWithType)

// 在全局
import {addDecorator} from '@storybook/react'
...
const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>
addDecorator(CenterDecorator)
```

preview.js：全局配置

##### Info Addon

显示源代码，属性，添加描述信息等

`npm i -D @storybook/addon-info`

配置可以在三个维度进行修改：全局，story，case

```tsx
// 在story中
import {withInfo} from '@storybook/addon-info'
...
// 添加decorator
storiesOf('Button Component', module)
	.addDecorator(withInfo)
	.addParameters({
    	info: {
            // 增加描述，支持md
            text: 'this is a nice component',
            inline: true
        }
	})
    .add('Button', defaultButton)
	// 在case中
    .add('不同尺寸的 Button', buttonWithSize, {
    	info: {
            inline: false
        }
	})
    .add('不同类型的 Button', buttonWithType)
```

#### react-docgen

自动生成文档

- 分析参数，以表格显示
- 添加注释并显示在表格和介绍中

修改组件

- 需要直接引入模块不能使用React.xxx
- 使用export const Button...，不能只使用默认导出
- 组件最后要加一个分号;

配置loader

`npm i -D react-docgen-typescript-loader`

```tsx
// 配置react-docgen-typescript-loader
config.module.rules.push({
    test: /\.tsx?$/,
    include: path.resolve(__dirname, "../src"),
    use: [
        {
            loader: require.resolve("react-docgen-typescript-loader"),
            options: {
                // 从枚举中提取值即展开显示枚举
                shouldExtractLiteralValuesFromEnum: true,
                // 过滤属性
                propFilter: (prop) => {
                    if (prop.parent) {
                        return !prop.parent.fileName.includes('node_modules')
                    }
                    return true            
                }
            },
        },
    ],
});
```

#### 注释: JSDoc标准

例子：

`/** 注释 */`

```js
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
```

支持md

要显示组件中的注释，case名称要和组件名称一样

```tsx
...
interface BaseButtonProps {
    className?: string;
    /** 设置 Button 是否禁用 */
    disabled?: boolean;
    /** 设置 Button 大小 */
    size?: string;
    /** 设置 Button 类型 */
    btnType?: string;
    href?: string;
    children: ReactNode
}

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 * 
 * ~~~js
 * import { Button } from 'sin-react'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
...
```

#### 优化样式

```tsx
import React from 'react'
import {addDecorator, addParameters} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'

import '../src/styles/index.scss'

const wrapperStyle: React.CSSProperties = {
    padding: '20px 40px 0 40px'
}
const storyWrapper = (storyFn: any) => (
    <div style={wrapperStyle}>
        <h3>组件演示</h3>
        {storyFn()}
    </div>
)
addDecorator(storyWrapper)
addDecorator(withInfo)
addParameters({info: { inline: true, header: false}})

export const parameters = {
    // layout: 'centered',
};
```

### Input组件

#### 需求分析

大小：size

禁用：disabled

图标：icon

前缀后缀：prepend/append

自动补全，下拉菜单

#### 代码

```tsx
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
```

### AutoComplete组件

#### 需求分析

fetchSuggestions

onSelect

优化：

- custom options，自定义模板
- 异步请求
- keyboard support
- debounce

```tsx
import {useState, useEffect} from 'react'

function useDebounce(value: any, delay = 300) {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])
    return debounceValue
}

export default useDebounce
```

click outside

```tsx
import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if(!ref.current || ref.current.contains(e.target as HTMLElement)) {
                return
            }
            handler(e)
        }
        document.addEventListener('click', listener)  
        return () => {
            document.removeEventListener('click', listener)
        } 
    }, [ref, handler])
}

export default useClickOutside
```

#### 代码

```tsx
import React, { FC, ChangeEvent, useState, useEffect, ReactElement, KeyboardEvent, useRef } from 'react'
import classNames from 'classnames'

import Input from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/Transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceDefaultObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceDefaultObject

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    value?: string;
    /** 下拉数据获取函数 */ 
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选中下拉某一项的回调 */ 
    onSelect?: (item: DataSourceType) => void;
    /** 自定义渲染模板 */ 
    renderOption?: (item: DataSourceType) => ReactElement
}

/**
 * 输入框自动补全，根据输入值和自定义规则过滤数据并显示在下拉中，支持自定义模板，异步获取数据
 * ### 引用方法
 * 
 * ~~~js
 * import { AutoComplete } from 'sin-react'
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        value,
        fetchSuggestions,
        onSelect,
        renderOption,
        ...restProps
    } = props

    const [inputValue, setInputValue] = useState(value as string)
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [showDropDown, setShowDropDown] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)

    // 标记是否重新渲染下拉，选中时不需要重新渲染
    const triggerSearch = useRef(false)
    // 存储当前组件
    const componentRef = useRef<HTMLDivElement>(null)

    // 防抖
    const debounceValue = useDebounce(inputValue, 300)
    useClickOutside(componentRef, () => {setShowDropDown(false)})

    // 输入值改变时触发
    useEffect(() => {
        if(debounceValue && triggerSearch.current) {
            const results = fetchSuggestions(debounceValue)
            if(results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                    if(data.length > 0) {
                        setShowDropDown(true)
                    }
                })
            }else {
                setSuggestions(results)
                if(results.length > 0) {
                    setShowDropDown(true)
                }
            }
        }else {
            setShowDropDown(false)
        }
        setHighlightIndex(-1)
    }, [fetchSuggestions, debounceValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropDown(false)
        if(onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }

    const highlight = (index: number) => {
        if(index < 0) index = 0
        if(index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighlightIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            // 回车
            case 13:
                if(suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break;
            // 上
            case 38:
                highlight(highlightIndex - 1)
                break;
            // 下
            case 40:
                highlight(highlightIndex + 1)
                break;
            // esc
            case 27:
                break;
            default:
                break;
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropDown = () => {
        return (
            // showDropDown为false时清空下拉列表
            <Transition
              in={showDropDown || loading}
              animation="zoom-in-top"
              timeout={300}
              onExited={() => {setSuggestions([])}}
            >
                <ul className='s-suggestion-list'>
                    {loading && 
                        <div className='suggstions-loading-icon'>
                            <Icon icon='spinner' spin></Icon>
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        const classes = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li className={classes} key={index} onClick={() => {handleSelect(item)}}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>
        )
    }

    return (
        <div className='s-auto-complete' ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            ></Input>
            {generateDropDown()}
        </div>
    )
}

export default AutoComplete;
```

### Upload组件

#### 需求分析

- 流程分析：beforeUpload(file) --- onProgress(e.file) --- onChange(file) --- onSucess(file)/onError(error.file) --- onRemoved(file)

- 异步请求：axios

> fetch缺点：只对网络请求报错，400，500都算成功，默认不带cookie，不支持abort不支持超时控制，无法原生监测请求进度，需要封装

- 状态显示
- 进度条
- 丰富上传数据
  - 自定义header
  - 添加name属性（发送到后台的文件参数名称）
  - 添加data属性（额外参数）
  - 增加input本身约束属性（multiple，accept等）
  - 添加发送时是否携带cookie-withCredentials
- 丰富界面和交互
  - 自定义触发元素
  - 支持拖动上传
  - onPreview

#### 代码

使用mockServer（线上版本）：JSONPlaceholder，Mocky.io，和axios

> mockServer本地版本可以使用JSONServer

文件上传场景：

表单上传，需要增加属性`encType="multipart/form-data"`

js上传，选择后直接上传，formData模拟表单上传

```tsx
import axios from 'axios'
import React, { ChangeEvent, FC, useRef, useState } from 'react'

import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    type?: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    /** 设置 action */
    action: string;
    /** 设置默认文件列表 */
    defaultFileList?: UploadFile[];
    /** 上传前执行回调 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 上传中执行回调 */
    onProgress?: (percent: number, file: UploadFile) => void;
    /** 上传成功执行回调 */
    onSuccess?: (data: any, file: UploadFile) => void;
    /** 上传失败执行回调 */
    onError?: (err: any, file: UploadFile) => void;
    /** 上传完成执行回调 */
    onChange?: (file: UploadFile) => void;
    /** 删除文件执行回调 */
    onRemove?: (file: UploadFile) => void;
    /** 自定义上传 headers */
    headers?: {[key: string]: any};
    /** 设置上传时文件内容的 key */
    name?: string;
    /** 自定义上传 data */
    data?: {[key: string]: any};
    /** 设置是否携带 cookie */
    withCredentials?: boolean;
    /** 设置支持的文件格式 */
    accept?: string;
    /** 设置是否支持多文件上传 */
    multiple?: boolean;
    /** 设置是否拖拽上传 */
    drag?: boolean;
}

/**
 * 上传文件组件，包含完整的上传生命周期，进度条展示，支持多文件上传，拖拽上传
 * ### 引用方法
 * 
 * ~~~js
 * import { Upload } from 'sin-react'
 * ~~~
 */
export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        drag,
        children,
    } = props
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const fileInput = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        if(fileInput.current) {
            fileInput.current.click()
        }
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 获取文件
        const files = e.target.files
        if(!files) return 
        // 上传文件
        uploadFiles(files)
        if(fileInput.current) {
            fileInput.current.value = ''
        }
    }

    // 将File转换为UploadFile
    const transformFileToUploadFile = (file: File): UploadFile => {
        return {
            uid: Date.now() + 'upload-file',
            size: file.size,
            name: file.name,
            type: file.type,
            status: 'ready',
            raw: file,
            percent: 0,
        }
    }

    // 处理文件上传
    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files)
        postFiles.forEach(file => {
            // 修改file类型
            const _file: UploadFile = transformFileToUploadFile(file)
            if(!beforeUpload) {
                post(_file)
            }else {
                const result = beforeUpload(file)
                // 返回Promise
                if(result && result instanceof Promise) {
                    result.then(processFile => {
                        const _processFile: UploadFile = transformFileToUploadFile(processFile)
                        post(_processFile)
                    })
                }
                // 返回Boolean
                else if(result !== false) {
                    post(_file)
                }
            }
        })
    }

    // 根据部分属性更新FileList
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(preList => {
            return preList.map(file => {
                if(file.uid === updateFile.uid) {
                    return {...file, ...updateObj}
                }else {
                    return file
                }
            })
        })
    }

    // 上传文件
    const post = (file: UploadFile) => {
        // 更新文件列表
        setFileList(preList => {
            return [file, ...preList]
        })
        // 参数
        const formData = new FormData()
        formData.append(name || 'file', file.raw as File)
        // 增加自定义data
        if(data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                // Math.round：取整
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                console.log(percentage);
                
                if(percentage < 100) {
                    // 更新列表
                    updateFileList(file, {percent: percentage, status: 'uploading'})
                    // 触发生命周期onProgress
                    onProgress && onProgress(percentage, file)
                }
            }
        }).then(res => {
            console.log(res.data);
            
            updateFileList(file, {status: 'success', response: res.data})
            onSuccess && onSuccess(res.data, file)
            onChange && onChange(file)
        }).catch(err => {
            updateFileList(file, {status: 'error', error: err})
            onError && onError(err, file)
            onChange && onChange(file)
        })
    }

    // 删除文件
    const handleRemove = (file: UploadFile) => {
        setFileList(preList => {
            return preList.filter(f => f.uid !== file.uid)
        })
        onRemove && onRemove(file)
    }

    return (
        <div className="s-upload-component">
            <div 
                className="s-upload-input"
                style={{display: 'inline-block'}}
                onClick={handleClick}
            >
                {drag ? 
                    <Dragger onFile={files => {uploadFiles(files)}}>
                        {children}
                    </Dragger>:
                    children
                }
            </div>
            <input 
                className="s-file-input"
                ref={fileInput}
                type="file"
                style={{display: "none"}}
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
            />
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            ></UploadList>
        </div>
    )
}

export default Upload;
```

进度条

```tsx
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
```

拖拽上传

```tsx
import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'

export interface DraggerProps {
    onFile: (files: FileList) => void;
}

export const Dragger: FC<DraggerProps> = (props) => {
    const {
        onFile,
        children,
    } = props

    const [dragOver, setDrageOver] = useState(false)

    const classes = classNames('s-uploader-dragger', {
        'is-dragover': dragOver
    })

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDrageOver(false)
        onFile(e.dataTransfer.files)
    }

    const handleDrge = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDrageOver(over)
    }

    return (
        <div
            className={classes}
            onDragOver={e => {handleDrge(e, true)}}
            onDragLeave={e => {handleDrge(e, false)}}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger;
```

#### 测试

##### 异步请求测试

jest.mock(axios)

##### 拖拽测试

```tsx
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import { render, RenderResult, fireEvent, waitFor, createEvent } from '@testing-library/react'

import { Upload, UploadFile, UploadProps } from './upload'

jest.mock('../Icon/icon', () => {
  return ({icon, onClick}) => {
    return <span onClick={onClick}>{icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const newFile = new File(['xyz'], 'test.png', {type: 'image/png'})
const testFile: Partial<UploadFile> = {
  size: newFile.size,
  name: newFile.name,
  type: newFile.type,
  status: 'ready',
  raw: newFile,
  percent: 0,
}
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector('.s-file-input')
    uploadArea = wrapper.queryByText('Click to upload')
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
  })

  it('upload process should works fine', async () => {
    const { queryByText } = wrapper
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, {target: {files: [newFile]}})
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining(testFile))
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining(testFile))

    //remove the uploaded file
    expect(queryByText('times')).toBeInTheDocument()
    fireEvent.click(queryByText('times'))
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: newFile,
      status: 'success',
      name: 'test.png'
    }))
  })

  it('drag and drop files should works fine', async () => {
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-dragover')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-dragover')
    // 给事件对象添加 dataTransfer 属性
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [newFile]
      }
    })
    fireEvent(uploadArea, mockDropEvent)

    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining(testFile))
  })
})
```

