import React from 'react'
import SnapDetailView from './SnapDetailView'
import { SnapInterface } from './page'

const MainContent = ({selectedNote,setSelectedNote,sidebarWidth}:{selectedNote:SnapInterface,setSelectedNote: (note: SnapInterface | null) => void,sidebarWidth: number}) => {
  return (
    <div className="flex-1 p-8 overflow-y-auto relative bg-gray-100 dark:bg-gray-900" style={{ width: `${100 - sidebarWidth}%` }}>
    {selectedNote ? (
      <SnapDetailView snap={selectedNote} onClose={() => setSelectedNote(null)} />
    ) : (
      <div className={`grid gap-6 ${isWideLayout ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
        {filteredNotes.map(note => (
          <motion.div
            key={note.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group ${isWideLayout ? 'aspect-video' : 'aspect-square md:aspect-video'}`}
            onClick={() => setSelectedNote(note)}
          >
            <Image
              src="/ex1.png"
              alt={note.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <h3 className="text-lg font-semibold text-white truncate pr-2">
                {note.title}
              </h3>
              <button
                onClick={(e) => handleLinkClick(e, note.sourceLink)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={`Visit original article for ${note.title}`}
              >
                <ExternalLink className="h-4 w-4 text-white" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    )}
    {/* New Note Button */}
    <button
      className="fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={() => {/* Implement new note creation logic */}}
      aria-label="Create new note"
    >
      <Plus className="h-6 w-6" />
    </button>
  </div>
  )
}

export default MainContent