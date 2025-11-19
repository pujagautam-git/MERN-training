import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path"

 dotenv.config();

 //dotenv file is where we can access environment variables so that we can keep our secrets sepreately from our code base 

// console.log(process.env.MONGO_URI);

const app = express();
const PORT= process.env.Port || 5001;
const __dirname=path.resolve()

// connectDB();

//middleware
if(process.env.NODE_ENV !== "production") {
app.use(
    cors({
    origin:"http://localhost:5173",
})
);
}
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);
// app.use(
//     cors({
//     origin:"http://localhost:5173",
// })
// );



// our simple custom middleware to log req method and req url
// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url} `);
//     next();
// });

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV ==="production"){
app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});
}

    
connectDB().then(() => {
app.listen(PORT, () => {
    console.log("Server started on PORT:, PORT");
});
});





//what is endpoint?
//an endpoint is a combination of a url+ http that lets the client interact with a specific resources

// app.get("/api/notes", (req,res) => {
//     res.send("you got 25 notes");
// });

// app.post("/api/notes",(req,res)=>{
//     res.status(201).json({message:"post created successfully"})
// })

// app.put("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"Post updated successfully"})
// })
// app.delete("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"Post deleted successfully"})
// })

