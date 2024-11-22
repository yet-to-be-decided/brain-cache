import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import React from "react";
import Image from "next/image";

// interface for depencies
interface ThumbnailsListingProps {
  filteredNotes: any;
  isWideLayout: any;
  setSelectedNote: any;
  handleLinkClick: any;
}

const ThumbnailsListing: React.FC<ThumbnailsListingProps> = ({
  filteredNotes,
  isWideLayout,
  setSelectedNote,
  handleLinkClick,
}) => {
  return (
    <div
      className={`grid gap-6 ${
        isWideLayout ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"
      }`}
    >
      {filteredNotes.map((note: any) => (
        <motion.div
          key={note.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer group ${
            isWideLayout ? "aspect-video" : "aspect-square md:aspect-video"
          }`}
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
  );
};

export default ThumbnailsListing;
