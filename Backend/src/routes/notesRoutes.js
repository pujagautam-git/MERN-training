import express from "express"
import { getAllNotes,createNote,updateNote,deleteNote, getNoteById } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
 router.put("/:id",updateNote);
 router.delete("/:id",deleteNote);

export default router;


//mongodb+srv://pujagautam3945_db_user:0tJDrlDfKO79oukD@cluster0.itdgier.mongodb.net/?appName=Cluster0


// app.delete("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"Post deleted successfully"})
// })
