const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    "username": {type:String,
        required: true,
        unique: true,
        trim: true
    },
    "named": {type:String,
        required: true,
        unique: true,
        trim: true
        },
    "age": {type:Number,
        required: true
        },
    "email":{type:Number,
        required: true,
        unique: true
        },
    "Address":{type:String,
        required: true
        },
    "City":{type:String,
        required: true
        },
    "DOB":{type:Date,
        required: true
        },
    "password":{type:String,
        required: true
        },
    "createdAt":{type:Date,
        default: Date.now
        }
    },{
        collection: "Registration"
    }
)

module.exports = mongoose.model("userSchema",userSchema);