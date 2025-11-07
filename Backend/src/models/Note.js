 import mongoose from "mongoose";

 //1- create a schema
 //2- model based off of that schema

 const noteSchema = new mongoose.Schema(
    {
    title:{                   // heading
        type:String,
        required:true,
    },
    content:{                      //description
        type:String,
        required:true,
    },
},
    { timestamps:true }   //createdAt, updatedAt
 );

 const Note= mongoose.model("Note", noteSchema)

 export default Note;