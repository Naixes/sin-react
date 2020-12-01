import React  from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Upload, UploadFile } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

const defaultFileList: UploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 500) {
    alert('file too big')
    return false;
  }
  return true;
}
const filePromise = (file: File) => {
  const newFile = new File([file], 'new_name.docx', {type: file.type})
  return Promise.resolve(newFile)
}

const SimpleUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      defaultFileList={defaultFileList}
      beforeUpload={checkFileSize}
      onChange={action('changed')}
      onRemove={action('removed')}
    >
      <Button btnType='primary'>点击上传</Button>
    </Upload>
  )
}

const DragUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={filePromise}
      onChange={action('changed')}
      onRemove={action('removed')}
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br/>
      <p>Drag file over to upload</p>
    </Upload>
  )
}

storiesOf('Upload 上传', module)
  .add('基本的 Upload', SimpleUpload)
  .add('拖拽上传的 Upload', DragUpload)