import React, { FC, ChangeEvent, useState, useEffect } from 'react'
import classNames from 'classnames'

import Input from '../Input/input'
import Icon from '../Icon/icon'

interface DataSourceDefaultObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceDefaultObject

export interface AutoCompleteProps {
    value?: string;
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        value,
        fetchSuggestions,
        onSelect,
        ...restProps
    } = props

    const [inputValue, setInputValue] = useState(value as string)
    const [loading, setLoading] = useState(false)
    const [suggestions, setSuggestion] = useState<DataSourceType[]>([])
    const [showDropDown, setShowDropDown] = useState(false)

    useEffect(() => {
        const results = fetchSuggestions(inputValue)
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
    }, [fetchSuggestions, inputValue]);

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
                            {item.value}
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