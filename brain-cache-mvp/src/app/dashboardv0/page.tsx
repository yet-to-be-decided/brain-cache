'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Book, Search, X, Moon, Sun, Plus, Edit, User, LogOut, ExternalLink, ArrowLeft, Image as ImageIcon, Link as LinkIcon, Code } from 'lucide-react'
import Image from 'next/image'

// Interfaces
export interface NoteInterface {
  id: number;
  content: string;
  relatedImages?: string[];
  relatedLinks?: string[];
  relatedCodes?: string[];
}

export interface SnapInterface {
  id: string;
  title: string;
  thumbnail: string;
  summary: string;
  sourceLink: string;
  tags: string[];
  notes: NoteInterface[];
}

// Mock data for demonstration
const notes: SnapInterface[] = [
  {
    id: "snap-001",
    title: "Understanding JavaScript Closures",
    thumbnail: "/ex1.png",
    summary: "This snap provides an in-depth explanation of JavaScript closures, covering their definition, usage, and common pitfalls with practical examples.",
    sourceLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
    tags: ["JavaScript", "Closures", "Programming", "Web Development"],
    notes: [
      {
        id: 1,
        content: "Definition of Closures lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        relatedImages: [
          "/ex1.png"
        ],
        relatedCodes: [
          `function outer() { 
             let count = 0; 
             return function inner() { 
               count++; 
               console.log(count); 
             }; 
           } 
           const increment = outer(); 
           increment(); // 1 
           increment(); // 2`
        ]
      },
      {
        id: 2,
        content: "Common Use Cases lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." ,
        relatedCodes: [
          `function makeCounter() { 
             let count = 0; 
             return function () { 
               return ++count; 
             }; 
           } 
           const counter1 = makeCounter(); 
           console.log(counter1()); // 1 
           console.log(counter1()); // 2`
        ]
      },
      {
        id: 3,
        content: "Pitfalls to Avoid lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        relatedImages: [
          "/ex3.png"
        ],
        
      }
    ]
  },
{
    id: "snap-002",
    title: "React Hooks Deep Dive",
    thumbnail: "/placeholder.svg?height=200&width=300",
    summary: "This snap explores React Hooks, including useState, useEffect, and custom hooks, with practical examples and best practices.",
    sourceLink: "https://reactjs.org/docs/hooks-intro.html",
    tags: ["React", "Hooks", "JavaScript", "Web Development"],
    notes: [
        {
            id: 1,
            content: "Introduction to Hooks lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            relatedImages: [
                "/ex2.png"
            ],
            relatedLinks: [
                "https://reactjs.org/docs/hooks-overview.html",
                "https://www.w3schools.com/react/react_hooks.asp"
            ],
        },
        {
            id: 2,
            content: "Using useEffect Hook in React lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            relatedLinks: [
                "https://reactjs.org/docs/hooks-effect.html",
                "https://www.taniarascia.com/using-the-useeffect-hook/"
            ],
            relatedCodes: [
                `import { useState, useEffect } from 'react';

                 function Example() {
                     const [count, setCount] = useState(0);

                     useEffect(() => {
                         document.title = \`You clicked \${count} times\`;
                     }, [count]);

                     return (
                         <div>
                             <p>You clicked {count} times</p>
                             <button onClick={() => setCount(count + 1)}>
                                 Click me
                             </button>
                         </div>
                     );
                 }`
            ]
        },
        {
            id: 3,
            content: "Creating Custom Hooks lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        }
    ]
}
  
  // ... (add more mock data here)
]

export default function Dashboard() {
  const [selectedNote, setSelectedNote] = useState<SnapInterface | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(33.33) // Initial width in percentage
  const [isWideLayout, setIsWideLayout] = useState(false)
  const sidebarRef = useRef(null)
  const [isResizing, setIsResizing] = useState(false)

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = (e.clientX / window.innerWidth) * 100
      const clampedWidth = Math.min(Math.max(newWidth, 20), 80) // Limit between 20% and 80%
      setSidebarWidth(clampedWidth)
      setIsWideLayout(clampedWidth >= 45)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.stopPropagation()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`bg-white dark:bg-gray-800 p-6 shadow-lg overflow-y-auto relative flex flex-col`}
        style={{ width: `${sidebarWidth}%` }}
      >
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">Brain Cache</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your personal knowledge hub</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Sun className="h-5 w-5" onClick={()=>setIsDarkMode(false)}/> : <Moon className="h-5 w-5" onClick={()=>setIsDarkMode(true)}/>}
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
          {filteredNotes.map(note => (
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
            onClick={() => {/* Implement profile logic */}}
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
            onClick={() => {/* Implement logout logic */}}
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

      {/* Main Content */}
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
    </div>
  )
}

function SnapDetailView({ snap, onClose,isWideLayout,handleLinkClick }: { snap: SnapInterface, onClose: () => void,isWideLayout:boolean,handleLinkClick: (e: React.MouseEvent<HTMLButtonElement>, url: string) => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
        <div
                className={`relative w-full rounded-xl overflow-hidden shadow-lg `}
              >
                {/* <Image
                  src="/ex1.png"
                  alt={"not found"}
                  width={100}
                    height={100}
                  className="w-full  transition-transform duration-300 group-hover:scale-110 object-cover"
                /> */}
                <img src={"/ex1.png"} alt={snap.title} className="w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-lg font-semibold text-white truncate pr-2">
                    {snap.title}
                  </h3>
                  <button
                    onClick={(e) => handleLinkClick(e, snap.sourceLink)}
                    className="p-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label={`Visit original article for ${snap.title}`}
                  >
                    <ExternalLink className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{snap.summary}</p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        {snap.notes.map(note => (
          <div key={note.id} className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <p className="text-gray-700 dark:text-gray-300 mb-4">{note.content}</p>
            {note.relatedImages && note.relatedImages.length > 0 && (
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Related Images</h4>
                <div className="grid grid-cols-2 gap-4">
                  {note.relatedImages.map((img, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image src={img} alt={`Related image ${index + 1}`} layout="fill" objectFit="cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {note.relatedLinks && note.relatedLinks.length > 0 && (
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Related Links</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {note.relatedLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {note.relatedCodes && note.relatedCodes.length > 0 && (
              <div>
                <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">Related Code</h4>
                {note.relatedCodes.map((code, index) => (
                  <pre key={index} className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm font-mono text-gray-800 dark:text-gray-200">{code}</code>
                  </pre>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='flex flex-row gap-4 p-6' >
        <p className="text-gray-600 dark:text-gray-300 mb-4">Tags:</p>
      <div className="flex flex-wrap gap-2 mb-4">
          {snap.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        </div>
    </div>
  )
}