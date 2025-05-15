import { useState } from 'react'
import { uploadService } from '../../../../../services/board/upload.service'
import { showSuccessMsg } from '../../../../../services/base/event-bus.service'

export function ImgUploader({ onUploaded = null }) {
  const [isUploading, setIsUploading] = useState(false)

  async function uploadImg(ev) {
    setIsUploading(true)
    const { secure_url } = await uploadService.uploadImg(ev)
    setIsUploading(false)

    if (onUploaded) onUploaded(secure_url)
    showSuccessMsg('Uploaded 1 file')
  }

  return (
    <div className="ImgUploader">
      <label htmlFor="imgUpload"></label>
      <input
        className="hidden-input"
        type="file"
        onChange={uploadImg}
        accept="image/*"
        id="imgUpload"
      />
    </div>
  )
}
