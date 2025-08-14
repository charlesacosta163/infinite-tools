const BOOKMARK_KEY = 'infinite_tools_bookmarks';

export interface BookmarkedTool {
    id: number;
    name: string;
    creator: string;
    description?: string;
    imageUrl: string;
    link: string;
    tags: string[];
    dateBookmarked: string;
    isBeta?: boolean;
    isLegacy?: boolean;
}

export function getBookmarks(): BookmarkedTool[] {
    if (typeof window === 'undefined') return [];
    const bookmarks = localStorage.getItem(BOOKMARK_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
}

export function addBookmark(tool: Omit<BookmarkedTool, 'dateBookmarked'>): void {
    const bookmarks = getBookmarks();
    const existingBookmarkIndex = bookmarks.findIndex(b => b.name.toLowerCase() === tool.name.toLowerCase());
    
    const newBookmark = {
        ...tool,
        dateBookmarked: new Date().toISOString()
    };

    if (existingBookmarkIndex !== -1) {
        // Update existing bookmark with new data while preserving the original date
        newBookmark.dateBookmarked = bookmarks[existingBookmarkIndex].dateBookmarked;
        bookmarks[existingBookmarkIndex] = newBookmark;
    } else {
        // Add new bookmark
        bookmarks.push(newBookmark);
    }
    
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
}

export function removeBookmark(toolName: string): void {
    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(b => b.name.toLowerCase() !== toolName.toLowerCase());
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(filtered));
}

export function isBookmarked(toolName: string): boolean {
    const bookmarks = getBookmarks();
    return bookmarks.some(b => b.name.toLowerCase() === toolName.toLowerCase());
}
