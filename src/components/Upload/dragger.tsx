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