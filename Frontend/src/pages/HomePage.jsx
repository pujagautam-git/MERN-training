import React from 'react'
import NotesNotFound from '../components/NotesNotFound.jsx';
import { useState, useEffect } from "react";
import NoteCard from '../components/NoteCard.jsx';
import Navbar from '../components/Navbar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import api from "../lib/axios.js";
import toast from "react-hot-toast"



const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
const res = await api.get("/notes"); //this is axios on axios we used axios.post or get and http
// const data = await res.json() ; //if not fetch and json than used axios instead of fetch

console.log(res.data); // and instead of only data on fetch  we used res.data for axios 
 setNotes(res.data);  
 setIsRateLimited(false);   
} catch (error) {  
console.log("Error fetching notes");
console.log(error.response);
if(error.response?.status ===  429) {
  setIsRateLimited(true);
}else {
  toast.error("Failed to load notes")
}
      } finally {
        setLoading(false)
      }
    };

    fetchNotes();
  }, []);
  
  return (
    <div className="min-h-screen">
      <Navbar/>

      {isRateLimited && <RateLimitedUI />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className="text-center text-primary py-10">Loading notes... </div>}

{notes.length === 0 && !isRateLimited && <NotesNotFound />}

{notes.length > 0 && !isRateLimited && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {notes.map((note) => (
      <NoteCard  key={note._id} note={note} setNotes={setNotes}/>
      // <div>
      //   {note.title} | {note.content}
      // </div>
    ))} 
  </div>
)}
      </div>
      </div>

  )
}

export default HomePage