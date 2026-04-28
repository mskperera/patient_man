import React, { useRef, useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Click Start to begin");

  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  const startRecording = async () => {
    setText("");
    setIsRecording(true);
    setStatus("Connecting...");

    // Connect to your backend
    socketRef.current = new WebSocket("ws://localhost:8000");

    socketRef.current.onopen = () => {
      console.log("Connected to server");
    };

socketRef.current.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    console.log("🔍 Received from server:", data);

    if (data.type === "ready") {
      setStatus("✅ Listening... Speak now");
      return;
    }

    if (data.error) {
      setStatus("Error: " + data.error);
      return;
    }

    if (data.type === "Results") {
      const transcript = data.channel?.alternatives?.[0]?.transcript || "";
      if (transcript && data.is_final) {
        setText(prev => (prev + " " + transcript).trim());
      }
    }
  } catch (e) {
    console.error("Frontend parse error", e);
  }
};

    socketRef.current.onerror = () => setStatus("WebSocket error");
    socketRef.current.onclose = () => setStatus("Connection closed");

    // Get microphone + start recording
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus", // Most reliable in browsers
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(event.data); // Send Blob directly (it becomes ArrayBuffer)
        }
      };

      mediaRecorder.start(250); // 250ms chunks → good balance of latency & performance
    } catch (err) {
      console.error(err);
      setStatus("Microphone access denied or unavailable");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setStatus("Stopped");

    if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>Deepgram Real-time Transcription</h1>

      <button onClick={startRecording} disabled={isRecording}>
        🎤 Start Recording
      </button>

      <button onClick={stopRecording} disabled={!isRecording} style={{ marginLeft: 10 }}>
        ⛔ Stop
      </button>

      <p><strong>Status:</strong> {status}</p>

      <textarea
        value={text}
        readOnly
        rows={12}
        style={{ width: "100%", marginTop: 15, fontSize: "16px" }}
        placeholder="Transcription will appear here..."
      />
    </div>
  );
}

export default App;