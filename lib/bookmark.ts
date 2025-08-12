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
}

export function getBookmarks(): BookmarkedTool[] {
    if (typeof window === 'undefined') return [];
    const bookmarks = localStorage.getItem(BOOKMARK_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
}

export function addBookmark(tool: Omit<BookmarkedTool, 'dateBookmarked'>): void {
    const bookmarks = getBookmarks();
    const exists = bookmarks.some(b => b.id === tool.id);
    
    if (!exists) {
        const newBookmark = {
            ...tool,
            dateBookmarked: new Date().toISOString()
        };
        bookmarks.push(newBookmark);
        localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
    }
}

export function removeBookmark(toolId: number): void {
    const bookmarks = getBookmarks();
    const filtered = bookmarks.filter(b => b.id !== toolId);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(filtered));
}

export function isBookmarked(toolId: number): boolean {
    const bookmarks = getBookmarks();
    return bookmarks.some(b => b.id === toolId);
}
