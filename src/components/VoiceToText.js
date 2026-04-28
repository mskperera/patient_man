import React, { useState, useRef, useEffect } from 'react';
import { FaMicrophone, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

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
  const [statusMessage, setStatusMessage] = useState("");
  const [isWarning, setIsWarning] = useState(false);

  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const textareaRef = useRef(null);
  const latestValueRef = useRef(value);
  const cursorPosRef = useRef(null);

  useEffect(() => {
    latestValueRef.current = value;
  }, [value]);

  // ==================== CLEANUP ====================
  const cleanup = () => {
    if (mediaRecorderRef.current) {
      try { mediaRecorderRef.current.stop(); } catch (e) {}
      mediaRecorderRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (socketRef.current) {
      if (socketRef.current.readyState === WebSocket.OPEN || 
          socketRef.current.readyState === WebSocket.CONNECTING) {
        socketRef.current.close();
      }
      socketRef.current = null;
    }

    setListening(false);
    setStatusMessage("");
    setIsWarning(false);
  };

  // ==================== START RECORDING ====================
  const startRecording = async () => {
    try {
      setListening(true);
      setStatusMessage("Connecting to Voice to Text AI...");
      setIsWarning(false);

      socketRef.current = new WebSocket(process.env.REACT_APP_VOICE_TO_TEXT_WS_API);

      socketRef.current.onopen = () => console.log("Connected");

      socketRef.current.onmessage = (message) => {
        try {
          const data = JSON.parse(message.data);

          if (data.type === "status") {
            setStatusMessage(data.message);
            setIsWarning(data.status === "buffering" || data.status === "error");
            return;
          }

          const transcript = data.channel?.alternatives?.[0]?.transcript;
          if (transcript && data.is_final) {
            const textarea = textareaRef.current;
            if (!textarea) return;

            const start = textarea.selectionStart ?? 0;
            const end = textarea.selectionEnd ?? 0;
            const currentText = latestValueRef.current || '';

            const charBefore = currentText[start - 1] || '';
            const insertText = (start > 0 && charBefore !== ' ' ? ' ' : '') + transcript + ' ';

            const newText = currentText.substring(0, start) + insertText + currentText.substring(end);
            const newCursorPos = start + insertText.length;

            cursorPosRef.current = newCursorPos;

            if (typeof onChange === 'function') {
              onChange({ target: { name, value: newText } });
            }
          }
        } catch (e) {
          console.error("Parse error:", e);
        }
      };

      socketRef.current.onerror = () => {
        setStatusMessage("❌ Connection error");
        setIsWarning(true);
      };

      socketRef.current.onclose = () => {
        setStatusMessage("");
        setIsWarning(false);
      };

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(event.data);
        }
      };

      mediaRecorder.start(250);

    } catch (err) {
      setStatusMessage("❌ Could not access microphone");
      setIsWarning(true);
      setListening(false);
    }
  };

  const stopRecording = () => cleanup();

  const toggleSpeech = () => {
    if (listening) stopRecording();
    else startRecording();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, []);

  return (
    <div className="relative">
      {/* ==================== MERGED TOP PANEL + TEXTAREA ==================== */}
      <div className="border mt-2 border-gray-300 rounded-lg overflow-hidden bg-white ">
        
        {/* Top Compact Header Panel */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
          <div className="">
           
 {/* Status Message */}
        {statusMessage && (
          <div className={`mx-4 rounded-md text-sm flex items-start gap-2 ${
            isWarning 
              ? 'bg-amber-50 border border-amber-200 text-amber-700' 
              : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
          }`}>
            {isWarning ? (
              <FaExclamationTriangle className="mt-0.5 flex-shrink-0" />
            ) : (
              <FaCheckCircle className="mt-0.5 flex-shrink-0" />
            )}
            <span>{statusMessage}</span>
          </div>
        )}




          </div>

          {/* Start / Stop Button */}
          <button
            onClick={toggleSpeech}
            disabled={disabled}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-white transition-all ${
              listening
                ? 'bg-red-600 hover:bg-red-700 animate-pulse'
                : 'bg-green-600 hover:bg-green-700'
            } disabled:bg-gray-400 disabled:cursor-not-allowed`}
          >
            <FaMicrophone size={16} />
            <span>{listening ? 'Stop' : 'Start Speaking'}</span>
          </button>
        </div>

       

        {/* Textarea - Merged seamlessly */}
        <textarea
          ref={textareaRef}
          name={name}
          value={value}
          onChange={onChange}
          className={`${className} border-0 focus:ring-0 focus:border-0 rounded-none resize-y min-h-[120px] `}
          rows={rows}
          placeholder={placeholder}
          aria-label={ariaLabel}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default VoiceToText;


// import React, { useState, useRef, useEffect } from 'react';
// import { FaMicrophone, FaExclamationTriangle } from 'react-icons/fa';

// const VoiceToText = ({
//   disabled,
//   name,
//   value = '',
//   onChange,
//   className = "mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200",
//   rows = 4,
//   placeholder = "Describe your interests and pleasures",
//   ariaLabel = "Voice to text input"
// }) => {

//   const [listening, setListening] = useState(false);
//   const [statusMessage, setStatusMessage] = useState("");        // Main message shown to user
//   const [isWarning, setIsWarning] = useState(false);             // Controls yellow/red styling

//   const socketRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);
//   const textareaRef = useRef(null);
//   const latestValueRef = useRef(value);
//   const cursorPosRef = useRef(null);

//   useEffect(() => {
//     latestValueRef.current = value;
//   }, [value]);

//   // ==================== CLEANUP ====================
//   const cleanup = () => {
//     console.log("🧹 Cleaning up VoiceToText...");

//     if (mediaRecorderRef.current) {
//       try { mediaRecorderRef.current.stop(); } catch (e) {}
//       mediaRecorderRef.current = null;
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach(track => track.stop());
//       streamRef.current = null;
//     }

//     if (socketRef.current) {
//       if (socketRef.current.readyState === WebSocket.OPEN || 
//           socketRef.current.readyState === WebSocket.CONNECTING) {
//         socketRef.current.close();
//       }
//       socketRef.current = null;
//     }

//     setListening(false);
//     setStatusMessage("");
//     setIsWarning(false);
//   };

//   // ==================== START RECORDING ====================
//   const startRecording = async () => {
//     try {
//       setListening(true);
//       setStatusMessage("Connecting to server...");
//       setIsWarning(false);

//       socketRef.current = new WebSocket(process.env.REACT_APP_VOICE_TO_TEXT_WS_API);

//       socketRef.current.onopen = () => {
//         console.log("✅ Connected to backend server");
//       };

//       socketRef.current.onmessage = (message) => {
//         try {
//           const data = JSON.parse(message.data);

//           // Handle status messages from backend (buffering, ready, error)
//           if (data.type === "status") {
//             setStatusMessage(data.message);
//             setIsWarning(data.status === "buffering" || data.status === "error");
//             console.log("Status from backend:", data.message);
//             return;
//           }

//           // Normal transcription handling
//           const transcript = data.channel?.alternatives?.[0]?.transcript;

//           if (transcript && data.is_final) {
//             const textarea = textareaRef.current;
//             if (!textarea) return;

//             const start = textarea.selectionStart ?? 0;
//             const end = textarea.selectionEnd ?? 0;
//             const currentText = latestValueRef.current || '';

//             const charBefore = currentText[start - 1] || '';
//             const insertText = (start > 0 && charBefore !== ' ' ? ' ' : '') + transcript + ' ';

//             const newText = currentText.substring(0, start) + insertText + currentText.substring(end);
//             const newCursorPos = start + insertText.length;

//             cursorPosRef.current = newCursorPos;

//             if (typeof onChange === 'function') {
//               onChange({ target: { name, value: newText } });
//             }
//           }
//         } catch (e) {
//           console.error("Parse error in onmessage:", e);
//         }
//       };

//       socketRef.current.onerror = () => {
//         setStatusMessage("❌ Connection error");
//         setIsWarning(true);
//       };

//       socketRef.current.onclose = () => {
//         setStatusMessage("");
//         setIsWarning(false);
//       };

//       // Microphone setup
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;

//       const mediaRecorder = new MediaRecorder(stream, {
//         mimeType: "audio/webm;codecs=opus",
//       });

//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
//           socketRef.current.send(event.data);
//         }
//       };

//       mediaRecorder.start(250);

//     } catch (err) {
//       console.error("Failed to start recording:", err);
//       setStatusMessage("❌ Failed to access microphone");
//       setIsWarning(true);
//       setListening(false);
//     }
//   };

//   const stopRecording = () => {
//     cleanup();
//   };

//   const toggleSpeech = () => {
//     if (listening) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => cleanup();
//   }, []);

//   return (
//     <div className="relative flex flex-col gap-2">
//       {/* Status Message - Only shown when needed */}
//       {statusMessage && (
//         <div className={`px-4 py-2 rounded-md text-sm flex items-center gap-2 ${
//           isWarning 
//             ? 'bg-amber-50 border border-amber-300 text-amber-700' 
//             : 'bg-green-50 border border-green-200 text-green-700'
//         }`}>
//           {isWarning ? <FaExclamationTriangle /> : null}
//           <span>{statusMessage}</span>
//         </div>
//       )}

//       {/* Mic Button */}
//       <div className="flex items-center absolute right-3 top-3">
//         <button
//           onClick={toggleSpeech}
//           disabled={disabled}
//           className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-all duration-200 shadow-md ${
//             listening
//               ? 'bg-red-600 animate-pulse'
//               : 'bg-green-600 hover:bg-green-700'
//           } disabled:bg-gray-400 disabled:cursor-not-allowed`}
//           aria-label={listening ? 'Stop Speaking' : 'Start Speaking'}
//         >
//           <FaMicrophone
//             className={listening ? 'animate-bounce' : ''}
//             size={20}
//           />
//         </button>
//       </div>

//       {/* Textarea */}
//       <textarea
//         ref={textareaRef}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={className}
//         rows={rows}
//         placeholder={placeholder}
//         aria-label={ariaLabel}
//         disabled={disabled}
//       />
//     </div>
//   );
// };

// export default VoiceToText;


// import React, { useState, useRef, useEffect } from 'react';
// import { FaMicrophone, FaCircle } from 'react-icons/fa';

// const VoiceToText = ({
//   disabled,
//   name,
//   value = '',
//   onChange,
//   className = "mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200",
//   rows = 4,
//   placeholder = "Describe your interests and pleasures",
//   ariaLabel = "Voice to text input"
// }) => {

//   const [listening, setListening] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState("disconnected"); // disconnected | connecting | connected | error

//   const socketRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);
//   const textareaRef = useRef(null);
//   const latestValueRef = useRef(value);
//   const cursorPosRef = useRef(null);

//   useEffect(() => {
//     latestValueRef.current = value;
//   }, [value]);

//   // ==================== CLEANUP FUNCTION ====================
//   const cleanup = () => {
//     console.log("🧹 Cleaning up VoiceToText resources...");

//     if (mediaRecorderRef.current) {
//       try { mediaRecorderRef.current.stop(); } catch (e) {}
//       mediaRecorderRef.current = null;
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }

//     if (socketRef.current) {
//       if (socketRef.current.readyState === WebSocket.OPEN || 
//           socketRef.current.readyState === WebSocket.CONNECTING) {
//         socketRef.current.close();
//       }
//       socketRef.current = null;
//     }

//     setListening(false);
//     setConnectionStatus("disconnected");
//   };

//   // ==================== START RECORDING ====================
//   const startRecording = async () => {
//     try {
//       setListening(true);
//       setConnectionStatus("connecting");

//       socketRef.current = new WebSocket(process.env.REACT_APP_VOICE_TO_TEXT_WS_API);

//       // Connection opened successfully
//       socketRef.current.onopen = () => {
//         console.log("✅ WebSocket connected to Deepgram backend");
//         setConnectionStatus("connected");
//       };

//       socketRef.current.onmessage = (message) => {
//         try {
//           const data = JSON.parse(message.data);
//           console.log('Received from server:', data);

//           const transcript = data.channel?.alternatives?.[0]?.transcript;

//           if (transcript && data.is_final) {
//             const textarea = textareaRef.current;
//             if (!textarea) return;

//             const start = textarea.selectionStart ?? 0;
//             const end = textarea.selectionEnd ?? 0;
//             const currentText = latestValueRef.current || '';

//             const charBefore = currentText[start - 1] || '';
//             const insertText = (start > 0 && charBefore !== ' ' ? ' ' : '') + transcript + ' ';

//             const newText = currentText.substring(0, start) + insertText + currentText.substring(end);
//             const newCursorPos = start + insertText.length;

//             cursorPosRef.current = newCursorPos;

//             if (typeof onChange === 'function') {
//               onChange({ target: { name, value: newText } });
//             }
//           }
//         } catch (e) {
//           console.error("Parse error in onmessage:", e);
//         }
//       };

//       socketRef.current.onerror = (err) => {
//         console.error("WebSocket error:", err);
//         setConnectionStatus("error");
//       };

//       socketRef.current.onclose = () => {
//         console.log("WebSocket closed");
//         setConnectionStatus("disconnected");
//       };

//       // Get microphone
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;

//       const mediaRecorder = new MediaRecorder(stream, {
//         mimeType: "audio/webm;codecs=opus",
//       });

//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
//           socketRef.current.send(event.data);
//         }
//       };

//       mediaRecorder.start(250);

//     } catch (err) {
//       console.error("Failed to start recording:", err);
//       setConnectionStatus("error");
//       setListening(false);
//     }
//   };

//   // ==================== STOP RECORDING ====================
//   const stopRecording = () => {
//     cleanup();
//   };

//   const toggleSpeech = () => {
//     if (listening) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       cleanup();
//     };
//   }, []);

//   // Extra safety cleanup when listening becomes false
//   useEffect(() => {
//     if (!listening && connectionStatus !== "disconnected") {
//       cleanup();
//     }
//   }, [listening]);

//   // Connection Status Indicator
//   const getStatusColor = () => {
//     switch (connectionStatus) {
//       case "connected": return "text-green-500";
//       case "connecting": return "text-yellow-500 animate-pulse";
//       case "error": return "text-red-500";
//       default: return "text-gray-400";
//     }
//   };

//   const getStatusText = () => {
//     switch (connectionStatus) {
//       case "connected": return "Connected";
//       case "connecting": return "Connecting...";
//       case "error": return "Connection Failed";
//       default: return "Disconnected";
//     }
//   };

//   return (
//     <div className="relative flex flex-col gap-2">
//       {/* Status Indicator + Mic Button */}
//       <div className="flex items-center justify-end gap-3 absolute right-2 top-2">
        
//         {/* Connection Status */}
//         <div className="flex items-center gap-1.5 text-xs font-medium">
//           <FaCircle className={`text-sm ${getStatusColor()}`} />
//           <span className={`capitalize ${getStatusColor()}`}>
//             {getStatusText()}
//           </span>
//         </div>

//         {/* Microphone Button */}
//         <button
//           onClick={toggleSpeech}
//           disabled={disabled}
//           className={`flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-semibold transition-all duration-200 shadow-md ${
//             listening
//               ? 'bg-red-600 animate-pulse'
//               : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
//           } disabled:bg-gray-400 disabled:cursor-not-allowed`}
//           aria-label={listening ? 'Stop Speaking' : 'Start Speaking'}
//         >
//           <FaMicrophone
//             className={listening ? 'animate-bounce' : ''}
//             size={20}
//           />
//         </button>
//       </div>

//       {/* TEXTAREA */}
//       <textarea
//         ref={textareaRef}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={className}
//         rows={rows}
//         placeholder={placeholder}
//         aria-label={ariaLabel}
//         disabled={disabled}
//       />
//     </div>
//   );
// };

// export default VoiceToText;


// import React, { useState, useRef, useEffect } from 'react';
// import { FaMicrophone } from 'react-icons/fa';

// const VoiceToText = ({
//   disabled,
//   name,
//   value = '',
//   onChange,
//   className = "mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200",
//   rows = 4,
//   placeholder = "Describe your interests and pleasures",
//   ariaLabel = "Voice to text input"
// }) => {

//   const [listening, setListening] = useState(false);

//   const socketRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);
//   const textareaRef = useRef(null);
//   const latestValueRef = useRef(value);
//   const cursorPosRef = useRef(null);

//   useEffect(() => {
//     latestValueRef.current = value;
//   }, [value]);

//   // ==================== CLEANUP FUNCTION ====================
//   const cleanup = () => {
//     console.log("🧹 Cleaning up VoiceToText resources...");

//     // Stop MediaRecorder
//     if (mediaRecorderRef.current) {
//       try {
//         mediaRecorderRef.current.stop();
//       } catch (e) { /* ignore */ }
//       mediaRecorderRef.current = null;
//     }

//     // Stop microphone tracks
//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => {
//         track.stop();
//       });
//       streamRef.current = null;
//     }

//     // Close WebSocket
//     if (socketRef.current) {
//       if (socketRef.current.readyState === WebSocket.OPEN ||
//           socketRef.current.readyState === WebSocket.CONNECTING) {
//         socketRef.current.close();
//       }
//       socketRef.current = null;
//     }

//     setListening(false);
//   };

//   // ==================== START RECORDING ====================
//   const startRecording = async () => {
//     try {
//       setListening(true);

//       socketRef.current = new WebSocket(process.env.REACT_APP_VOICE_TO_TEXT_WS_API);

//       socketRef.current.onmessage = (message) => {
//         try {
//           const data = JSON.parse(message.data);
//           console.log('Received from server:', data);

//           const transcript = data.channel?.alternatives?.[0]?.transcript;

//           if (transcript && data.is_final) {
//             const textarea = textareaRef.current;
//             if (!textarea) return;

//             const start = textarea.selectionStart ?? 0;
//             const end = textarea.selectionEnd ?? 0;
//             const currentText = latestValueRef.current || '';

//             const charBefore = currentText[start - 1] || '';
//             const insertText = (start > 0 && charBefore !== ' ' ? ' ' : '') + transcript + ' ';

//             const newText = currentText.substring(0, start) + insertText + currentText.substring(end);
//             const newCursorPos = start + insertText.length;

//             cursorPosRef.current = newCursorPos;

//             if (typeof onChange === 'function') {
//               onChange({ target: { name, value: newText } });
//             }
//           }
//         } catch (e) {
//           console.error("Parse error in onmessage:", e);
//         }
//       };

//       socketRef.current.onerror = () => console.error("WebSocket error");
//       socketRef.current.onclose = () => console.log("WebSocket closed");

//       // Get microphone
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       streamRef.current = stream;

//       const mediaRecorder = new MediaRecorder(stream, {
//         mimeType: "audio/webm;codecs=opus",
//       });

//       mediaRecorderRef.current = mediaRecorder;

//       mediaRecorder.ondataavailable = (event) => {
//         if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
//           socketRef.current.send(event.data);
//         }
//       };

//       mediaRecorder.start(250);

//     } catch (err) {
//       console.error("Failed to start recording:", err);
//       setListening(false);
//     }
//   };

//   // ==================== STOP RECORDING ====================
//   const stopRecording = () => {
//     cleanup();
//   };

//   const toggleSpeech = () => {
//     if (listening) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   // 🔥 KEY PART: Cleanup when component unmounts or user leaves the page
//   useEffect(() => {
//     return () => {
//       cleanup();        // This runs automatically when component is removed
//     };
//   }, []);   // Empty dependency array = runs only on unmount

//   // Optional: Also cleanup when listening changes to false
//   useEffect(() => {
//     if (!listening) {
//       // Extra safety
//       if (mediaRecorderRef.current || streamRef.current || socketRef.current) {
//         cleanup();
//       }
//     }
//   }, [listening]);

//   return (
//     <div className="relative flex flex-col gap-2">
//       {/* 🎤 BUTTON */}
//       <div className="flex items-center absolute right-2 top-2">
//         <button
//           onClick={toggleSpeech}
//           disabled={disabled}
//           className={`flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-semibold transition-all duration-200 shadow-md ${
//             listening
//               ? 'bg-red-600 animate-pulse'
//               : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
//           } disabled:bg-gray-400 disabled:cursor-not-allowed`}
//           aria-label={listening ? 'Stop Speaking' : 'Start Speaking'}
//         >
//           <FaMicrophone
//             className={listening ? 'animate-bounce' : ''}
//             size={20}
//           />
//         </button>
//       </div>

//       {/* 📝 TEXTAREA */}
//       <textarea
//         ref={textareaRef}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className={className}
//         rows={rows}
//         placeholder={placeholder}
//         aria-label={ariaLabel}
//         disabled={disabled}
//       />
//     </div>
//   );
// };

// export default VoiceToText;

// import React, { useState, useRef, useEffect } from 'react';
// import { FaMicrophone } from 'react-icons/fa';

// const VoiceToText = ({
//   disabled,
//   name,
//   value = '',
//   onChange,
//   className = "mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200",
//   rows = 4,
//   placeholder = "Describe your interests and pleasures",
//   ariaLabel = "Voice to text input"
// }) => {

//   const [listening, setListening] = useState(false);

//   const socketRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const streamRef = useRef(null);
// const textareaRef = useRef(null);
// const latestValueRef = useRef(value);

// const cursorPosRef = useRef(null);

// useEffect(() => {
//   latestValueRef.current = value;
// }, [value]);

//   // 🟢 START
//   const startRecording = async () => {
//     setListening(true);

//     socketRef.current = new WebSocket("ws://localhost:8000");

//     socketRef.current.onmessage = (message) => {
//       const data = JSON.parse(message.data);

//       console.log('Received from server:', data);
//       const transcript =
//         data.channel?.alternatives?.[0]?.transcript;

// if (transcript && data.is_final) {
//   const textarea = textareaRef.current;
//   if (!textarea) return;

//   const start = textarea.selectionStart ?? 0;
//   const end = textarea.selectionEnd ?? 0;

//   const currentText = latestValueRef.current || '';

//   // ✅ better spacing handling
// const charBefore = currentText[start - 1];

// const insertText =
//   (start > 0 && charBefore !== ' ' ? ' ' : '') +
//   transcript +
//   ' ';

//   const newText =
//     currentText.substring(0, start) +
//     insertText +
//     currentText.substring(end);

// const pos = start + insertText.length;
// cursorPosRef.current = pos;

// if (typeof onChange === 'function') {
//   onChange({
//     target: { name, value: newText }
//   });
// }

// }

//     };

//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//     });

//     streamRef.current = stream;

//     const mediaRecorder = new MediaRecorder(stream, {
//       mimeType: "audio/webm",
//     });

//     mediaRecorderRef.current = mediaRecorder;

//     mediaRecorder.ondataavailable = async (event) => {
//       if (
//         event.data.size > 0 &&
//         socketRef.current?.readyState === WebSocket.OPEN
//       ) {
//         const buffer = await event.data.arrayBuffer();
//         socketRef.current.send(buffer);
//       }
//     };

//     mediaRecorder.start(250);
//   };


//   useEffect(() => {
//   if (cursorPosRef.current !== null && textareaRef.current) {
//     const pos = cursorPosRef.current;

//     textareaRef.current.focus();
//     textareaRef.current.setSelectionRange(pos, pos);

//     cursorPosRef.current = null; // reset
//   }
// }, [value]);


//   // 🔴 STOP
//   const stopRecording = () => {
//     setListening(false);

//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//     }

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((t) => t.stop());
//     }

//     if (socketRef.current) {
//       socketRef.current.close();
//     }
//   };

//   const toggleSpeech = () => {
//     if (listening) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   return (
//     <div className="relative flex flex-col gap-2">
      
//       {/* 🎤 BUTTON */}
//       <div className="flex items-center absolute right-2 top-2">
//         <button
//           onClick={toggleSpeech}
//           disabled={disabled}
//           className={`flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-semibold transition-all duration-200 shadow-md ${
//             listening
//               ? 'bg-red-600 animate-pulse'
//               : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
//           } disabled:bg-gray-400 disabled:cursor-not-allowed`}
//           aria-label={listening ? 'Stop Speaking' : 'Start Speaking'}
//         >
//           <FaMicrophone
//             className={listening ? 'animate-bounce' : ''}
//             size={20}
//           />
//         </button>
//       </div>

//       {/* 📝 TEXTAREA */}
//       <textarea
//   ref={textareaRef}   // 👈 ADD THIS
//   name={name}
//   value={value}
//   onChange={onChange}
//   className={className}
//   rows={rows}
//   placeholder={placeholder}
//   aria-label={ariaLabel}
//   disabled={disabled}
// />

//     </div>
//   );
// };

// export default VoiceToText;



// import React, { useState, useEffect, useRef } from 'react';
// import { FaMicrophone } from 'react-icons/fa';

// const VoiceToText = ({ 
//   disabled, 
//   name, 
//   value = '', 
//   onChange, 
//   className = "mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200", 
//   rows = 4, 
//   placeholder = "Describe your interests and pleasures", 
//   ariaLabel = "Voice to text input" 
// }) => {
//   const [listening, setListening] = useState(false);
//   const [interimTranscript, setInterimTranscript] = useState('');
//   const recognitionRef = useRef(null);

//   // Speech-to-Text Setup
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       recognitionRef.current = new SpeechRecognition();
//       recognitionRef.current.continuous = true;
//       recognitionRef.current.interimResults = true;
//       recognitionRef.current.lang = 'en-US';

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
//         if (final && typeof onChange === 'function') {
//           const newContent = (value || '') + (value ? ' ' : '') + final;
//           onChange({ target: { name, value: newContent } });
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
//     };
//   }, [onChange, name, value]);

//   const toggleSpeech = () => {
//     if (listening) {
//       recognitionRef.current.stop();
//       setListening(false);
//       setInterimTranscript('');
//     } else {
//       if (recognitionRef.current) {
//         recognitionRef.current.lang = 'en-US';
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

//   return (
//     <div className="relative flex flex-col gap-2">
//       <div className="flex items-center absolute right-2 top-2">
//         <button
//           onClick={toggleSpeech}
//           disabled={disabled}
//           className={`flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-semibold transition-all duration-200 shadow-md ${
//             listening
//               ? 'bg-red-600 animate-pulse'
//               : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
//           } disabled:bg-gray-400 disabled:cursor-not-allowed`}
//           aria-label={listening ? 'Stop Speaking' : 'Start Speaking'}
//         >
//           <FaMicrophone
//             className={listening ? 'animate-bounce' : ''}
//             size={20}
//           />
//         </button>
//       </div>
//       <textarea
//         name={name}
//         value={interimTranscript ? `${value || ''}${value ? ' ' : ''}${interimTranscript}` : value}
//         onChange={onChange}
//         className={className}
//         rows={rows}
//         placeholder={placeholder}
//         aria-label={ariaLabel}
//         disabled={disabled}
//       />
//       {interimTranscript && (
//         <div className="mt-1 text-sm text-gray-600">
//           Preview: {interimTranscript}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoiceToText;

// import React, { useState, useEffect, useRef } from 'react';
// import { FaMicrophone } from 'react-icons/fa';

// const VoiceToText = ({ 
//   disabled, 
//   name, 
//   value = '', 
//   onChange, 
//   className = "mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200", 
//   rows = 4, 
//   placeholder = "Describe your interests and pleasures", 
//   ariaLabel = "Voice to text input" 
// }) => {
//   const [listening, setListening] = useState(false);
//   const [language, setLanguage] = useState('en-US');
//   const [interimTranscript, setInterimTranscript] = useState('');
//   const [showLanguageMenu, setShowLanguageMenu] = useState(false);
//   const recognitionRef = useRef(null);

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
//         if (final && typeof onChange === 'function') {
//           const newContent = (value || '') + (value ? ' ' : '') + final;
//           onChange({ target: { name, value: newContent } });
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
//     };
//   }, [language, onChange, name, value]);

//   const toggleSpeech = () => {
//     if (listening) {
//       recognitionRef.current.stop();
//       setListening(false);
//       setInterimTranscript('');
//       setShowLanguageMenu(false);
//     } else {
//       setShowLanguageMenu(true);
//     }
//   };

//   const selectLanguageAndStart = (lang) => {
//     setLanguage(lang);
//     setShowLanguageMenu(false);
//     if (recognitionRef.current) {
//       recognitionRef.current.lang = lang;
//       try {
//         recognitionRef.current.start();
//         setListening(true);
//       } catch (err) {
//         console.error('Failed to start speech recognition:', err);
//         alert('Failed to start speech recognition. Please check microphone permissions.');
//         setListening(false);
//       }
//     }
//   };

//   return (
//     <div className="relative flex flex-col gap-2">
//       <div className="flex items-center absolute right-2 top-2">
//         <button
//           onClick={toggleSpeech}
//           disabled={disabled}
//           className={`flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-semibold transition-all duration-200 shadow-md ${
//             listening
//               ? 'bg-red-600 animate-pulse'
//               : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
//           } disabled:bg-gray-400 disabled:cursor-not-allowed`}
//           aria-label={listening ? 'Stop Speaking' : 'Start Speaking'}
//         >
//           <FaMicrophone
//             className={listening ? 'animate-bounce' : ''}
//             size={20}
//           />
//         </button>
//         {showLanguageMenu && !listening && (
//           <div className=" bg-white border rounded-lg shadow-lg z-10">
//             <button
//               onClick={() => selectLanguageAndStart('en-US')}
//               className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               aria-label="Select English"
//             >
//               English
//             </button>
//             <button
//               onClick={() => selectLanguageAndStart('si-LK')}
//               className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//               aria-label="Select Sinhala"
//             >
//               Sinhala
//             </button>
//           </div>
//         )}
//       </div>
//       <textarea
//         name={name}
//         value={interimTranscript ? `${value || ''}${value ? ' ' : ''}${interimTranscript}` : value}
//         onChange={onChange}
//         className={className}
//         rows={rows}
//         placeholder={placeholder}
//         aria-label={ariaLabel}
//         disabled={disabled}
//       />
//       {interimTranscript && (
//         <div className="mt-1 text-sm text-gray-600">
//           Preview: {interimTranscript}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoiceToText;

// // import React, { useState, useEffect, useRef } from 'react';
// // import { FaMicrophone } from 'react-icons/fa';

// // const VoiceToText = ({ 
// //   disabled, 
// //   name, 
// //   value = '', 
// //   onChange, 
// //   className = "mt-1 w-full p-3 border text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200", 
// //   rows = 4, 
// //   placeholder = "Describe your interests and pleasures", 
// //   ariaLabel = "Voice to text input" 
// // }) => {
// //   const [listening, setListening] = useState(false);
// //   const [language, setLanguage] = useState('en-US');
// //   const [interimTranscript, setInterimTranscript] = useState('');
// //   const [showLanguageMenu, setShowLanguageMenu] = useState(false);
// //   const recognitionRef = useRef(null);

// //   // Speech-to-Text Setup
// //   useEffect(() => {
// //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// //     if (SpeechRecognition) {
// //       recognitionRef.current = new SpeechRecognition();
// //       recognitionRef.current.continuous = true;
// //       recognitionRef.current.interimResults = true;
// //       recognitionRef.current.lang = language;

// //       recognitionRef.current.onresult = (event) => {
// //         let interim = '';
// //         let final = '';
// //         for (let i = event.resultIndex; i < event.results.length; i++) {
// //           const result = event.results[i];
// //           const transcript = result[0].transcript;
// //           if (result.isFinal) {
// //             final += transcript + ' ';
// //           } else {
// //             interim += transcript + ' ';
// //           }
// //         }
// //         setInterimTranscript(interim);
// //         if (final && typeof onChange === 'function') {
// //           const newContent = (value || '') + (value ? ' ' : '') + final;
// //           onChange({ target: { name, value: newContent } });
// //           setInterimTranscript('');
// //         }
// //       };

// //       recognitionRef.current.onerror = (event) => {
// //         console.error('Speech recognition error:', event.error);
// //         setListening(false);
// //         alert('Speech recognition error: ' + event.error + '. Please try again.');
// //       };

// //       recognitionRef.current.onend = () => {
// //         setListening(false);
// //       };
// //     } else {
// //       alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
// //     }

// //     return () => {
// //       if (recognitionRef.current) {
// //         recognitionRef.current.stop();
// //       }
// //     };
// //   }, [language, onChange, name, value]);

// //   const toggleSpeech = () => {
// //     if (listening) {
// //       recognitionRef.current.stop();
// //       setListening(false);
// //       setInterimTranscript('');
// //       setShowLanguageMenu(false);
// //     } else {
// //       setShowLanguageMenu(true);
// //     }
// //   };

// //   const selectLanguageAndStart = (lang) => {
// //     setLanguage(lang);
// //     setShowLanguageMenu(false);
// //     if (recognitionRef.current) {
// //       recognitionRef.current.lang = lang;
// //       try {
// //         recognitionRef.current.start();
// //         setListening(true);
// //       } catch (err) {
// //         console.error('Failed to start speech recognition:', err);
// //         alert('Failed to start speech recognition. Please check microphone permissions.');
// //         setListening(false);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="relative flex flex-col gap-2">
// //       <div className="flex items-center absolute right-2 top-2">
// //         <button
// //           onClick={toggleSpeech}
// //           disabled={disabled}
// //           className={`flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-semibold transition-all duration-200 shadow-md ${
// //             listening
// //               ? 'bg-red-600 animate-pulse'
// //               : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
// //           } disabled:bg-gray-400 disabled:cursor-not-allowed`}
// //           aria-label={listening ? 'Stop Speaking' : 'Start Speaking'}
// //         >
// //           <FaMicrophone
// //             className={listening ? 'animate-bounce' : ''}
// //             size={20}
// //           />
// //         </button>
// //         {showLanguageMenu && !listening && (
// //           <div className=" bg-white border rounded-lg shadow-lg z-10">
// //             <button
// //               onClick={() => selectLanguageAndStart('en-US')}
// //               className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //               aria-label="Select English"
// //             >
// //               English
// //             </button>
// //             <button
// //               onClick={() => selectLanguageAndStart('si-LK')}
// //               className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
// //               aria-label="Select Sinhala"
// //             >
// //               Sinhala
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //       <textarea
// //         name={name}
// //         value={interimTranscript ? `${value || ''}${value ? ' ' : ''}${interimTranscript}` : value}
// //         onChange={onChange}
// //         className={className}
// //         rows={rows}
// //         placeholder={placeholder}
// //         aria-label={ariaLabel}
// //         disabled={disabled}
// //       />
// //       {interimTranscript && (
// //         <div className="mt-1 text-sm text-gray-600">
// //           Preview: {interimTranscript}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default VoiceToText;