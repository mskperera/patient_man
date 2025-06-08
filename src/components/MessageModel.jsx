

const MessageModel = ({ isOpen, onClose, message, type = "error" }) => {
  if (!isOpen) return null;

  const modalStyles = {
    error: {
      iconColor: "text-red-600",
      borderColor: "border-red-600",
      iconPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      title: "Error",
    },
    success: {
      iconColor: "text-green-600",
      borderColor: "border-green-600",
      iconPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      ),
      title: "Success",
    },
    warning: {
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-600",
      iconPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      ),
      title: "Warning",
    },
    info: {
      iconColor: "text-blue-600",
      borderColor: "border-blue-600",
      iconPath: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      title: "Information",
    },
  };

  const { iconColor, borderColor, iconPath, title } = modalStyles[type] || modalStyles.error;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className={`bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full transform transition-all duration-300 scale-95 animate-in border-l-4 ${borderColor}`}>
        <div className={`flex items-center mb-4 ${iconColor}`}>
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {iconPath}
          </svg>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-200"
          >
            Close
          </button>
          {type === "warning" && (
            <button
              onClick={onClose}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-all duration-200"
            >
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageModel;