import mongoose from "mongoose";

const empschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default:"Point"
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})

export const empmodel = mongoose.model("employee", empschema)


