import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FaMicrophone, FaTrash, FaCamera, FaFile, FaFileAudio, FaImage, FaEdit, FaCircle, FaPause, FaPlay } from 'react-icons/fa';
import { getSummaryNote, saveSummaryNote, addPsyNote, deletePsyNote, getPsyNotes, updatePsyNote } from '../functions/patient';
import ConfirmDialog from './dialog/ConfirmDialog';
import LoadingSpinner from './LoadingSpinner';

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

function PsychiatricNotesTab({ patientId, userId }) {
  const [notes, setNotes] = useState('');
  const [summaryNote, setSummaryNote] = useState('');
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
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [newNoteIds, setNewNoteIds] = useState(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [isSavingSummary, setIsSavingSummary] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    if (newNoteIds.size > 0) {
      const timers = Array.from(newNoteIds).map(noteId => (
        setTimeout(() => {
          setNewNoteIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(noteId);
            return newSet;
          });
        }, 1000)
      ));
      return () => timers.forEach(clearTimeout);
    }
  }, [newNoteIds]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoadingNotes(true);
        const fetchRes = await getPsyNotes(patientId);
        setSavedNotes(fetchRes.data.map(n => ({
          id: n.noteId,
          content: n.note,
          timestamp: new Date(n.createdDate).toLocaleString(),
          attachments: n.attachments.map(a => ({
            id: a.attachmentId,
            name: a.attachmentName,
            type: a.attachmentType,
            url: `/Uploads/notes/${a.attachmentPath}`,
            path: a.attachmentPath,
            description: a.description
          }))
        })));
        setIsLoadingNotes(false);
      } catch (err) {
        setIsLoadingNotes(false);
        console.error('Failed to fetch notes:', err);
      }
    };

    const fetchSummaryNote = async () => {
      try {
        const res = await getSummaryNote(patientId, userId);
        console.log('res.data:', res.data.results[0][0].note);
        setSummaryNote(res.data.results[0][0].note || '');
      } catch (err) {
        console.error('Failed to fetch summary note:', err);
      }
    };

    fetchNotes();
    fetchSummaryNote();
  }, [patientId, userId]);

  useEffect(() => {
    let timer;
    if (recording && !isPaused) {
      timer = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [recording, isPaused]);

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

  const handleUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const newAttachment = files[0];
    if (newAttachment) {
      setPendingAttachment({
        id: Math.random().toString(),
        name: newAttachment.name,
        type,
        file: newAttachment,
        url: URL.createObjectURL(newAttachment),
      });
      setShowDescriptionModal(true);
    }
  };

  const startCamera = () => {
    setShowCamera(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error('Camera access error:', err);
        setShowCamera(false);
      });
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

  const saveAttachmentWithDescription = () => {
    if (pendingAttachment) {
      setAttachments([
        ...attachments,
        {
          ...pendingAttachment,
          description: attachmentDescription,
        },
      ]);
    }
    setShowDescriptionModal(false);
    setPendingAttachment(null);
    setAttachmentDescription('');
  };

  const cancelAttachment = () => {
    setShowDescriptionModal(false);
    setPendingAttachment(null);
    setAttachmentDescription('');
    if (pendingAttachment?.url) {
      URL.revokeObjectURL(pendingAttachment.url);
    }
  };

  const handleDeleteAttachment = (attachId) => {
    setAttachments(attachments.filter((att) => att.id !== attachId));
  };

  const handleSaveNotes = async () => {
    if (!notes.trim() && attachments.length === 0) return;

    setIsSaving(true);
    const formData = new FormData();
    formData.append('note', notes);
    formData.append('patientId', patientId);
    formData.append('doctorId', 2);

    const newAtts = attachments.filter(att => att.file);
    const oldAtts = attachments.filter(att => !att.file);

    newAtts.forEach(att => {
      formData.append('newFiles', att.file);
      formData.append('newTypes', att.type);
      formData.append('newNames', att.name);
      formData.append('newDescriptions', att.description || '');
    });

    oldAtts.forEach(att => {
      formData.append('oldPaths', att.path);
      formData.append('oldTypes', att.type);
      formData.append('oldNames', att.name);
      formData.append('oldDescriptions', att.description || '');
    });

    try {
      let res;
      if (editingNoteId) {
        res = await updatePsyNote(editingNoteId, formData);
        if (res.data.outputValues.ResponseStatus === 'success') {
          setSavedNotes(savedNotes.map(note =>
            note.id === editingNoteId
              ? {
                  ...note,
                  content: notes,
                  timestamp: new Date().toLocaleString(),
                  attachments: attachments.map(att => ({
                    id: att.id,
                    name: att.name,
                    type: att.type,
                    url: att.url || `/Uploads/notes/${att.path}`,
                    path: att.path || att.name,
                    description: att.description
                  }))
                }
              : note
          ));
          setNewNoteIds(prev => new Set(prev).add(editingNoteId));
        }
      } else {
        res = await addPsyNote(formData);
        if (res.data.outputValues.ResponseStatus === 'success') {
          const newNote = {
            id: res.data.outputValues.noteId_out,
            content: notes,
            timestamp: new Date().toLocaleString(),
            attachments: attachments.map(att => ({
              id: att.id,
              name: att.name,
              type: att.type,
              url: att.url || `/Uploads/notes/${att.path}`,
              path: att.path || att.name,
              description: att.description
            }))
          };
          setSavedNotes([newNote, ...savedNotes]);
          setNewNoteIds(prev => new Set(prev).add(newNote.id));
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

  const confirmDelete = async () => {
    try {
      setShowConfirm(false);
      setDeletingNoteId(noteToDelete);
      await deletePsyNote(noteToDelete);
      setTimeout(() => {
        setSavedNotes(savedNotes.filter(n => n.id !== noteToDelete));
        setDeletingNoteId(null);
        setNoteToDelete(null);
      }, 500);
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
  };

  const handleEditSummary = () => {
    setIsEditingSummary(true);
  };

  const handleSaveSummary = async () => {
    setIsSavingSummary(true);
    try {
      await saveSummaryNote(patientId, userId, summaryNote);
      setIsEditingSummary(false);
      setIsSavingSummary(false);
    } catch (err) {
      console.error('Failed to save summary note:', err);
      setIsSavingSummary(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  };

  return (
    <div className="sm:px-6 flex gap-6">
      {/* Main Content */}
      <div className="flex-1">
        {/* Editor Panel */}
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
                disabled={isSaving || notes.trim() === "<p><br></p>"}
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
                <h3 className="text-sm font-medium text-gray-700 mb-2">Current Attachments</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {attachments.map((att) => (
                    <div
                      key={att.id}
                      className="border rounded-lg p-4 text-center relative bg-gray-50 shadow-sm"
                    >
                      <div className="text-2xl mb-2 text-sky-600">
                        {att.type === 'image' && <FaCamera />}
                        {att.type === 'file' && <FaFile />}
                        {att.type === 'audio' && <FaMicrophone />}
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">{att.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{att.description}</p>
                      {att.type === 'image' && (
                        <img src={att.url} alt={att.name} className="mt-2 max-w-full h-auto rounded-md" />
                      )}
                      {att.type === 'audio' && (
                        <audio controls className="mt-2 w-full">
                          <source src={att.url} type="audio/webm" />
                        </audio>
                      )}
                      {att.type === 'file' && (
                        <a
                          href={att.url}
                          download
                          className="text-sky-600 hover:underline mt-2 block"
                        >
                          {att.name}
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteAttachment(att.id)}
                        className="absolute top-2 right-2 text-red-600 hover:text-red-700"
                        title="Delete Attachment"
                        aria-label={`Delete attachment ${att.name}`}
                      >
                        <FaTrash />
                      </button>
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
            {!showEditor && (
              <button
                onClick={() => setShowEditor(true)}
                className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
                aria-label="Add new note"
              >
                <FaEdit className="mr-2" />
                Add Note
              </button>
            )}
          </div>

          {isLoadingNotes ? <LoadingSpinner /> : (
            <>
              {savedNotes.length > 0 ? (
         <div
          className="relative max-h-[400px] overflow-y-auto pr-4"
          style={{ scrollbarWidth: 'thin', scrollbarColor: '#4b5563 #e5e7eb' }}
        >
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sky-600"></div>
                  {savedNotes.map((note) => (
                    <div
                      key={note.id}
                      className={`mb-6 flex items-start transition-opacity duration-500 ${
                        deletingNoteId === note.id ? 'opacity-0' : 'opacity-100'
                      } ${newNoteIds.has(note.id) ? 'animate-pulse bg-yellow-100' : ''}`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-sky-600"></div>
                      </div>
                      <div className="ml-4 bg-gray-50 border rounded-lg p-4 w-full shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm text-gray-500">{note.timestamp}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditNote(note)}
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
                          className="prose max-w-none mb-4"
                          dangerouslySetInnerHTML={{ __html: note.content }}
                        />
                        {note.attachments && note.attachments.length > 0 && (
                          <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {note.attachments.map((att) => (
                                <div
                                  key={att.id}
                                  className="border rounded-lg p-1 text-center relative"
                                >
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {att.name}
                                  </p>
                                  <p className="text-xs text-gray-600 mt-1">{att.description}</p>
                                  {att.type === 'image' && (
                                    <img
                                      src={att.url}
                                      alt={att.name}
                                      className="mt-2 max-w-full h-auto rounded-md"
                                    />
                                  )}
                                  {att.type === 'audio' && (
                                    <audio controls className="mt-2 w-full">
                                      <source src={att.url} type="audio/webm" />
                                    </audio>
                                  )}
                                  {att.type === 'file' && (
                                    <a
                                      href={att.url}
                                      download
                                      className="text-sky-600 hover:underline mt-2 block"
                                    >
                                      {att.name}
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : <p className='text-center mt-10 rounded-lg p-2 text-gray-500'>Notes not found...</p>}
            </>
          )}
        </div>
      </div>

      {/* Static Summary Note Panel */}
      <div className="w-[40%] sticky top-4 self-start">
<div className=" border-sky-400 rounded-lg shadow-sm border-4">
          <div className="flex justify-between items-center p-2 bg-gray-100 rounded-t-lg">
            <h3 className="text-sm font-medium text-gray-700">Summary Note</h3>
            {!isEditingSummary && (
              <button
                onClick={handleEditSummary}
                className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md transition hover:bg-sky-700"
                aria-label="Edit summary note"
              >
                <FaEdit className="mr-2" />
                Edit Summary
              </button>
            )}
          </div>
          {/* <div
            className="bg-white rounded-b-lg"
            style={{ padding: '10px 12px', minHeight: '200px' }}
          > */}
            <ReactQuill
              value={summaryNote}
              onChange={setSummaryNote}
              modules={{
                toolbar: isEditingSummary ? [
                  ['bold', 'italic', 'underline'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['clean'],
                ] : false,
              }}
              readOnly={!isEditingSummary}
              className="bg-white"
            />
          {/* </div> */}
          {isEditingSummary && (
            <div className="p-2 bg-gray-100 rounded-b-lg">
              <button
                onClick={handleSaveSummary}
                className="flex items-center justify-center w-full bg-sky-600 text-white px-4 py-2 rounded-md transition 
                           hover:bg-sky-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Save summary note"
                disabled={isSavingSummary}
              >
                <FaEdit className="mr-2" />
                {isSavingSummary ? 'Saving Summary...' : 'Save Summary'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
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
            <h3 className="text-lg font-medium text-gray-700 mb-4">Record Audio</h3>
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
            <h3 className="text-lg font-medium text-gray-700 mb-4">Add Description</h3>
            <input
              placeholder="Enter description for the attachment"
              value={attachmentDescription}
              onChange={(e) => setAttachmentDescription(e.target.value)}
              className="w-full p-2 border rounded-md mb-4 focus:ring-sky-500 focus:border-sky-500"
            />
            <div className="flex gap-4 justify-end">
              <button
                onClick={saveAttachmentWithDescription}
                className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
              >
                Save
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
        title="Confirm Delete"
        severity="danger"
      />
    </div>
  );
}

export default PsychiatricNotesTab;