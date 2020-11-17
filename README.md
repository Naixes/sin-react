This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

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

