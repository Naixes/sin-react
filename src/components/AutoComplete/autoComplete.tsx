import React, { FC, ChangeEvent, useState, useEffect, ReactElement } from 'react'
import classNames from 'classnames'

import Input from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import { render } from 'react-dom'

interface DataSourceDefaultObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceDefaultObject

export interface AutoCompleteProps {
    value?: string;
    /** 下拉数据获取函数 */ 
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 选中下拉某一项的回调 */ 
    onSelect?: (item: DataSourceType) => void;
    /** 自定义渲染模板 */ 
    renderOption?: (item: DataSourceType) => ReactElement
}

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
    const [suggestions, setSuggestion] = useState<DataSourceType[]>([])
    const [showDropDown, setShowDropDown] = useState(false)

    // 防抖
    const debounceValue = useDebounce(inputValue, 300)

    useEffect(() => {
        const results = fetchSuggestions(debounceValue)
        if(results instanceof Promise) {
            setLoading(true)
            results.then(data => {
                setLoading(false)
                if(data.length > 0) {
                    setShowDropDown(true)
                }
            })
        }else {
            setSuggestion(results)
            if(results.length > 0) {
                setShowDropDown(true)
            }
        }
    }, [fetchSuggestions, debounceValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropDown(false)
        if(onSelect) {
            onSelect(item)
        }
    }

    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }

    const generateDropDown = () => {
        return (
            <ul className='s-suggestion-list'>
                {loading && 
                    <div className='suggstions-loading-icon'>
                        <Icon icon='spinner' spin></Icon>
                    </div>
                }
                {suggestions.map((item, index) => {
                    return (
                        <li key={index} onClick={() => {handleSelect(item)}}>
                            {renderTemplate(item)}
                        </li>
                    )
                })}
            </ul>
        )
    }

    return (
        <div className='s-auto-complete'>
            <Input
                value={inputValue}
                onChange={handleChange}
                {...restProps}
            ></Input>
            {generateDropDown()}
        </div>
    )
}

export default AutoComplete;