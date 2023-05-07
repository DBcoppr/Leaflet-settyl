import express from "express"
import { AddEmployee, EditAddress, ViewAll } from "../controller/editAddress.js"
export const empRouter=express.Router()

empRouter.post("/add",AddEmployee)
empRouter.get("/getalldata",ViewAll)
empRouter.put("/edit",EditAddress)

