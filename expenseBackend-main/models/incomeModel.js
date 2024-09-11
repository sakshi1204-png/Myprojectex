const { default: mongoose } = require("mongoose")


const IncomeSchema = new mongoose.Schema
(
    {
        title:{
            type:String,
            required: true,
            trim: true,
            maxLength: 50
        },
        amount:{
            type:Number,
            required: true,
            maxLength:20,
        },

        type:{
            type: String,
            default: "income"
        },

        date: {
            type: Date,
            default: Date.now,
            required: true,
        },

        category:{
            type: String,
            required: true,
            trim: true,
        },

        description:{
            type:String,
            trim: true,
            required: true,
            maxLength:50,

        },


    },
    

     // created at updated at  
    {timestamps: true}


)
module.exports = mongoose.model('Income', IncomeSchema);