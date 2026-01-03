import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FaMicrophone, FaTrash, FaCamera, FaFile, FaFileAudio, FaImage, FaNotesMedical, FaEdit, FaCircle, FaPause, FaPlay, FaSpinner, FaUser, FaCalendarAlt, FaTimesCircle, FaHistory, FaClock, FaRegClock } from 'react-icons/fa';
import { addNote, deleteNote, getNotes, updateNote } from '../functions/patient';
import ConfirmDialog from './dialog/ConfirmDialog';
import LoadingSpinner from './LoadingSpinner';
import { commitFile, markFileAsTobeDeleted, uploadFile } from '../functions/assets';
import MessageModel from './MessageModel';
import moment from 'moment';
import { getFileIcon } from '../utils/fileIconExtentions';


const printStyles = `
   @media print {
    @page { size: A4; margin: 1cm; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .print-break { page-break-before: always; }
  }
  @media screen {
    .print-break { 
      break-before: page;
      margin-top: 30mm;
    }
`;

const PrintNotesA4 = ({ notes, printPreviewMode = true }) => {
  if (!printPreviewMode) return null;

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).replace(",", "");
    } catch {
      return dateStr;
    }
  };

  const renderAttachment = (att) => {
    const icon =
      att.type === "image" ? (
        <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ) : att.type === "audio" ? (
        <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );

    return (
      <div key={att.hash} className="text-center p-2 bg-white border border-gray-300 rounded-md text-xs">
        {icon}
        <div className="font-medium text-gray-800 truncate mt-1">{att.name}</div>
        {att.description && (
          <div className="text-xs text-gray-600 italic mt-1">{att.description}</div>
        )}
      </div>
    );
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: printStyles }} />

      <div className="print-break font-sans text-sm leading-relaxed text-gray-800 max-w-[210mm] mx-auto bg-white">
