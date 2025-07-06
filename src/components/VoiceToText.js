import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';

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

  // Speech-to-Text Setup
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
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center absolute right-2 top-2">
        <button
          onClick={toggleSpeech}
          disabled={disabled}
          className={`flex items-center justify-center w-10 h-10 rounded-full text-white text-lg font-semibold transition-all duration-200 shadow-md ${
            listening
              ? 'bg-red-600 animate-pulse'
              : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
          } disabled:bg-gray-400 disabled:cursor-not-allowed`}
          aria-label={listening ? 'Stop Speaking' : 'Start Speaking'}
        >
          <FaMicrophone
            className={listening ? 'animate-bounce' : ''}
            size={20}
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

export default VoiceToText;

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