import React, { FC, ChangeEvent, useState, useEffect, ReactElement, KeyboardEvent, useRef } from 'react'
import classNames from 'classnames'

import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
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