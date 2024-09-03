const mongoose = require("mongoose");


const roleSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
    
    
    
},
{timestamps: true}
);

const Role = mongoose.model("Role", roleSchema, "roles");
module.exports = Role