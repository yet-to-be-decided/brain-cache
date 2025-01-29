"use client";

import { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import SnapDetailView from "./SnapDetailView";
import ThumbnailsListing from "./ThumbnailsListing";
import Sidebar from "./Sidebar";
import { NOTES, SnapInterface } from "./constant";

export default function Dashboard() {
  const [selectedNote, setSelectedNote] = useState<SnapInterface | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(33.33); // Initial width in percentage
  const [isWideLayout, setIsWideLayout] = useState(false);
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);

  const filteredNotes = NOTES.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = (e.clientX / window.innerWidth) * 100;
      const clampedWidth = Math.min(Math.max(newWidth, 20), 80); // Limit between 20% and 80%
      setSidebarWidth(clampedWidth);
      setIsWideLayout(clampedWidth >= 45);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        {...{
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
        }}
      />

      {/* Main Content */}
      <div
        className="flex-1 p-8 overflow-y-auto relative bg-gray-100 dark:bg-gray-900"
        style={{ width: `${100 - sidebarWidth}%` }}
      >
        {selectedNote ? (
          <SnapDetailView
            snap={selectedNote}
            handleLinkClick={handleLinkClick}
          />
        ) : (
          <ThumbnailsListing
            {...{
              filteredNotes,
              isWideLayout,
              setSelectedNote,
              handleLinkClick,
            }}
          />
        )}
        {/* New Note Button */}
        <button
          className="fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {
            /* Implement new note creation logic */
          }}
          aria-label="Create new note"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
