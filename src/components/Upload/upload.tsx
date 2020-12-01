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