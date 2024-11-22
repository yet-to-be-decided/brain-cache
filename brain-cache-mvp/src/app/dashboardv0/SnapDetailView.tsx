import { ArrowLeft, ExternalLink } from "lucide-react";
import Image from "next/image";
import { NoteInterface, SnapInterface } from "./constant";

export default function SnapDetailView({
  snap,
  handleLinkClick,
}: {
  snap: SnapInterface;
  handleLinkClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div
            className={`relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg `}
          >
            <img
              src={"/ex1.png"}
              alt={snap.title}
              className="w-full object-cover"
            />
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
        {snap.notes.map((note) => (
          <div
            key={note.id}
            className="p-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
          >
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {note.content}
            </p>
            {note.relatedImages && note.relatedImages.length > 0 && (
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Related Images
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {note.relatedImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`Related image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {note.relatedLinks && note.relatedLinks.length > 0 && (
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Related Links
                </h4>
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
                <h4 className="text-lg font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Related Code
                </h4>
                {note.relatedCodes.map((code, index) => (
                  <pre
                    key={index}
                    className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto"
                  >
                    <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                      {code}
                    </code>
                  </pre>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-row gap-4 p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4">Tags:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {snap.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
