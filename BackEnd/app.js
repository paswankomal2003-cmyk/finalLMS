import express from 'express';
import cors from 'cors';
import router from './Router/router.js';
import DB_Connection from './DB_Connections/DBConnections.js';
import cookieParser from 'cookie-parser';
import courseRouter from './Router/CourseRouter.js';
import morgan from 'morgan';

const app = express();

  
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('dev'))

app.use("/user",router)
app.use("/course",courseRouter)

DB_Connection()

export default app;