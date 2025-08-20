import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


const uploadoncloudinary = async (localFilePath)=>{
   try {
       if (!localFilePath) return null
      const response =  await  cloudinary.uploader.upload(localFilePath, {
         resource_type : "auto"
       }) 
        
       console.log("uploaded successfully", response.url);
          if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

       return response
   } catch (error) {
     console.log("cloudinary upload fail", error)
      if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
         return null
   }  
}    

export {uploadoncloudinary}