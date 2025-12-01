import { config } from "dotenv";
config()
import app from "./app.js";
import cloudinary from "cloudinary";



const PORT = process.env.PORT || 6767;

cloudinary.v2.config({
    cloud_name: 'duzrhtzpq',
    api_key: '991558783416931',
    api_secret: '0ZKuRcSngJ4_BcaAOrUNjcQk-vY',
})

app.listen(PORT,()=>{
    console.log(`server is running on port no. ${PORT}`)
})

