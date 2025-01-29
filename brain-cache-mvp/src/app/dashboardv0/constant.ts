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
export const NOTES: SnapInterface[] = [
  {
    id: "snap-001",
    title: "Understanding JavaScript Closures",
    thumbnail: "/ex1.png",
    summary:
      "This snap provides an in-depth explanation of JavaScript closures, covering their definition, usage, and common pitfalls with practical examples.",
    sourceLink:
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
    tags: ["JavaScript", "Closures", "Programming", "Web Development"],
    notes: [
      {
        id: 1,
        content:
          "Definition of Closures lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        relatedImages: ["/ex1.png"],
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
             increment(); // 2`,
        ],
      },
      {
        id: 2,
        content:
          "Common Use Cases lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        relatedCodes: [
          `function makeCounter() { 
               let count = 0; 
               return function () { 
                 return ++count; 
               }; 
             } 
             const counter1 = makeCounter(); 
             console.log(counter1()); // 1 
             console.log(counter1()); // 2`,
        ],
      },
      {
        id: 3,
        content:
          "Pitfalls to Avoid lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        relatedImages: ["/ex3.png"],
      },
    ],
  },
  {
    id: "snap-002",
    title: "React Hooks Deep Dive",
    thumbnail: "/placeholder.svg?height=200&width=300",
    summary:
      "This snap explores React Hooks, including useState, useEffect, and custom hooks, with practical examples and best practices.",
    sourceLink: "https://reactjs.org/docs/hooks-intro.html",
    tags: ["React", "Hooks", "JavaScript", "Web Development"],
    notes: [
      {
        id: 1,
        content:
          "Introduction to Hooks lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        relatedImages: ["/ex2.png"],
        relatedLinks: [
          "https://reactjs.org/docs/hooks-overview.html",
          "https://www.w3schools.com/react/react_hooks.asp",
        ],
      },
      {
        id: 2,
        content:
          "Using useEffect Hook in React lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        relatedLinks: [
          "https://reactjs.org/docs/hooks-effect.html",
          "https://www.taniarascia.com/using-the-useeffect-hook/",
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
                   }`,
        ],
      },
      {
        id: 3,
        content:
          "Creating Custom Hooks lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  },
];
