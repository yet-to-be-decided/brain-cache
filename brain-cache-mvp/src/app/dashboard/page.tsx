'use client'

import { useState, useEffect, useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { motion } from 'framer-motion'
import { Search, X, Moon, Sun, Plus, Edit, User, LogOut, ExternalLink } from 'lucide-react'
import Image from 'next/image'

// Mock data for demonstration
const notes = [
    { id: 1, title: 'The Future of AI', summary: 'Exploring the potential impact of artificial intelligence on various industries...', content: 'Full content of the AI article...', image: '/ex1.png?height=200&width=300', url: 'https://example.com/ai-future' },
    { id: 2, title: 'Web Development Trends 2024', summary: 'Latest trends in web development including new frameworks and technologies...', content: 'Full content of web development trends...', image: '/ex4.png?height=200&width=300', url: 'https://example.com/web-dev-trends' },
    { id: 3, title: 'Sustainable Energy Solutions', summary: 'Innovative approaches to renewable energy and their global implications...', content: 'Full content of sustainable energy article...', image: '/ex2.png?height=200&width=300', url: 'https://example.com/sustainable-energy' },
    { id: 4, title: 'Cybersecurity Best Practices', summary: 'Essential strategies for protecting digital assets and personal information...', content: 'Full content of cybersecurity article...', image: '/ex4.png?height=200&width=300', url: 'https://example.com/cybersecurity' },
    { id: 5, title: 'The Rise of Remote Work', summary: 'How remote work is reshaping the modern workplace and its long-term effects...', content: 'Full content of remote work article...', image: '/ex3.png?height=200&width=300', url: 'https://example.com/remote-work' },
    { id: 6, title: 'Blockchain Beyond Cryptocurrency', summary: 'Exploring blockchain applications in various sectors beyond digital currencies...', content: 'Full content of blockchain article...', image: '/ex1.png?height=200&width=300', url: 'https://example.com/blockchain' },
    // { id: 7, title: 'The Metaverse Revolution', summary: 'The emergence of virtual worlds and their impact on entertainment and commerce...', content: 'Full content of the metaverse article...' },
    // { id: 8, title: 'Quantum Computing Breakthroughs', summary: 'Recent advancements in quantum computing and their potential for scientific research...', content: 'Full content of quantum computing article...' },
    // { id: 9, title: 'Health Tech Innovations', summary: 'Cutting-edge technologies transforming healthcare delivery and patient outcomes...', content: 'Full content of health tech article...' },
    // { id: 10, title: 'Smart Cities of Tomorrow', summary: 'Urban planning strategies and technologies for sustainable and efficient cities...', content: 'Full content of smart cities article...' },
    // { id: 11, title: 'The Evolution of E-Commerce', summary: 'Trends in online shopping and digital retail experiences for consumers...', content: 'Full content of e-commerce article...' },
    // { id: 12, title: 'Artificial General Intelligence', summary: 'The quest for AGI and its implications for human society and machine learning...', content: 'Full content of AGI article...' },
    // { id: 13, title: 'Digital Transformation Strategies', summary: 'Key approaches to digital transformation for businesses and organizations...', content: 'Full content of digital transformation article...' },
    // { id: 14, title: 'Space Exploration Technologies', summary: 'Innovations in space travel and satellite technology for scientific research...', content: 'Full content of space exploration article...' },
    // { id: 15, title: 'The Future of Workforce Automation', summary: 'Automation trends in the labor market and the impact on employment sectors...', content: 'Full content of workforce automation article...' },
    // { id: 16, title: 'Augmented Reality Applications', summary: 'Practical uses of AR technology in education, healthcare, and entertainment...', content: 'Full content of AR applications article...' },
    // { id: 17, title: 'The Internet of Things Revolution', summary: 'IoT devices and their role in smart homes, industrial automation, and healthcare...', content: 'Full content of IoT article...' },
    // { id: 18, title: 'Data Privacy Regulations', summary: 'Legislation and compliance requirements for protecting user data and privacy rights...', content: 'Full content of data privacy article...' },
    // { id: 19, title: 'Biotechnology Breakthroughs', summary: 'Advancements in genetic engineering, pharmaceuticals, and medical research...', content: 'Full content of biotechnology article...' },
    // { id: 20, title: 'Climate Change Solutions', summary: 'Innovative technologies and policies for mitigating the effects of global warming...', content: 'Full content of climate change article...' },
    // { id: 21, title: 'The Future of Transportation', summary: 'Emerging trends in electric vehicles, autonomous cars, and public transit systems...', content: 'Full content of transportation article...' },
    // { id: 22, title: 'Machine Learning Applications', summary: 'Real-world uses of ML algorithms in healthcare, finance, marketing, and more...', content: 'Full content of ML applications article...' },
    // { id: 23, title: 'Social Media Trends 2024', summary: 'Predictions for social media platforms, influencer marketing, and user engagement...', content: 'Full content of social media trends article...' },
    // { id: 24, title: 'Quantified Self Movement', summary: 'Personal data tracking tools for health, fitness, productivity, and self-improvement...', content: 'Full content of quantified self article...' },
]

export default function Dashboard() {
  interface Note {
    id: number;
    title: string;
    summary: string;
    content: string;
    url: string;
  }

  interface NoteInterface{
    id:number;
    title:string;
    relatedImages?:string[];
    relatedLinks?:string[];
    relatedCodes?:string[];
  }

  interface SnapInterface{
    id:string;
    title:string;
    thumbnail:string;
    summary:string;
    sourceLink:string;
    tags:string[];
    notes:NoteInterface[]
  }
  
  const note: SnapInterface = 
    {
      id: "snap-001",
      title: "Understanding JavaScript Closures",
      thumbnail: "/placeholder.svg?height=200&width=300",
      summary: "This snap provides an in-depth explanation of JavaScript closures, covering their definition, usage, and common pitfalls with practical examples.",
      sourceLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
      tags: ["JavaScript", "Closures", "Programming", "Web Development"],
      notes: [
        {
          id: 1,
          title: "Definition of Closures",
          relatedImages: [
            "/placeholder.svg?height=200&width=300"
          ],
          relatedLinks: [
            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures#the_closure",
            "https://www.w3schools.com/js/js_function_closures.asp"
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
          title: "Common Use Cases",
          relatedImages: [
            "/placeholder.svg?height=200&width=300"
          ],
          relatedLinks: [
            "https://javascript.info/closure#practical-applications",
            "https://stackoverflow.com/questions/111102/how-do-javascript-closures-work"
          ],
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
          title: "Pitfalls to Avoid",
          relatedImages: [
            "/placeholder.svg?height=200&width=300"
          ],
          relatedLinks: [
            "https://javascript.plainenglish.io/javascript-closures-pitfalls-to-avoid-cdbadf4dc4f2"
          ],
          relatedCodes: [
            `for (var i = 0; i < 3; i++) { 
               setTimeout(function() { 
                 console.log(i); // Prints 3, 3, 3 
               }, 1000); 
             } 
             // Solution with IIFE 
             for (var i = 0; i < 3; i++) { 
               (function(i) { 
                 setTimeout(function() { 
                   console.log(i); // Prints 0, 1, 2 
                 }, 1000); 
               })(i); 
             }`
          ]
        }
      ]
    }

  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
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

  const handleEditNote = () => {
    setIsEditing(true)
    if (selectedNote) {
      setEditedContent(selectedNote.content)
    }
  }

  const handleSaveEdit = () => {
    // In a real app, you would update the note in your data store here
    setSelectedNote({ ...selectedNote, content: editedContent } as Note)
    setIsEditing(false)
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
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
                  onClick={(e) => handleLinkClick(e, note.url)}
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
        {/* <div className={`grid gap-6 ${isWideLayout ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'}`}>
          {filteredNotes.map(note => (
            <motion.div
              key={note.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group ${isWideLayout ? 'aspect-video' : 'aspect-square md:aspect-video'}`}
              onClick={() => setSelectedNote(note)}
            >
              <Image
                src={note.image}
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
                  onClick={(e) => handleLinkClick(e, note.url)}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={`Visit original article for ${note.title}`}
                >
                  <ExternalLink className="h-4 w-4 text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </div> */}
        <motion.div
                key={note.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group ${isWideLayout ? 'aspect-video' : 'aspect-square md:aspect-video'}`}
                // onClick={() => setSelectedNote(note)}
              >
                <Image
                  src={note.thumbnail}
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
        {/* New Note Button */}
        <button
          className="fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => {/* Implement new note creation logic */}}
          aria-label="Create new note"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Note Modal */}
      <Dialog open={selectedNote !== null} onClose={() => setSelectedNote(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
                  {selectedNote?.title}
                </Dialog.Title>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => selectedNote && handleLinkClick(e, selectedNote.url)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                    aria-label="Visit original article"
                  >
                    <ExternalLink className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleEditNote}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                    aria-label="Edit note"
                  >
                    <Edit className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => setSelectedNote(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                    aria-label="Close"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                {isEditing ? (
                  <div>
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full h-64 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <p>{selectedNote?.content}</p>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}