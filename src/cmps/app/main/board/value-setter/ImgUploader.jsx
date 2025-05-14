import { useState } from 'react'
import { uploadService } from '../../../../../services/board/upload.service'

export function ImgUploader({ onUploaded = null }) {
  const [imgData, setImgData] = useState({
    imgUrl: null,
    height: 500,
    width: 500,
  })
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url, height, width } = await uploadService.uploadImg(ev)
    console.log(secure_url)
    setImgData({ imgUrl: secure_url, width, height })
    setIsUploading(false)
    onUploaded && onUploaded(secure_url)
    
    console.log(imgData)
  }

  function getUploadLabel() {

    if (imgData.imgUrl) return 'Upload Another?'
    return isUploading ? 'Uploading....' : 'Upload Image'
  }

  return (
    <div className="upload-preview">
      {imgData.imgUrl && <img src={imgData.imgUrl} style={{ maxWidth: '200px', float: 'right' }} />}
      <button className='i-File icon-start clickable'>
      <label htmlFor="imgUpload">{getUploadLabel()}</label></button>
      <input type="file" onChange={uploadImg} accept="img/*" id="imgUpload"  style={{ display: 'none' }}/>
    </div>
  )
}