<div className=" mt-10">
        {/* ========== Header ========== */}
        <h1 className="text-center text-xl font-bold text-sky-700 mb-4">
          Clinical Notes
        </h1>

        {/* <div className="flex justify-between text-xs text-gray-600 pb-2 border-b border-gray-300 mb-6">
          <div>
            <svg className="inline w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <strong>Printed:</strong> {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).replace(",", "")}
          </div>
        </div> */}

        {/* ========== Notes ========== */}
        {notes.length === 0 ? (
          <div className="text-center text-gray-400 italic my-10">
            No clinical notes recorded yet.
          </div>
        ) : (
          notes.map((note, idx) => (
            <div
              key={note.id}
              className="mb-5 border border-gray-300 rounded-lg overflow-hidden shadow-sm"
            >
              {/* Note Header */}
              <div className="bg-gray-50 px-3.5 py-2.5 flex justify-between items-center text-xs text-gray-600 border-b border-gray-300">
                <span>
                  <strong>Note #{notes.length - idx}</strong>
                </span>
                <span>{formatDate(note.timestamp)}</span>
              </div>

              {/* Note Content */}
              <div
                className="p-3.5 bg-white prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: note.content }}
              />

              {/* Attachments */}
              {note.attachments && note.attachments.length > 0 && (
                <div className="px-3.5 py-2.5 bg-gray-100 border-t border-dashed border-gray-400">
                  <strong className="block text-sm mb-2 text-gray-700">
                    Attachments ({note.attachments.length})
                  </strong>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                    {note.attachments.map(renderAttachment)}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
        </div>
      </div>
    </>
  );
};



const VoiceToText = ({ 
  disabled, 
  name, 
  value = '', 
  onChange, 
  className = "mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200", 
  rows = 4, 
  placeholder = "Describe your interests and pleasures", 
  ariaLabel = "Voice to text input" 
}) => {
  const [listening, setListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let interim = '';
        let final = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          if (result.isFinal) {
            final += transcript + ' ';
          } else {
            interim += transcript + ' ';
          }
        }
        setInterimTranscript(interim);
        if (final && typeof onChange === 'function') {
          const newContent = (value || '') + (value ? ' ' : '') + final;
          onChange({ target: { name, value: newContent } });
          setInterimTranscript('');
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
        alert('Speech recognition error: ' + event.error + '. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    } else {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onChange, name, value]);

  const toggleSpeech = () => {
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      setInterimTranscript('');
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = 'en-US';
        try {
          recognitionRef.current.start();
          setListening(true);
        } catch (err) {
          console.error('Failed to start speech recognition:', err);
          alert('Failed to start speech recognition. Please check microphone permissions.');
          setListening(false);
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center">
        <button
          onClick={toggleSpeech}
          disabled={disabled}
          className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-semibold transition-all duration-200 shadow-md ${
            listening
              ? 'bg-red-600 animate-pulse'
              : 'bg-sky-600 hover:bg-sky-700 hover:shadow-xl'
          } disabled:bg-gray-400 disabled:cursor-not-allowed`}
          aria-label={listening ? 'Stop Speaking' : 'Start Speaking'}
        >
          <FaMicrophone
            className={listening ? 'animate-bounce' : ''}
            size={16}
          />
        </button>
      </div>
      <textarea
        name={name}
        value={interimTranscript ? `${value || ''}${value ? ' ' : ''}${interimTranscript}` : value}
        onChange={onChange}
        className={className}
        rows={rows}
        placeholder={placeholder}
        aria-label={ariaLabel}
        disabled={disabled}
      />
      {interimTranscript && (
        <div className="mt-1 text-sm text-gray-600">
          Preview: {interimTranscript}
        </div>
      )}
    </div>
  );
};

function Notes({ patientId, userId,printPreviewMode }) {  // Assume passed as props
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [recording, setRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordName, setRecordName] = useState('');
  const [recordTime, setRecordTime] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const [attachmentDescription, setAttachmentDescription] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

const [facingMode, setFacingMode] = useState('environment'); // 'environment' = back, 'user' = front

  const [deletedAttachments, setDeletedAttachments] = useState([]);
  

  const [isUploadingAttachement,setIsUploadingAttachement]=useState(false);

  const [deletingNoteId, setDeletingNoteId] = useState(null);
const [newNoteIds, setNewNoteIds] = useState(new Set());


  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    type: "error",
  });

  const [isSaving, setIsSaving]=useState(false);
    const [isLoadingNotes, setIsLoadingNotes]=useState(false);


// Add to useEffect hooks
useEffect(() => {
  if (newNoteIds.size > 0) {
    const timers = Array.from(newNoteIds).map(noteId => (
      setTimeout(() => {
        setNewNoteIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(noteId);
          return newSet;
        });
      }, 1000) // Match animation duration
    ));
    return () => timers.forEach(clearTimeout);
  }
}, [newNoteIds]);


  useEffect(() => {
    const fetchNotes = async () => {
      await loadNotes();
    
    };
    fetchNotes();
  }, [patientId]);

  // Recording Timer
  useEffect(() => {
    let timer;
    if (recording && !isPaused) {
      timer = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [recording, isPaused]);

  // Cleanup streams on component unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Attachment Handlers
  const handleUpload =async (e, type) => {
    const files = Array.from(e.target.files);
    const newAttachment = files[0];
    if (newAttachment) {

 
      setPendingAttachment({
        id: Math.random().toString(),
        name: newAttachment.name,
        type,
        file: newAttachment,
        url: URL.createObjectURL(newAttachment),
       // uploadResult:response
      });
      
      setShowDescriptionModal(true);
    }
  };

  // const startCamera = () => {
  //   setShowCamera(true);
  //   navigator.mediaDevices.getUserMedia({ video: true })
  //     .then((stream) => {
  //       streamRef.current = stream;
  //       if (videoRef.current) {
  //         videoRef.current.srcObject = stream;
  //         videoRef.current.play();
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('Camera access error:', err);
  //       setShowCamera(false);
  //     });
  // };

  const startCamera = async () => {
  // Stop any existing stream first
  if (streamRef.current) {
    streamRef.current.getTracks().forEach(track => track.stop());
  }

  const constraints = {
    video: {
      facingMode: facingMode, // 'environment' or 'user'
      width: { ideal: 1280 },
      height: { ideal: 720 }
    }
  };

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
    setShowCamera(true);
  } catch (err) {
    console.error('Camera access error:', err);

    // Fallback: try the other camera if one fails
    const fallbackMode = facingMode === 'environment' ? 'user' : 'environment';
    try {
      const fallbackStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: fallbackMode }
      });
      streamRef.current = fallbackStream;
      if (videoRef.current) {
        videoRef.current.srcObject = fallbackStream;
        videoRef.current.play();
      }
      setFacingMode(fallbackMode);
      setShowCamera(true);
    } catch (fallbackErr) {
      alert('Unable to access camera. Please check permissions.');
      console.error(fallbackErr);
    }
  }


};

const toggleCamera = () => {
  setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  // Restart camera with new mode
  if (showCamera) {
    startCamera();
  }
};

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setPendingAttachment({
        id: Math.random().toString(),
        name: `Photo-${new Date().toISOString()}.jpg`,
        type: 'image',
        file: blob,
        url,
      });
      setShowDescriptionModal(true);
      streamRef.current.getTracks().forEach(track => track.stop());
      setShowCamera(false);
    }, 'image/jpeg');
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        audioStreamRef.current = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setPendingAttachment({
            id: Math.random().toString(),
            name: recordName || `Recording-${new Date().toISOString()}.webm`,
            type: 'audio',
            file: audioBlob,
            url: audioUrl,
          });
          setShowDescriptionModal(true);
          audioChunksRef.current = [];
          setRecordName('');
          setRecording(false);
          setIsPaused(false);
          setRecordTime(0);
          setShowRecordModal(false);
          audioStreamRef.current.getTracks().forEach(track => track.stop());
        };
        mediaRecorderRef.current.start();
        setRecording(true);
      })
      .catch((err) => {
        console.error('Audio recording error:', err);
        setShowRecordModal(false);
      });
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
    }
  };

  const cancelRecording = () => {
    if (recording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowRecordModal(false);
    setRecording(false);
    setIsPaused(false);
    setRecordTime(0);
    setRecordName('');
    audioChunksRef.current = [];
  };

  const saveAttachmentWithDescription =async () => {
    if (pendingAttachment) {
      setIsUploadingAttachement(true);
      try{
           const response = await uploadFile(pendingAttachment.file);
  
           console.log(' uploadFile response',response)
      
              if(response.status===500){    
     setModal({
          isOpen: true,
          message: "Oops! Something went wrong while processing your request.",
          type: "warning",
        });
        return;
              }

          if(response){       
      setAttachments([
        ...attachments,
        {
          ...pendingAttachment,
          description: attachmentDescription,
          ...response
        },
      ]);
    }
    else{
      
        setModal({
          isOpen: true,
          message: "Oops! The file is too big. Please upload a file smaller than 10 MB.",
          type: "warning",
        });
      
    }
  }
  catch(err){
             console.log(' uploadFile err:',err);
                    setModal({
          isOpen: true,
          message: err.message,
          type: "danger",
        });
      
  }
  finally{
         setIsUploadingAttachement(false);
           setShowDescriptionModal(false);

    setPendingAttachment(null);
    setAttachmentDescription('');
  }

    }
  
  };

  const cancelAttachment = () => {
    setShowDescriptionModal(false);
    setPendingAttachment(null);
    setAttachmentDescription('');
    if (pendingAttachment?.url) {
      URL.revokeObjectURL(pendingAttachment.url);
    }
  };

  

  const handleSaveNotes = async () => {
  if (!notes.trim() && attachments.length === 0) return;

  setIsSaving(true);

  const _attachments=[];

  attachments.forEach(att => {

 _attachments.push({description:att.description,name:att.name,
  type:att.type,hash:att.hash})
  });

 console.log('aaattt:',_attachments)


  const payload={notes,patientId,userId,attachments:_attachments}
  
 console.log('payload:',payload)
  try {
    let res;
    if (editingNoteId) {
      res = await updateNote(editingNoteId, payload);
      
     if (res.data.error) {
          setModal({
            isOpen: true,
            message: res.data.error.message,
            type: "error",
          });
          setIsSaving(false);
          return;
        }

        if (res.data.outputValues.responseStatus === "failed") {
          setModal({
            isOpen: true,
            message: res.data.outputValues.outputMessage,
            type: "warning",
          });
          setIsSaving(false);
          return;
        }

      if (res.data.outputValues.ResponseStatus === 'success') {
  
        setSavedNotes(savedNotes.map(note =>
          note.id === editingNoteId
            ? {
                ...note,
                content: notes,
                //timestamp: new Date().toLocaleString(),
                createdDate:note.createdDate,
                modifiedDate: new Date().toLocaleString(),

                attachments: attachments.map(att => ({
                 // id: att.id,
                  name: att.name,
                  type: att.type,
                  url: att.url,
                  path: att.path || att.name,
                  description: att.description,
                  hash:att.hash
                }))
              }
            : note
        ));
                      console.log('rrrrrrrrrrrrrrrr')
        setNewNoteIds(prev => new Set(prev).add(editingNoteId));


      deletedAttachments.forEach(async att => {
          try{
         const attachmentCommitRes=await markFileAsTobeDeleted(att.hash);
         console.log('attachmentdeltedRes',attachmentCommitRes)
          }catch(err){
            console.log("Error commiting attachment:",err);
            return;
          }
        });


      }
    } else {
      res = await addNote(payload);
      
        attachments.forEach(async att => {
          try{
         const attachmentCommitRes=await commitFile(att.hash);
         console.log('attachmentCommitRes',attachmentCommitRes)
          }catch(err){
            console.log("Error commiting attachment:",err);
            return;
          }
        });




        if (res.data.error) {
          setModal({
            isOpen: true,
            message: res.data.error.message,
            type: "error",
          });
          setIsSaving(false);
          return;
        }

        if (res.data.outputValues.responseStatus === "failed") {
          setModal({
            isOpen: true,
            message: res.data.outputValues.outputMessage,
            type: "warning",
          });
          setIsSaving(false);
          return;
        }

        
      if (res.data.outputValues.ResponseStatus === 'success') {
        const newNote = {
          id: res.data.outputValues.noteId_out,
          content: notes,
            createdDate:new Date().toLocaleString(),
                    modifiedDate:new Date().toLocaleString(),
          //timestamp: new Date().toLocaleString(),
          attachments: attachments.map(att => ({
            id: att.id,
            name: att.name,
            type: att.type,
            description: att.description,
               hash:att.hash
          }))
        };
        setSavedNotes([newNote, ...savedNotes]);
        setNewNoteIds(prev => new Set(prev).add(newNote.id));

        console.log('attachments')
      }
    }


    setNotes('');
    setAttachments([]);
    setEditingNoteId(null);
    setShowEditor(false);
    setIsSaving(false);
  } catch (err) {
    setIsSaving(false);
    console.error('Failed to save note:', err);
            setModal({
            isOpen: true,
            message: err,
            type: "error",
          });
    // Handle error modal
  }
};

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setNotes(note.content);
    setAttachments(note.attachments);
    setShowEditor(true);
  };

  const handleDeleteNote = (id) => {
    setNoteToDelete(id);
    setShowConfirm(true);
  };

  const loadNotes=async()=>{
  try{
  setIsLoadingNotes(true);
  const fetchRes = await getNotes(patientId);
  console.log('fetchRes',fetchRes)
  
  const notes=[];
  fetchRes.data.map(n =>{

     const attachments=n.attachments && JSON.parse(n.attachments).map(a => ({
          id: a.attachmentId,
          name: a.attachmentName,
          type: a.attachmentType,
          description: a.description,
          hash:a.hash,
        }));

        console.log('attachmiiints',n.attachments)
    const note= {
        id: n.noteId,
        content: n.note,
      createdDate:n.createdDate,
        modifiedDate:n.modifiedDate,
        timestamp: new Date(n.createdDate).toLocaleString(),
        attachments
      }

          notes.push(note);
    }
    );

      setSavedNotes(notes);

      setIsLoadingNotes(false);
        } catch (err) {
           setIsLoadingNotes(false);
        console.error('Failed to fetch notes:', err);
      }
  }

    const handleDeleteAttachment = (hash) => {
      console.log('hash:',hash);
           console.log('attachments:',attachments);
        
    setAttachments(attachments.filter((att) => att.hash !== hash));
    const deletedAttachment=attachments.filter((att) => att.hash === hash);
         console.log('deletedAttachment:',deletedAttachment); 

    setDeletedAttachments([...deletedAttachments,deletedAttachment[0]])
  };


const confirmDelete = async () => {
  try {
    setShowConfirm(false);
    setDeletingNoteId(noteToDelete); // Trigger deletion animation
  const delteNoteRes=  await deleteNote(noteToDelete);
     console.log(' delteNoteRes',delteNoteRes.data.success);

          if(delteNoteRes.data.error){

 setModal({
          isOpen: true,
          message: 'Something went wrong',
          type: "danger",
        });

      return;
     }

     if(delteNoteRes.data.success){
  const deletingNote= savedNotes.filter(n => n.id === noteToDelete);
  const attachments=deletingNote[0].attachments;

  if(attachments){
  attachments.forEach(async a => {
     const markfileasDeltedRes=await markFileAsTobeDeleted(a.hash);
      console.log(' markfileasDeltedRes',markfileasDeltedRes);
  });
}
     }


  // const notes=savedNotes;

  
    setTimeout(() => {
      setSavedNotes(savedNotes.filter(n => n.id !== noteToDelete));
      setDeletingNoteId(null);
      setNoteToDelete(null);
    }, 500); // Match animation duration
  } catch (err) {
    console.error('Failed to delete note:', err);
    setDeletingNoteId(null);
    setShowConfirm(false);
    setNoteToDelete(null);
  }
};

  const cancelDelete = () => {
    setShowConfirm(false);
    setNoteToDelete(null);
  };

  const handleCancelEditor = () => {
    setNotes('');
    setAttachments([]);
    setEditingNoteId(null);
    setShowEditor(false);
        setDeletedAttachments([]);
  };

  // Format Timer
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  };



  return (
    <>
{
  !printPreviewMode ?

   <div className="px-4 sm:px-6 lg:px-8">
  <MessageModel
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, message: "", type: "error" })}
        message={modal.message}
        type={modal.type}
      />
         {/* Editor Panel (shown when showEditor is true) */}
      {showEditor && (
        <>
          <div className="border rounded-lg shadow-sm mb-6">
         
            <div className="flex justify-between items-center p-2 bg-gray-100 rounded-t-lg">
              <div className="flex gap-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e, 'image')}
                    className="hidden"
                  />
                  <span
                    className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
                    title="Upload Image"
                  >
                    <FaImage size={16} />
                  </span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleUpload(e, 'file')}
                    className="hidden"
                  />
                  <span
                    className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
                    title="Upload File"
                  >
                    <FaFile size={16} />
                  </span>
                </label>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleUpload(e, 'audio')}
                    className="hidden"
                  />
                  <span
                    className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
                    title="Upload Audio"
                  >
                    <FaFileAudio size={16} />
                  </span>
                </label>
                <button
                  onClick={startCamera}
                  className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
                  title="Camera Shot"
                >
                  <FaCamera size={16} />
                </button>
                <button
                  onClick={() => setShowRecordModal(true)}
                  className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
                  title="Record Audio"
                >
                  <FaMicrophone size={16} />
                </button>
              </div>
              <VoiceToText
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="hidden"
                ariaLabel="Voice to text input for notes"
              />
            </div>
            <ReactQuill
              value={notes}
              onChange={setNotes}
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['link'],
                  ['clean'],
                ],
              }}
              className="bg-white rounded-b-lg"
              style={{ padding: '10px 12px' }}
            />
          </div>

          {/* Save and Cancel Buttons */}
  <div className="flex justify-end gap-4 mb-6">
  <button
    onClick={handleSaveNotes}
    className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md transition 
               hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
    aria-label="Save note"
    disabled={isSaving || notes.trim()==="<p><br></p>"}
  >
    <FaEdit className="mr-2" />
    {editingNoteId
      ? (isSaving ? "Updating Note ..." : "Update Note")
      : (isSaving ? "Saving Note..." : "Save Note")}
  </button>

  <button
    onClick={handleCancelEditor}
    className="flex items-center bg-gray-500 text-white px-4 py-2 rounded-md transition 
               hover:bg-gray-600"
    aria-label="Cancel note editing"
  >
    Cancel
  </button>
</div>


          {/* Current Attachments Preview */}
          {attachments.length > 0 && (
            <div className="mb-6">

              <h3 className="text-md font-bold text-gray-700 mb-2">Attachments</h3>
           
              <div className="flex justify-start items-center gap-4">
                {attachments.map((att) => (
                <div
  key={att.id}
  className="border rounded-lg p-4 text-center relative bg-gray-50 shadow-sm flex flex-col items-center w-44"
>


                <button
                  onClick={() => handleDeleteAttachment(att.hash)}
                  className="absolute top-1 right-1 text-red-600 hover:text-red-800"
                >
                  <FaTrash size={14} />
                </button>
  {/* Image preview */}
  {att.type === "image" && (
    <a
      href={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center"
    >
      <img
        src={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
        alt={att.name}
        className="mt-2 w-20 h-20 object-cover rounded-md"
      />
    </a>
  )}

  {/* Audio preview */}
  {att.type === "audio" && (
    <div className="mt-2 w-40">
      <audio controls className="w-full">
        <source
          src={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
          type="audio/webm"
        />
      </audio>
    </div>
  )}

  {/* File link */}
  {att.type === "file" && (
    <a
      href={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center mt-2 "
      title={att.name}
    >
      <img
        src={getFileIcon(att.name)}
        alt="file icon"
        className="w-12 h-12 mb-1"
      />
      {/* File name directly below icon */}


    </a>
  )}


    <p
      className="text-sm mt-2 font-medium text-gray-900 truncate text-center w-full"
      title={att.name}
    >
      {att.name}
    </p>

</div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      {/* Note History */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Notes Timeline</h3>
     { (!printPreviewMode && !showEditor) &&    <button
            onClick={() => setShowEditor(true)}
            className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
            aria-label="Add new note"
          >
            <FaEdit className="mr-2" />
            Add Note
          </button>}
        </div>
 
       {isLoadingNotes ? <LoadingSpinner /> :
      <>
        {savedNotes.length > 0 ? (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sky-600"></div>
            {savedNotes.map((note) => (
              <div key={note.id} className="mb-6 flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-sky-600"></div>
                </div>
                <div className="ml-4 bg-gray-50 border rounded-lg p-4 w-full shadow-sm">
                  <div className="flex justify-between items-center mb-2">
               <div className="flex justify-start items-center gap-2">
                  <FaRegClock /> 
  <p className="text-sm text-gray-500 italic">
 {moment(note.createdDate).format("DD MMM YYYY, hh:mm A")}
  </p>

  {note.createdDate !== note.modifiedDate && (
    <p className="text-sm  italic text-orange-500">
      Edited: {moment(note.modifiedDate).format("DD MMM YYYY, hh:mm A")}
    </p>
  )}
</div>
                    <div className="flex gap-2">
                  <button
  onClick={() => {
    const _note = savedNotes.find((n) => n.id === note.id);
    setEditingNoteId(_note.id);
    setNotes(_note.content);
    setAttachments(_note.attachments ?? []);
    setDeletedAttachments([]);
    // no need for setShowEditor – the overlay above does the job
  }}
  className="text-sky-600 hover:text-sky-700"
  title="Edit Note"
  aria-label={`Edit note from ${note.timestamp}`}
>
  <FaEdit />
</button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-red-600 hover:text-red-700"
                        title="Delete Note"
                        aria-label={`Delete note from ${note.timestamp}`}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div
                    className="prose max-w-none mb-4 border border-gray-200 hadow-sm rounded-lg p-4 bg-slate-50"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                  {note.attachments && note.attachments.length > 0 && (
                    <div>

               <div className="flex flex-wrap gap-4">
  {note.attachments.map((att) => (
 <div
  key={att.id}
  className="border rounded-lg p-4 text-center relative bg-gray-50 shadow-sm flex flex-col items-center w-44"
>
  
  {/* Image preview */}
  {att.type === "image" && (
    <a
      href={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center"
    >
      <img
        src={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
        alt={att.name}
        className="mt-2 w-20 h-20 object-cover rounded-md"
      />
    </a>
  )}

  {/* Audio preview */}
  {att.type === "audio" && (
    <div className="mt-2 w-40">
      <audio controls className="w-full">
        <source
          src={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
          type="audio/webm"
        />
      </audio>
    </div>
  )}

  {/* File link */}
  {att.type === "file" && (
    <a
      href={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center mt-2"
      title={att.name}
    >
      <img
        src={getFileIcon(att.name)}
        alt="file icon"
        className="w-12 h-12 mb-1"
      />
      {/* File name directly below icon */}

    </a>
  )}


    <p
      className="text-sm mt-2 font-medium text-gray-900 truncate text-center w-full"
      title={att.name}
    >
      {att.name}
    </p>

</div>

  ))}
</div>

                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ):<p>Notes not found...</p>}
</> }

      </div>

   

      {/* Camera Modal */}
      {/* {showCamera && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Capture Photo"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">Capture Photo</h3>
            <video ref={videoRef} className="w-full h-auto mb-4 rounded-md" autoPlay />
            <div className="flex gap-4 justify-center">
              <button
                onClick={capturePhoto}
                className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition transform hover:scale-105"
                title="Capture Photo"
                aria-label="Capture Photo"
              >
                <FaCircle size={24} />
              </button>
              <button
                onClick={closeCamera}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}

      {showCamera && (
  <div
    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
    role="dialog"
    aria-modal="true"
    aria-label="Capture Photo"
  >
    <div className="relative bg-black rounded-lg shadow-lg max-w-lg w-full mx-4">
      {/* Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline // Critical for iOS
        muted
        className="w-full h-auto rounded-t-lg"
        style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)' }} // Mirror front camera
      />

      {/* Switch Camera Button */}
      <button
        onClick={toggleCamera}
        className="absolute top-4 right-4 bg-white bg-opacity-80 text-gray-800 p-3 rounded-full shadow-lg hover:bg-opacity-100 transition z-10"
        title="Switch Camera"
        aria-label="Switch between front and back camera"
      >
        🔄
      </button>

      {/* Indicator: Current Camera */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
        {facingMode === 'environment' ? '🌍 Back' : '📱 Front'}
      </div>

      {/* Controls */}
      <div className="p-6 bg-black rounded-b-lg">
        <div className="flex gap-6 justify-center items-center">
          <button
            onClick={capturePhoto}
            className="bg-white p-5 rounded-full shadow-2xl hover:scale-110 transition transform"
            aria-label="Take photo"
          >
            <FaCircle size={36} className="text-red-600" />
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={closeCamera}
            className="text-white underline hover:no-underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      {/* Audio Recording Modal */}
      {showRecordModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Record Audio"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Record Audio</h3>
            <input
              placeholder="Recording Name"
              value={recordName}
              onChange={(e) => setRecordName(e.target.value)}
              className="w-full p-2 border rounded-md mb-4 focus:ring-sky-500 focus:border-sky-500"
            />
            <div className="text-center mb-4 text-gray-700 font-mono">
              {formatTime(recordTime)}
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                onClick={recording ? stopRecording : startRecording}
                className={`${
                  recording ? 'bg-red-600' : 'bg-sky-600'
                } text-white px-4 py-2 rounded-md hover:bg-sky-700 transition flex items-center gap-2`}
              >
                <FaMicrophone />
                {recording ? 'Stop and Save' : 'Start Recording'}
              </button>
              {recording && !isPaused && (
                <button
                  onClick={pauseRecording}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition flex items-center gap-2"
                >
                  <FaPause /> Pause
                </button>
              )}
              {recording && isPaused && (
                <button
                  onClick={resumeRecording}
                  className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-500 transition flex items-center gap-2"
                >
                  <FaPlay /> Resume
                </button>
              )}
              <button
                onClick={cancelRecording}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Description Modal */}
      {showDescriptionModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Add Attachment Description"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
           <h3 className="text-lg font-semibold mb-4">Upload Attachment</h3>
           <p><span className='font-bold'>File name:  </span>{pendingAttachment.name}</p>
             {/* <input
              placeholder="Enter description for the attachment"
              value={attachmentDescription}
              onChange={(e) => setAttachmentDescription(e.target.value)}
              className="w-full p-2 border rounded-md mb-4 focus:ring-sky-500 focus:border-sky-500"
            /> */}
            <div className="flex gap-4 justify-end mt-2">
           <button
  onClick={saveAttachmentWithDescription}
  className={`flex items-center justify-center px-4 py-2 rounded-md text-white transition ${
    isUploadingAttachement
      ? 'bg-sky-500 cursor-not-allowed'
      : 'bg-sky-600 hover:bg-sky-700'
  }`}
  disabled={isUploadingAttachement}
>
  {isUploadingAttachement ? (
    <>
      <FaSpinner className="animate-spin mr-2" />
      Uploading...
    </>
  ) : (
    'Upload'
  )}
</button>
              <button
                onClick={cancelAttachment}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

                <ConfirmDialog
          isVisible={showConfirm}
          message="Do you want to delete this note?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          title={"Confirm Delete"}
          severity={"danger"}

        />





{editingNoteId && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">

      {/* ───── Header ───── */}
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          {editingNoteId ? 'Edit Note' : 'New Note'}
        </h3>
        <button
          onClick={handleCancelEditor}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close editor"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ───── Attachment Toolbar (same as the “new note” panel) ───── */}
      <div className="flex justify-between items-center p-2 bg-gray-100 border-b">
        <div className="flex gap-2">
          {/* Image */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e, 'image')}
              className="hidden"
            />
            <span
              className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
              title="Upload Image"
            >
              <FaImage size={16} />
            </span>
          </label>

          {/* File (pdf/doc…) */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleUpload(e, 'file')}
              className="hidden"
            />
            <span
              className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
              title="Upload File"
            >
              <FaFile size={16} />
            </span>
          </label>

          {/* Audio file */}
          <label className="cursor-pointer">
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => handleUpload(e, 'audio')}
              className="hidden"
            />
            <span
              className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
              title="Upload Audio"
            >
              <FaFileAudio size={16} />
            </span>
          </label>

          {/* Camera */}
          <button
            onClick={startCamera}
            className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
            title="Camera Shot"
          >
            <FaCamera size={16} />
          </button>

          {/* Record audio */}
          <button
            onClick={() => setShowRecordModal(true)}
            className="flex items-center justify-center w-8 h-8 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition transform hover:scale-105"
            title="Record Audio"
          >
            <FaMicrophone size={16} />
          </button>
        </div>

        {/* Voice-to-text (kept hidden – same as original) */}
        <VoiceToText
          name="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="hidden"
          ariaLabel="Voice to text input for notes"
        />
      </div>

      {/* ───── Quill editor ───── */}
      <div className="flex-1 overflow-y-auto p-4">
        <ReactQuill
          value={notes}
          onChange={setNotes}
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link'],
              ['clean'],
            ],
          }}
          className="h-full"
          style={{ height: '100%' }}
        />
      </div>

      {/* ───── Existing attachments preview ───── */}
      {attachments.length > 0 && (
        <div className="p-4 border-t bg-gray-50">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>

       <div className="flex justify-start items-center gap-4">
            {attachments.map((att) => (
              <div
                key={att.id}
             className="border rounded-lg p-4 text-center relative bg-gray-50 shadow-sm flex flex-col items-center w-44"
              >

                <button
                  onClick={() => handleDeleteAttachment(att.hash)}
                  className="absolute top-1 right-1 text-red-600 hover:text-red-800"
                  type="button"
                >
                  <FaTrash size={14} />
                </button>

                {att.type === 'image' && (
                      <a
      href={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex justify-center"
    >
                  <img
                    src={`https://clpos.legendbyte.com/api/v1/asset/${att.hash}`}
                    alt={att.name}
                    className="max-h-20 mx-auto rounded"
                  />
                  </a>
                )}
                {att.type === 'audio' && (
                     <div className="mt-2 w-40">
                  <audio controls className="w-full">
                    <source src={`https://clpos.legendbyte.com/api/v1/asset/${att.hash}`} />
                  </audio>
                  </div>
                )}
                {att.type === 'file' && (
                  <a
          href={`https://clpos.legendbyte.com/api/v1/asset/${att?.hash}`}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center mt-2 "
      title={att.name}
                  >
                   <img
        src={getFileIcon(att.name)}
        alt="file icon"
        className="w-12 h-12 mb-1"
      />
                  </a>
                )}
       <p
      className="text-sm mt-2 font-medium text-gray-900 truncate text-center w-full"
      title={att.name}
    >
      {att.name}
    </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───── Footer – Save / Cancel ───── */}
      <div className="flex justify-end gap-3 p-4 border-t">
        <button
          onClick={handleCancelEditor}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveNotes}
          disabled={isSaving || notes.trim() === '<p><br></p>'}
          className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isSaving ? (
            <>
              <FaSpinner className="animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <FaEdit />
              {editingNoteId ? 'Update' : 'Save'}
            </>
          )}
        </button>
      </div>
    </div>
  </div>
)}


    </div>

        :  <PrintNotesA4
    notes={savedNotes}
    printPreviewMode={printPreviewMode}
  />}
    </>


   
  );
}

export default Notes;
