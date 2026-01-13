import { Camera, X, RefreshCw, Video, Circle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const CameraCapture = ({ isOpen, onClose, onCapture, initialFacingMode = 'environment' }) => {
  const [facingMode, setFacingMode] = useState(initialFacingMode);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    }

    return () => {
      stopStream();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    stopStream();

    const constraints = {
      video: {
        facingMode: facingMode,
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(err => console.error('Video play error:', err));
      }
    } catch (err) {
      console.error('Camera access error:', err);
      const fallbackMode = facingMode === 'environment' ? 'user' : 'environment';
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: fallbackMode }
        });
        streamRef.current = fallbackStream;
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          videoRef.current.play().catch(err => console.error('Video play error:', err));
        }
        setFacingMode(fallbackMode);
      } catch (fallbackErr) {
        console.error('Fallback camera error:', fallbackErr);
        alert('Unable to access any camera. Please check permissions and device availability.');
        onClose();
      }
    }
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      onCapture(blob);
      onClose();
    }, 'image/jpeg');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Capture Photo"
    >
      <div className="relative w-full max-w-2xl mx-4 overflow-hidden rounded-2xl shadow-2xl">
        {/* Header Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between">
            {/* Camera Mode Indicator */}
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <Camera className="text-white" size={16} />
              <span className="text-white text-sm font-medium">
                {facingMode === 'environment' ? 'Back Camera' : 'Front Camera'}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="bg-white/10 backdrop-blur-md text-white p-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-110"
              title="Close Camera"
              aria-label="Close camera"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Video Feed */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-auto"
            style={{ 
              transform: facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)',
              minHeight: '400px',
              maxHeight: '70vh',
              objectFit: 'cover'
            }}
          />
          
          {/* Viewfinder Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white/10" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 to-transparent p-8">
          <div className="flex items-center justify-between max-w-md mx-auto">
            {/* Switch Camera Button */}
            <button
              onClick={toggleCamera}
              className="bg-white/10 backdrop-blur-md text-white p-4 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200 hover:scale-110 hover:rotate-180"
              title="Switch Camera"
              aria-label="Switch between front and back camera"
            >
              <RefreshCw  size={24}/>
            </button>

            {/* Capture Button */}
            <button
              onClick={capturePhoto}
              className="relative group"
              aria-label="Take photo"
            >
              <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-white p-2 rounded-full shadow-2xl hover:scale-105 transition-transform duration-200">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 rounded-full">
                  {/* <Circle size={32} className="" /> */}
                </div>
              </div>
            </button>

            {/* Placeholder for symmetry */}
            <div className="w-16 h-16" />
          </div>

          {/* Capture Hint */}
          <p className="text-center text-white/60 text-sm mt-4 font-medium">
            Tap to capture photo
          </p>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;