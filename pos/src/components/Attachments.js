import React, { useState, useRef, useEffect } from 'react';
import { FaCamera, FaFile, FaMicrophone, FaTrash, FaCameraRetro, FaCircle, FaPause, FaPlay, FaImage, FaFileAudio } from 'react-icons/fa';

function Attachments() {
  const [attachments, setAttachments] = useState([]);
  const [recording, setRecording] = useState(false);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [recordName, setRecordName] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [pendingAttachment, setPendingAttachment] = useState(null);
  const [attachmentDescription, setAttachmentDescription] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const audioStreamRef = useRef(null);

  // Cleanup streams
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

  const handleUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const newAttachment = files[0]; // Handle one file at a time for simplicity
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

  const deleteAttachment = (id) => {
    setAttachments(attachments.filter((att) => att.id !== id));
  };

  // Format Timer
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${mins}:${secs}`;
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Attachments</h2>
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
  type='button'
    onClick={() => setShowRecordModal(true)}
    className="flex items-center justify-center w-12 h-12 bg-sky-600 text-white rounded-full hover:bg-gradient-to-r hover:from-sky-500 hover:to-sky-600 transition-all duration-200 transform hover:scale-105 shadow-md"
    title="Record Audio"
  >
    <FaMicrophone size={20} />
  </button>
  <button
    type='button'
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
                type='button'
                onClick={capturePhoto}
                className="bg-danger text-white p-3 rounded-full hover:bg-red-700 transition transform hover:scale-105"
                title="Capture Photo"
                aria-label="Capture Photo"
              >
                <FaCircle size={24} />
              </button>
              <button
                type='button'
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
              className="w-full p-2 border rounded-md mb-4 focus:ring-primary focus:border-primary"
            />
            <div className="text-center mb-4 text-gray-700 font-mono">
              {formatTime(recordTime)}
            </div>
            <div className="flex gap-4 flex-wrap justify-center">
              <button
                type='button'
                onClick={recording ? stopRecording : startRecording}
                className={`${recording ? 'bg-danger' : 'bg-green-600'} text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-2`}
              >
                <FaMicrophone />
                {recording ? 'Stop and Save' : 'Start Recording'}
              </button>
              {recording && !isPaused && (
                <button
                  type='button'
                  onClick={pauseRecording}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition flex items-center gap-2"
                >
                  <FaPause /> Pause
                </button>
              )}
              {recording && isPaused && (
                <button
                  type='button'
                  onClick={resumeRecording}
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-accent transition flex items-center gap-2"
                >
                  <FaPlay /> Resume
                </button>
              )}
              <button
                type='button'
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
              className="w-full p-2 border rounded-md mb-4 focus:ring-primary focus:border-primary"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {attachments.map((att) => (
          <div
            key={att.id}
            className="border rounded-md p-4 text-center relative bg-gray-50"
          >
            <div className="text-2xl mb-2">
              {att.type === 'image' && <FaCamera />}
              {att.type === 'file' && <FaFile />}
              {att.type === 'audio' && <FaMicrophone />}
            </div>
            <p className="text-sm truncate">{att.name}</p>
            <p className="text-xs text-gray-600 mt-1">{att.description}</p>
            {att.type === 'image' && (
              <img src={att.url} alt={att.name} className="mt-2 max-w-full h-auto" />
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
                className="text-primary hover:underline mt-2 block"
              >
                {att.name}
              </a>
            )}
            <button
              onClick={() => deleteAttachment(att.id)}
              className="absolute top-2 right-2 text-danger hover:text-red-700"
              title="Delete Attachment"
              aria-label={`Delete attachment ${att.name}`}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attachments;