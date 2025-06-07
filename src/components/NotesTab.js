import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { FaMicrophone, FaTrash, FaCamera, FaFile, FaCameraRetro, FaCircle, FaPause, FaPlay, FaSpeakerDeck, FaFileAudio, FaImage, FaNotesMedical, FaEdit } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';

function Notes() {
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [showDeleted, setShowDeleted] = useState(true);
  const [listening, setListening] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
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
  const [language, setLanguage] = useState('en-US');
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioStreamRef = useRef(null);

  // Speech-to-Text Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

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
        if (final) {
          setNotes((prev) => {
            const newContent = prev + (prev ? ' ' : '') + final;
            return newContent;
          });
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
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [language]);

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

  const toggleSpeech = () => {
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
      setInterimTranscript('');
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = language;
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

  // Attachment Handlers
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
            url: audioUrl,
          });
          setShowDescriptionModal(true);
          audioChunksRef.current = [];
          setRecordName('');
          setRecording(false);
          setIsPaused(false);
          setRecordTime(0);
          setShowRecordModal(false);
          stream.getTracks().forEach(track => track.stop());
        };
        mediaRecorderRef.current.start();
        setRecording(true);
        console.log('Started recording');
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
      console.log('Paused recording');
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      console.log('Resumed recording');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      console.log('Stopped recording');
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
    console.log('Cancelled recording');
  };

  const saveAttachmentWithDescription = () => {
    if (pendingAttachment) {
      setAttachments([
        ...attachments,
        {
          ...pendingAttachment,
          description: attachmentDescription || 'No description provided',
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
    console.log('Deleted attachment:', attachId);
  };

  // Note Handlers
  const handleSaveNotes = () => {
    if (notes.trim() || attachments.length > 0) {
      const timestamp = new Date().toLocaleString();
      setSavedNotes([
        {
          id: Date.now(),
          content: notes,
          timestamp,
          deleted: false,
          attachments: [...attachments],
        },
        ...savedNotes,
      ]);
      setNotes('');
      setAttachments([]);
      console.log('Saving note:', { content: notes, timestamp, attachments });
    }
  };

  const handleDeleteNote = (id) => {
    setNoteToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setSavedNotes(
      savedNotes.map((note) =>
        note.id === noteToDelete ? { ...note, deleted: true } : note
      )
    );
    console.log('Marked note as deleted:', noteToDelete);
    setShowConfirm(false);
    setNoteToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setNoteToDelete(null);
  };

  // Format Timer
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-6">
          <FaNotesMedical className="mr-2" size={28} />
          Notes
        </h2>
      </div>

      {/* Language Selector and Start Speaking */}
      <div className="flex flex-col items-center mb-6 space-y-4">
        <div className="inline-flex rounded-full bg-gray-100 p-1">
          <button
            onClick={() => setLanguage('en-US')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              language === 'en-US'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('si-LK')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              language === 'si-LK'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sinhala
          </button>
        </div>
        <p id="speech-label" className="text-sm text-gray-600 text-center max-w-xs">
          Speak to add notes! Click the button, talk clearly, and stop to save your text.
        </p>
        <button
          onClick={toggleSpeech}
          disabled={!recognitionRef.current}
          className={`flex items-center justify-center w-full max-w-xs py-3 px-6 rounded-lg text-white text-lg font-semibold transition-all duration-200 shadow-lg ${
            listening
              ? 'bg-red-600 animate-pulse'
              : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
          } disabled:bg-gray-400 disabled:cursor-not-allowed`}
          aria-describedby="speech-label"
        >
          <FaMicrophone
            className={`mr-2 ${listening ? 'animate-bounce' : ''}`}
            size={20}
          />
          {listening ? 'Stop Speaking' : 'Start Speaking'}
        </button>
      </div>

      {/* Interim Transcript Preview */}
      {interimTranscript && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Preview: {interimTranscript}</p>
        </div>
      )}

      {/* Attachment Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleUpload(e, 'image')}
            className="hidden"
          />
          <span
            className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            title="Upload Image"
          >
            <FaImage size={20} />
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
            className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            title="Upload File"
          >
            <FaFile size={20} />
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
            className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
            title="Upload Audio"
          >
            <FaFileAudio size={20} />
          </span>
        </label>
        <button
          onClick={() => setShowRecordModal(true)}
          className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
          title="Record Audio"
        >
          <FaMicrophone size={20} />
        </button>
        <button
          onClick={startCamera}
          className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
          title="Camera Shot"
        >
          <FaCamera size={20} />
        </button>
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
            <h3 className="text-lg font-semibold mb-4">Add Description</h3>
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

      {/* Editor */}
      <div className="border rounded-lg shadow-sm">
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
          className="bg-white rounded-lg"
          style={{ padding: '10px 12px' }} // Adds vertical and horizontal padding
        />
      </div>

      {/* Note Deletion Confirmation Dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Confirm Delete Note"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Do you want to delete this note?</h3>
            <div className="flex gap-4 justify-end">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
   <div className="mt-4">
<div className="flex justify-between items-center mb-6">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="showDeleted"
                checked={showDeleted}
                onChange={() => setShowDeleted(!showDeleted)}
                className="mr-2 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
              />
              <label htmlFor="showDeleted" className="text-sm font-medium text-gray-700">
                Show Deleted Notes
              </label>
            </div>
            <button
              onClick={handleSaveNotes}
              className="flex items-center bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
              aria-label="Save note"
            >
              <FaEdit className="mr-2" />
              Save Notes
            </button>
          </div>
          </div>

      {/* Timeline of Saved Notes */}
      {savedNotes.length > 0 && (
        <div className="mt-8">
        
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes Timeline</h3>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sky-600"></div>
            {savedNotes
              .filter((note) => showDeleted || !note.deleted)
              .map((note) => (
                <div key={note.id} className="mb-6 flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        note.deleted ? 'bg-gray-400' : 'bg-sky-600'
                      }`}
                    ></div>
                  </div>
                  <div
                    className={`ml-4 bg-gray-50 border rounded-lg p-4 w-full shadow-sm ${
                      note.deleted ? 'line-through opacity-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm text-gray-500">{note.timestamp}</p>
                      {!note.deleted && (
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-red-600 hover:text-red-700"
                          title="Delete Note"
                          aria-label={`Delete note from ${note.timestamp}`}
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                    <div
                      className="prose max-w-none mb-4"
                      dangerouslySetInnerHTML={{ __html: note.content }}
                    />
                    {note.attachments && note.attachments.length > 0 && (
                      <div>
                        <h4 className="text-lg font-bold text-gray-700 mb-2">Attachments</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {note.attachments.map((att) => (
                            <div
                              key={att.id}
                              className="border rounded-lg p-4 text-center relative bg-gray-100 shadow-sm"
                            >
                              <div className="text-2xl mb-2 text-sky-600">
                                {att.type === 'image' && <FaCamera />}
                                {att.type === 'file' && <FaFile />}
                                {att.type === 'audio' && <FaMicrophone />}
                              </div>
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
        </div>
      )}
    </div>
  );
}

export default Notes;

// import React, { useState, useEffect, useRef } from 'react';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import { FaMicrophone, FaTrash, FaCamera, FaFile, FaCameraRetro, FaCircle, FaPause, FaPlay, FaSpeakerDeck, FaFileAudio, FaImage, FaNotesMedical, FaEdit } from 'react-icons/fa';
// import { FaNoteSticky } from 'react-icons/fa6';

// function Notes() {
//   const [notes, setNotes] = useState('');
//   const [savedNotes, setSavedNotes] = useState([]);
//   const [showDeleted, setShowDeleted] = useState(true);
//   const [listening, setListening] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [noteToDelete, setNoteToDelete] = useState(null);
//   const [attachments, setAttachments] = useState([]);
//   const [showRecordModal, setShowRecordModal] = useState(false);
//   const [recording, setRecording] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const [recordName, setRecordName] = useState('');
//   const [recordTime, setRecordTime] = useState(0);
//   const [showCamera, setShowCamera] = useState(false);
//   const [showDescriptionModal, setShowDescriptionModal] = useState(false);
//   const [pendingAttachment, setPendingAttachment] = useState(null);
//   const [attachmentDescription, setAttachmentDescription] = useState('');
//   const [language, setLanguage] = useState('en-US');
//   const [interimTranscript, setInterimTranscript] = useState('');
//   const recognitionRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);
//   const videoRef = useRef(null);
//   const streamRef = useRef(null);
//   const audioStreamRef = useRef(null);

//   // Speech-to-Text Setup
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = language;

//       recognitionRef.current.onresult = (event) => {
//         let interim = '';
//         let final = '';
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const result = event.results[i];
//           const transcript = result[0].transcript;
//           if (result.isFinal) {
//             final += transcript + ' ';
//           } else {
//             interim += transcript + ' ';
//           }
//         }
//         setInterimTranscript(interim);
//         if (final) {
//           setNotes((prev) => {
//             const newContent = prev + (prev ? ' ' : '') + final;
//             return newContent;
//           });
//           setInterimTranscript('');
//         }
//       };

//       recognitionRef.current.onerror = (event) => {
//         console.error('Speech recognition error:', event.error);
//         setListening(false);
//         alert('Speech recognition error: ' + event.error + '. Please try again.');
//       };

//       recognitionRef.current.onend = () => {
//         setListening(false);
//       };
//     } else {
//       alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
//     }

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//       if (audioStreamRef.current) {
//         audioStreamRef.current.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [language]);

//   // Recording Timer
//   useEffect(() => {
//     let timer;
//     if (recording && !isPaused) {
//       timer = setInterval(() => {
//         setRecordTime((prev) => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [recording, isPaused]);

//   const toggleSpeech = () => {
//     if (listening) {
//       recognitionRef.current.stop();
//       setListening(false);
//       setInterimTranscript('');
//     } else {
//       if (recognitionRef.current) {
//         recognitionRef.current.lang = language;
//         try {
//           recognitionRef.current.start();
//           setListening(true);
//         } catch (err) {
//           console.error('Failed to start speech recognition:', err);
//           alert('Failed to start speech recognition. Please check microphone permissions.');
//           setListening(false);
//         }
//       }
//     }
//   };

//   // Attachment Handlers
//   const handleUpload = (e, type) => {
//     const files = Array.from(e.target.files);
//     const newAttachment = files[0];
//     if (newAttachment) {
//       setPendingAttachment({
//         id: Math.random().toString(),
//         name: newAttachment.name,
//         type,
//         file: newAttachment,
//         url: URL.createObjectURL(newAttachment),
//       });
//       setShowDescriptionModal(true);
//     }
//   };

//   const startCamera = () => {
//     setShowCamera(true);
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then((stream) => {
//         streamRef.current = stream;
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//         }
//       })
//       .catch((err) => {
//         console.error('Camera access error:', err);
//         setShowCamera(false);
//       });
//   };

//   const capturePhoto = () => {
//     const canvas = document.createElement('canvas');
//     canvas.width = videoRef.current.videoWidth;
//     canvas.height = videoRef.current.videoHeight;
//     canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
//     canvas.toBlob((blob) => {
//       const url = URL.createObjectURL(blob);
//       setPendingAttachment({
//         id: Math.random().toString(),
//         name: `Photo-${new Date().toISOString()}.jpg`,
//         type: 'image',
//         file: blob,
//         url,
//       });
//       setShowDescriptionModal(true);
//       streamRef.current.getTracks().forEach(track => track.stop());
//       setShowCamera(false);
//     }, 'image/jpeg');
//   };

//   const closeCamera = () => {
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//     }
//     setShowCamera(false);
//   };

//   const startRecording = () => {
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then((stream) => {
//         audioStreamRef.current = stream;
//         mediaRecorderRef.current = new MediaRecorder(stream);
//         mediaRecorderRef.current.ondataavailable = (e) => {
//           audioChunksRef.current.push(e.data);
//         };
//         mediaRecorderRef.current.onstop = () => {
//           const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
//           const audioUrl = URL.createObjectURL(audioBlob);
//           setPendingAttachment({
//             id: Math.random().toString(),
//             name: recordName || `Recording-${new Date().toISOString()}.webm`,
//             type: 'audio',
//             url: audioUrl,
//           });
//           setShowDescriptionModal(true);
//           audioChunksRef.current = [];
//           setRecordName('');
//           setRecording(false);
//           setIsPaused(false);
//           setRecordTime(0);
//           setShowRecordModal(false);
//           stream.getTracks().forEach(track => track.stop());
//         };
//         mediaRecorderRef.current.start();
//         setRecording(true);
//         console.log('Started recording');
//       })
//       .catch((err) => {
//         console.error('Audio recording error:', err);
//         setShowRecordModal(false);
//       });
//   };

//   const pauseRecording = () => {
//     if (mediaRecorderRef.current && recording) {
//       mediaRecorderRef.current.pause();
//       setIsPaused(true);
//       console.log('Paused recording');
//     }
//   };

//   const resumeRecording = () => {
//     if (mediaRecorderRef.current && recording) {
//       mediaRecorderRef.current.resume();
//       setIsPaused(false);
//       console.log('Resumed recording');
//     }
//   };

//   const stopRecording = () => {
//     if (mediaRecorderRef.current && recording) {
//       mediaRecorderRef.current.stop();
//       console.log('Stopped recording');
//     }
//   };

//   const cancelRecording = () => {
//     if (recording && mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//     }
//     if (audioStreamRef.current) {
//       audioStreamRef.current.getTracks().forEach(track => track.stop());
//     }
//     setShowRecordModal(false);
//     setRecording(false);
//     setIsPaused(false);
//     setRecordTime(0);
//     setRecordName('');
//     audioChunksRef.current = [];
//     console.log('Cancelled recording');
//   };

//   const saveAttachmentWithDescription = () => {
//     if (pendingAttachment) {
//       setAttachments([
//         ...attachments,
//         {
//           ...pendingAttachment,
//           description: attachmentDescription || 'No description provided',
//         },
//       ]);
//     }
//     setShowDescriptionModal(false);
//     setPendingAttachment(null);
//     setAttachmentDescription('');
//   };

//   const cancelAttachment = () => {
//     setShowDescriptionModal(false);
//     setPendingAttachment(null);
//     setAttachmentDescription('');
//     if (pendingAttachment?.url) {
//       URL.revokeObjectURL(pendingAttachment.url);
//     }
//   };

//   const handleDeleteAttachment = (attachId) => {
//     setAttachments(attachments.filter((att) => att.id !== attachId));
//     console.log('Deleted attachment:', attachId);
//   };

//   // Note Handlers
//   const handleSaveNotes = () => {
//     if (notes.trim() || attachments.length > 0) {
//       const timestamp = new Date().toLocaleString();
//       setSavedNotes([
//         {
//           id: Date.now(),
//           content: notes,
//           timestamp,
//           deleted: false,
//           attachments: [...attachments],
//         },
//         ...savedNotes,
//       ]);
//       setNotes('');
//       setAttachments([]);
//       console.log('Saving note:', { content: notes, timestamp, attachments });
//     }
//   };

//   const handleDeleteNote = (id) => {
//     setNoteToDelete(id);
//     setShowConfirm(true);
//   };

//   const confirmDelete = () => {
//     setSavedNotes(
//       savedNotes.map((note) =>
//         note.id === noteToDelete ? { ...note, deleted: true } : note
//       )
//     );
//     console.log('Marked note as deleted:', noteToDelete);
//     setShowConfirm(false);
//     setNoteToDelete(null);
//   };

//   const cancelDelete = () => {
//     setShowConfirm(false);
//     setNoteToDelete(null);
//   };

//   // Format Timer
//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
//     const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
//     const secs = (seconds % 60).toString().padStart(2, '0');
//     return `${hours}:${mins}:${secs}`;
//   };

//   return (
//     <div className="mt-6 px-4 sm:px-6 lg:px-8">
    
//           <div className="flex justify-between items-center mb-6">
//           <h2 className="flex items-center text-2xl font-bold text-gray-800 mb-6">
//   <FaNotesMedical className="mr-2" size={28} />
//   Notes
// </h2>
    
//           </div>





//       {/* Language Selector and Start Speaking */}
//       <div className="flex flex-col items-center mb-6 space-y-4">
//         <div className="inline-flex rounded-full bg-gray-100 p-1">
//           <button
//             onClick={() => setLanguage('en-US')}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//               language === 'en-US'
//                 ? 'bg-sky-600 text-white shadow-sm'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             English
//           </button>
//           <button
//             onClick={() => setLanguage('si-LK')}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
//               language === 'si-LK'
//                 ? 'bg-sky-600 text-white shadow-sm'
//                 : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//             }`}
//           >
//             Sinhala
//           </button>
//         </div>

//         <button
//           onClick={toggleSpeech}
//           disabled={!recognitionRef.current}
//           className={`flex items-center justify-center w-full max-w-xs py-3 px-6 rounded-lg text-white text-lg font-semibold transition-all duration-200 shadow-lg ${
//             listening
//               ? 'bg-red-600 animate-pulse'
//               : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
//           } disabled:bg-gray-400 disabled:cursor-not-allowed`}
//         >
//           <FaMicrophone
//             className={`mr-2 ${listening ? 'animate-bounce' : ''}`}
//             size={20}
//           />
//           {listening ? 'Stop Speaking' : 'Start Speaking'}
//         </button>
//       </div>

//       {/* Interim Transcript Preview */}
//       {interimTranscript && (
//         <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
//           <p className="text-sm text-gray-600">Preview: {interimTranscript}</p>
//         </div>
//       )}

//       {/* Attachment Buttons */}
//       <div className="flex justify-center gap-4 mb-6">
//         <label className="cursor-pointer">
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => handleUpload(e, 'image')}
//             className="hidden"
//           />
//           <span
//             className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
//             title="Upload Image"
//           >
//             <FaImage size={20} />
//           </span>
//         </label>
//         <label className="cursor-pointer">
//           <input
//             type="file"
//             accept=".pdf,.doc,.docx"
//             onChange={(e) => handleUpload(e, 'file')}
//             className="hidden"
//           />
//           <span
//             className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
//             title="Upload File"
//           >
//             <FaFile size={20} />
//           </span>
//         </label>
//         <label className="cursor-pointer">
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={(e) => handleUpload(e, 'audio')}
//             className="hidden"
//           />
//           <span
//             className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
//             title="Upload Audio"
//           >
//             <FaFileAudio size={20} />
//           </span>
//         </label>
//         <button
//           onClick={() => setShowRecordModal(true)}
//           className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
//           title="Record Audio"
//         >
//           <FaMicrophone size={20} />
//         </button>
//         <button
//           onClick={startCamera}
//           className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
//           title="Camera Shot"
//         >
//           <FaCamera size={20} />
//         </button>
//       </div>

//       {/* Camera Modal */}
//       {showCamera && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Capture Photo"
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//             <h3 className="text-lg font-semibold mb-4">Capture Photo</h3>
//             <video ref={videoRef} className="w-full h-auto mb-4 rounded-md" autoPlay />
//             <div className="flex gap-4 justify-center">
//               <button
//                 onClick={capturePhoto}
//                 className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition transform hover:scale-105"
//                 title="Capture Photo"
//                 aria-label="Capture Photo"
//               >
//                 <FaCircle size={24} />
//               </button>
//               <button
//                 onClick={closeCamera}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Audio Recording Modal */}
//       {showRecordModal && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Record Audio"
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">Record Audio</h3>
//             <input
//               placeholder="Recording Name"
//               value={recordName}
//               onChange={(e) => setRecordName(e.target.value)}
//               className="w-full p-2 border rounded-md mb-4 focus:ring-sky-500 focus:border-sky-500"
//             />
//             <div className="text-center mb-4 text-gray-700 font-mono">
//               {formatTime(recordTime)}
//             </div>
//             <div className="flex gap-4 flex-wrap justify-center">
//               <button
//                 onClick={recording ? stopRecording : startRecording}
//                 className={`${
//                   recording ? 'bg-red-600' : 'bg-sky-600'
//                 } text-white px-4 py-2 rounded-md hover:bg-sky-700 transition flex items-center gap-2`}
//               >
//                 <FaMicrophone />
//                 {recording ? 'Stop and Save' : 'Start Recording'}
//               </button>
//               {recording && !isPaused && (
//                 <button
//                   onClick={pauseRecording}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition flex items-center gap-2"
//                 >
//                   <FaPause /> Pause
//                 </button>
//               )}
//               {recording && isPaused && (
//                 <button
//                   onClick={resumeRecording}
//                   className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-500 transition flex items-center gap-2"
//                 >
//                   <FaPlay /> Resume
//                 </button>
//               )}
//               <button
//                 onClick={cancelRecording}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Description Modal */}
//       {showDescriptionModal && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Add Attachment Description"
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//             <h3 className="text-lg font-semibold mb-4">Add Description</h3>
//             <input
//               placeholder="Enter description for the attachment"
//               value={attachmentDescription}
//               onChange={(e) => setAttachmentDescription(e.target.value)}
//               className="w-full p-2 border rounded-md mb-4 focus:ring-sky-500 focus:border-sky-500"
//             />
//             <div className="flex gap-4 justify-end">
//               <button
//                 onClick={saveAttachmentWithDescription}
//                 className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={cancelAttachment}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Current Attachments Preview */}
//       {attachments.length > 0 && (
//         <div className="mb-6">
//           <h3 className="text-sm font-medium text-gray-700 mb-2">Current Attachments</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {attachments.map((att) => (
//               <div
//                 key={att.id}
//                 className="border rounded-lg p-4 text-center relative bg-gray-50 shadow-sm"
//               >
//                 <div className="text-2xl mb-2 text-sky-600">
//                   {att.type === 'image' && <FaCamera />}
//                   {att.type === 'file' && <FaFile />}
//                   {att.type === 'audio' && <FaMicrophone />}
//                 </div>
//                 <p className="text-sm font-medium text-gray-900 truncate">{att.name}</p>
//                 <p className="text-xs text-gray-600 mt-1">{att.description}</p>
//                 {att.type === 'image' && (
//                   <img src={att.url} alt={att.name} className="mt-2 max-w-full h-auto rounded-md" />
//                 )}
//                 {att.type === 'audio' && (
//                   <audio controls className="mt-2 w-full">
//                     <source src={att.url} type="audio/webm" />
//                   </audio>
//                 )}
//                 {att.type === 'file' && (
//                   <a
//                     href={att.url}
//                     download
//                     className="text-sky-600 hover:underline mt-2 block"
//                   >
//                     {att.name}
//                   </a>
//                 )}
//                 <button
//                   onClick={() => handleDeleteAttachment(att.id)}
//                   className="absolute top-2 right-2 text-red-600 hover:text-red-700"
//                   title="Delete Attachment"
//                   aria-label={`Delete attachment ${att.name}`}
//                 >
//                   <FaTrash />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Editor */}
//       <div className="border rounded-lg shadow-sm">
//         <ReactQuill
//           value={notes}
//           onChange={setNotes}
//           modules={{
//             toolbar: [
//               [{ header: [1, 2, false] }],
//               ['bold', 'italic', 'underline'],
//               [{ list: 'ordered' }, { list: 'bullet' }],
//               ['link'],
//               ['clean'],
//             ],
//           }}
//           className="bg-white rounded-lg"
//         />
//       </div>
  

//       {/* Note Deletion Confirmation Dialog */}
//       {showConfirm && (
//         <div
//           className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
//           role="dialog"
//           aria-modal="true"
//           aria-label="Confirm Delete Note"
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//             <h3 className="text-lg font-semibold mb-4">Do you want to delete this note?</h3>
//             <div className="flex gap-4 justify-end">
//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={cancelDelete}
//                 className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Timeline of Saved Notes */}
//       {savedNotes.length > 0 && (
//         <div className="mt-8">
      


//           <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center mb-4">
//             <input
//               type="checkbox"
//               id="showDeleted"
//               checked={showDeleted}
//               onChange={() => setShowDeleted(!showDeleted)}
//               className="mr-2 h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
//             />
//             <label htmlFor="showDeleted" className="text-sm font-medium text-gray-700">
//               Show Deleted Notes
//             </label>
//           </div>

 
//               <button
//                     onClick={handleSaveNotes}
//                 className="flex items-center  bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
//                 aria-label="Save changes"
//               >
//                 <FaEdit className="mr-2" />
//                 Save Notes
//               </button>

//           </div>






//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes Timeline</h3>
//           <div className="relative">
//             <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sky-600"></div>
//             {savedNotes
//               .filter((note) => showDeleted || !note.deleted)
//               .map((note) => (
//                 <div key={note.id} className="mb-6 flex items-start">
//                   <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         note.deleted ? 'bg-gray-400' : 'bg-sky-600'
//                       }`}
//                     ></div>
//                   </div>
//                   <div
//                     className={`ml-4 bg-gray-50 border rounded-lg p-4 w-full shadow-sm ${
//                       note.deleted ? 'line-through opacity-50' : ''
//                     }`}
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <p className="text-sm text-gray-500">{note.timestamp}</p>
//                       {!note.deleted && (
//                         <button
//                           onClick={() => handleDeleteNote(note.id)}
//                           className="text-red-600 hover:text-red-700"
//                           title="Delete Note"
//                           aria-label={`Delete note from ${note.timestamp}`}
//                         >
//                           <FaTrash />
//                         </button>
//                       )}
//                     </div>
//                     <div
//                       className="prose max-w-none mb-4"
//                       dangerouslySetInnerHTML={{ __html: note.content }}
//                     />
//                     {note.attachments && note.attachments.length > 0 && (
//                       <div>
//                         <h4 className="text-lg font-bold text-gray-700 mb-2">Attachments</h4>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                           {note.attachments.map((att) => (
//                             <div
//                               key={att.id}
//                               className="border rounded-lg p-4 text-center relative bg-gray-100 shadow-sm"
//                             >
//                               <div className="text-2xl mb-2 text-sky-600">
//                                 {att.type === 'image' && <FaCamera />}
//                                 {att.type === 'file' && <FaFile />}
//                                 {att.type === 'audio' && <FaMicrophone />}
//                               </div>
//                               <p className="text-sm font-medium text-gray-900 truncate">
//                                 {att.name}
//                               </p>
//                               <p className="text-xs text-gray-600 mt-1">{att.description}</p>
//                               {att.type === 'image' && (
//                                 <img
//                                   src={att.url}
//                                   alt={att.name}
//                                   className="mt-2 max-w-full h-auto rounded-md"
//                                 />
//                               )}
//                               {att.type === 'audio' && (
//                                 <audio controls className="mt-2 w-full">
//                                   <source src={att.url} type="audio/webm" />
//                                 </audio>
//                               )}
//                               {att.type === 'file' && (
//                                 <a
//                                   href={att.url}
//                                   download
//                                   className="text-sky-600 hover:underline mt-2 block"
//                                 >
//                                   {att.name}
//                                 </a>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Notes;