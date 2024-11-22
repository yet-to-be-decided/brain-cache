import { ExternalLink, LogOut, Moon, Search, Sun, User } from "lucide-react";
import React from "react";

interface SidebarProps {
  sidebarRef: any;
  sidebarWidth: any;
  isDarkMode: any;
  setIsDarkMode: any;
  searchTerm: any;
  setSearchTerm: any;
  filteredNotes: any;
  setSelectedNote: any;
  handleLinkClick: any;
  setIsResizing: any;
  toggleDarkMode: any;
}

// const LeftSidebar = () => {
const Sidebar: React.FC<SidebarProps> = ({
  sidebarRef,
  sidebarWidth,
  isDarkMode,
  setIsDarkMode,
  searchTerm,
  setSearchTerm,
  filteredNotes,
  setSelectedNote,
  handleLinkClick,
  setIsResizing,
  toggleDarkMode,
}) => {
  return (
    <div
      ref={sidebarRef}
      className={`bg-white dark:bg-gray-800 p-6 shadow-lg overflow-y-auto relative flex flex-col`}
      style={{ width: `${sidebarWidth}%` }}
    >
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
            Brain Cache
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your personal knowledge hub
          </p>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" onClick={() => setIsDarkMode(false)} />
          ) : (
            <Moon className="h-5 w-5" onClick={() => setIsDarkMode(true)} />
          )}
        </button>
      </div>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <ul className="space-y-2">
        {filteredNotes.map((note: any) => (
          <li key={note.id}>
            <div className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 focus-within:ring-2 focus-within:ring-indigo-400 transition duration-150 ease-in-out group">
              <button
                onClick={() => setSelectedNote(note)}
                className="text-left focus:outline-none flex-grow"
              >
                <h3 className="font-medium truncate">{note.title}</h3>
              </button>
              <button
                onClick={(e) => handleLinkClick(e, note.sourceLink)}
                className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label={`Visit original article for ${note.title}`}
              >
                <ExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-6">
        <button
          className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out"
          onClick={() => {
            /* Implement profile logic */
          }}
        >
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
              <User className="h-5 w-5" />
            </div>
            <span className="ml-3 font-medium">Profile</span>
          </div>
        </button>
        <button
          className="w-full flex items-center px-4 py-2 mt-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-150 ease-in-out text-red-600 dark:text-red-400"
          onClick={() => {
            /* Implement logout logic */
          }}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-gray-300 dark:bg-gray-600"
        onMouseDown={() => setIsResizing(true)}
      ></div>
    </div>
  );
};

export default Sidebar;
