import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from "lucide-react"
import imgUpload from "../assets/upload.svg";


export default function ImageUpload({uploadedImage, setUploadedImage}) {
  

 

  const imageStyle = uploadedImage ? { 
		width: "100%", 
		height: "100%", 
		objectFit: "cover", 
		borderRadius: "inherit" 
} : {};

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result)
        console.log('file')
        // reader.readAsDataURL(file)
      }
      // setUploadedImage(reader.readAsDataURL(file))
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  })

  return (
    <div>
      <div
        {...getRootProps()}
        className="image__container"
      >
        <input {...getInputProps()} />
        {uploadedImage ? (  
          <>        
            <img
              src={uploadedImage}
              alt="user pfp"
              className="image" 
            />
            <input {...getInputProps()} />
            </> 
        ) : (
          <div className="content">
              <label htmlFor="user-pfp-upload" className="label">
                  <img 
                    src={imgUpload} 
                    alt="upload icon" 
                    className="icon" 
                  />
                  <p>Drag & drop or click to upload</p>
              </label>
          </div>
        )}
        
      </div>
    </div>
  )
}