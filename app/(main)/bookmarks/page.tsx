'use client';

import { useEffect, useState } from 'react';
import { BookmarkedTool, getBookmarks, removeBookmark } from '@/lib/bookmark';
import { ToolCard } from '@/components/tools/tool-card';
import { LuTrash2 } from 'react-icons/lu';
import { FaRegFaceSadCry } from 'react-icons/fa6';

export default function BookmarksPage() {
  const [bookmarkedTools, setBookmarkedTools] = useState<BookmarkedTool[]>([]);

  useEffect(() => {
    const bookmarks = getBookmarks();
    setBookmarkedTools(bookmarks);
  }, []);

  const handleRemoveBookmark = (toolId: number) => {
    removeBookmark(toolId);
    setBookmarkedTools(prev => prev.filter(tool => tool.id !== toolId));
  };

  return (
    <div className="px-4 py-8 md:p-8 bg-secondaryOriginal rounded-4xl font-medium flex flex-col gap-4 h-full">
      <header className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-700">Your Bookmarks</h1>
        <span className="text-sm text-gray-500">{bookmarkedTools.length} tools bookmarked</span>
      </header>

      {bookmarkedTools.length === 0 ? (
        <div className="flex flex-col items-center gap-4 justify-center py-12 text-gray-500 text-lg">
          <FaRegFaceSadCry className="w-16 h-16" />
          <p>No bookmarks yet</p>
          <p className="text-sm">Start bookmarking tools to see them here!</p>
        </div>
      ) : (
        <section className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarkedTools.map((tool) => (
            <div key={tool.id} className="group relative">
              <button 
                onClick={() => handleRemoveBookmark(tool.id)}
                className="absolute top-2 right-2 z-10 p-2 rounded-lg bg-white/80 backdrop-blur-sm 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         hover:bg-red-50 text-gray-400 hover:text-red-400"
                title="Remove bookmark"
              >
                <LuTrash2 className="w-5 h-5" />
              </button>
              <ToolCard 
                id={tool.id} 
                name={tool.name} 
                creator={tool.creator} 
                description={tool.description || "No description available"} 
                imageUrl={tool.imageUrl} 
                tags={tool.tags} 
                link={tool.link} 
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
