import React from 'react';

function BottomBar() {
  return (
    // <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white text-center py-3 z-50">
    <footer className="w-full bg-gray-800 text-white text-right pr-10 py-3 z-50">
      <p>&copy; {new Date().getFullYear()} LegendByte.com. All rights reserved.</p>
    </footer>
  );
}

export default BottomBar;