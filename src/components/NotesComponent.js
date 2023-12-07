import React, { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

export default function NotesComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const modalRef = useRef(null);
  const [noteTitle,setNoteTitle] = useState('');
  const [noteDescription,setNoteDescription] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
    const id=localStorage.getItem("userId")
      const response = await axios.get(`http://localhost:8080/api/notes/all/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setNotes(response.data);
      setIsModalOpen(false)
      
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateNote = async (e) => {
    setIsModalOpen(true);
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        window.alert("User not authenticated");
        return;
      }
      const response = await axios.post(
        `http://localhost:8080/api/notes/new/${localStorage.getItem('userId')}`,
        {
          noteTitle: newNoteTitle,
          noteDescription: newNoteContent,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      ).then(data=>{
        window.alert(data.data.message)
      }).catch(err=>{
        window.alert(err.message)
      })

      fetchNotes();
      closeModal();
    } catch (err) {
      console.error("Error creating note:", err);
      window.alert(err.message);
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleEditNote=async(noteId,noteTitle,noteDescription,note1Title,note1Description)=>{
    // console.log(noteTitle)
    const response=await axios.put(`http://localhost:8080/api/notes/${noteId}/${localStorage.getItem("userId")}`,{
      noteTitle: noteTitle !== '' ? noteTitle : note1Title,
      noteDescription: noteDescription !== '' ? noteDescription : note1Description,
    },{
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
    if(response.status==200){
      window.alert("successfully adited note")
      fetchNotes()
    }
    else{
      window.alert("unable to edit note")
    }
  }
  const handleDeleteNote=async(noteId)=>{
   const response=await axios.delete(`http://localhost:8080/api/notes/delete/${noteId}/${localStorage.getItem("userId")}`,{
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        })
   if(response.status==200){
    window.alert("successfully deleted note")
    fetchNotes()
   }
   else{
    window.alert("failed to delete note")
   }
  }
  const navigate = useNavigate();
  function handleLogOut(){
    localStorage.setItem("token",null)
    localStorage.setItem("userId",null)
    navigate("/login")
  }

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-blue-700 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 312.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
          <span class="font-semibold text-xl tracking-tight">Keepsie</span>
        </div>
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          
          <div>
            <button class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0" onClick={handleLogOut}>Logout</button>
          </div>
        </div>
      </nav>
      <div>
        <form className="flex items-center max-w-lg mx-auto p-2">
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-xl"
              placeholder="Search note"
              required
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            type="button"
            className="p-2.5 ms-2 w-2/12 text-sm font-small text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 whitespace-nowrap"
            onClick={openModal}
          >
            New note
          </button>
        </form>
      </div>
      <div>
        <div className="flex flex-wrap ml-7 scroll-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className="w-2/12 mt-5 ml-6 block rounded-lg bg-white p-3 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
            >
              <h6
                className="text-l font-medium leading-tight text-black overflow-auto h-10 mb-2"
                contentEditable="true"
                suppressContentEditableWarning={true}
                onInput={(e) => setNoteTitle(e.target.textContent)}
              >
                {note.noteTitle}
              </h6>
              <p
                className="mb-2 text-base text-black h-40 p-2 overflow-auto"
                contentEditable="true"
                suppressContentEditableWarning={true}
                onInput={(e) => setNoteDescription(e.target.textContent)}
              >
                {note.noteDescription}
              </p>
              <button onClick={()=>{handleEditNote(note.id,noteTitle,noteDescription,note.noteTitle,note.noteDescription)}}>
              <i class="fas fa-pencil-alt"></i>
              </button>
              <button onClick={()=>{handleDeleteNote(note.id)}}>
              <i class="fas fa-trash-alt text-red-500 ml-3"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
        {isModalOpen&&(
          <div className="flex items-center mx-auto mt-5 p-5" id="thisModal" >
          <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" ref={modalRef} aria-hidden="true" className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md w-full">
            <div className="relative p-4 w-4/12 max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-4 md:p-5 space-y-4">
                  <input type="text" id="input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pl-2 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)} />
                  <form>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                      <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                          
                        </div>
                        <button type="button" data-tooltip-target="tooltip-fullscreen" className="p-2 text-gray-500 rounded cursor-pointer sm:ms-auto hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"/>
                          </svg>
                        </button>
                        <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                          Show full screen
                          <div className="tooltip-arrow" data-popper-arrow></div>
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                        <textarea id="editor" rows="8" className="block w-full px-2 text-sm text-black bg-white border-0 focus:ring-0 focus:border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400" placeholder="Write note" required value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)} />
                      </div>
                    </div>
                    <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800" onClick={handleCreateNote}>
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
          
        </div>
  );
}
