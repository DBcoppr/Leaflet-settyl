import express from "express"
import * as dotenv from 'dotenv';
import cors from "cors"
import mongoose from "mongoose"
import { empRouter } from "./router/route.js";
dotenv.config();
const app=express()
app.use(cors())
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use("/",empRouter)
const PORT=process.env.PORT || 8000
const CONNECTION_URL=process.env.MONGODB_URL
mongoose.set('strictQuery', false)
mongoose.connect(CONNECTION_URL).then((res)=>console.log("db connected")).catch((err)=>console.log("err in db connnect"))

app.listen(PORT,()=>{console.log(`server is running at ${PORT}`)})