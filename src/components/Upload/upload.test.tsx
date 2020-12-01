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