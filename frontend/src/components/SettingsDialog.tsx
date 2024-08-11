import React, { useState, useRef, useEffect } from 'react';

interface SettingsDialogProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative dark:text-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="m-3 p-4 text-xl bg-blue-400 :hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-400 rounded-md font-medium text-white"
        aria-label="Open settings"
      >
        Settings
      </button>
      {isOpen && (
        <div ref={dialogRef} className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Settings</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close settings"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="dark-mode" className="mr-2">
                Dark Mode
              </label>
              <input
                id="dark-mode"
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDialog;