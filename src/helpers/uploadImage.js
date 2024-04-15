import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECREAT
});


const uploadImage = async(file)=>{
    const buffer = Buffer.from(await file.arrayBuffer())

    const uploadFileData = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({ folder : 'facepedia'},(error,uploadResult)=>{
            return resolve(uploadResult)
        }).end(buffer)
    })

    return uploadFileData
}

export default uploadImage