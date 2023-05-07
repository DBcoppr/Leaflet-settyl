import axios from "axios"
import { empmodel } from "../model/Memployee.js"

export const EditAddress=async(req,res)=>{
    
    try {
    const data=req.body
    const loc=await generateloc(data.street)
    const doc=await empmodel.findOneAndUpdate({email:data.email},{address:data.street,location:{coordinates:loc}},{
        new: true})
    res.send(doc)
    } catch (error) {
        res.send(error)
    }
}

export const ViewbyEmail=async(req,res)=>{
    const data=req.body
    try {
        const data= await empmodel. find({email:data.email})
    } catch (error) {
        res.send(error)
    }
}

export const ViewAll=async(req,res)=>{
    try {
        const data= await empmodel.find()
        res.send(data)
    } catch (error) {
        res.send(error)
    }
}


export const AddEmployee=async(req,res)=>{
    const data=req.body
    const loc=await generateloc(data.street)
    try{
        const dataAdded = await empmodel.create({
        name:data.name,
        email:data.email,
        department:data.department,
        address:data.street,
        location:{type:"Point",coordinates:loc}
        })
        res.send({msg:"data added success",data:dataAdded})
    }
    catch(error){
        res.send({msg:error})
    }
    
}

// function to generate geocoordinates
const generateloc = async (address) => {
    let url = `https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=90c499bc3f364727b22b9656a1f07076`
    try {
        const locdata = await axios.get(url)
        return ([locdata.data.results[0].lat,locdata.data.results[0].lon])
    } catch (error) {
        console.log(error)
    }

}